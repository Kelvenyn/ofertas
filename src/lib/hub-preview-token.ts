import "server-only"
import { createHmac, timingSafeEqual } from "node:crypto"

function same(left: string, right: string): boolean {
  const a = Buffer.from(left), b = Buffer.from(right)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** Token the hub signs for its editor preview: "<expires>.<hmac(preview.<id>.<expires>)>" with PAGES_SITE_TOKEN. */
export function isValidHubPreviewToken(pageId: string, token: string | undefined, now = Date.now()): boolean {
  const secret = process.env.PAGES_SITE_TOKEN?.trim()
  const [expiresText, signature] = (token ?? "").split(".")
  const expires = Number(expiresText)
  if (!secret || !signature || !Number.isSafeInteger(expires) || expires < Math.floor(now / 1000)) return false
  return same(signature, createHmac("sha256", secret).update(`preview.${pageId}.${expires}`).digest("base64url"))
}

/** Bearer check of the hub's server-to-server calls (revalidation). */
export function isHubRequest(request: Request): boolean {
  const secret = process.env.PAGES_SITE_TOKEN?.trim()
  const header = request.headers.get("authorization") ?? ""
  return Boolean(secret) && header.startsWith("Bearer ") && same(header.slice(7), secret!)
}
