import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { isHubRequest } from "@/lib/hub-preview-token"
import { GLOBAL_SITE_SETTINGS_CACHE_TAG } from "@/lib/global-site-settings"
import { OPERATIONAL_CATALOG_CACHE_TAG } from "@/lib/operational-catalog"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Called by the hub after every save: drop the cached snapshot so the next visit reads the new version. */
export async function POST(request: Request) {
  if (!isHubRequest(request)) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 })
  let slugs: string[] = []
  try {
    const body = await request.json() as { slugs?: unknown }
    if (Array.isArray(body.slugs)) slugs = body.slugs.filter((slug): slug is string => typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)).slice(0, 100)
  } catch { /* Sem corpo: revalida só os dados. */ }
  revalidateTag(OPERATIONAL_CATALOG_CACHE_TAG, { expire: 0 })
  revalidateTag(GLOBAL_SITE_SETTINGS_CACHE_TAG, { expire: 0 })
  for (const slug of slugs) revalidatePath(`/${slug}`)
  return NextResponse.json({ ok: true, slugs })
}
