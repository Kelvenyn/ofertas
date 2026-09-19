import "server-only"
import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = process.env.NODE_ENV === "production" ? "__Host-ofertas-admin" : "ofertas-admin"
const SESSION_MAX_AGE = 60 * 60 * 8

function sameValue(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

function signature(payload: string): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return ""
  return createHmac("sha256", secret).update(payload).digest("base64url")
}

export function isValidAdminCredential(email: unknown, password: unknown): boolean {
  const configuredEmail = process.env.ADMIN_EMAIL
  const configuredPassword = process.env.ADMIN_PASSWORD
  if (typeof email !== "string" || typeof password !== "string" || !configuredEmail || !configuredPassword) return false
  return sameValue(email, configuredEmail) && sameValue(password, configuredPassword)
}

export function createAdminSession(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE
  const payload = `admin.${expiresAt}`
  return `${payload}.${signature(payload)}`
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const value = (await cookies()).get(COOKIE_NAME)?.value
  if (!value) return false
  const parts = value.split(".")
  if (parts.length !== 3 || parts[0] !== "admin") return false
  const expiresAt = Number(parts[1])
  if (!Number.isSafeInteger(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) return false
  const payload = `${parts[0]}.${parts[1]}`
  return sameValue(parts[2], signature(payload))
}

export const adminSessionCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_MAX_AGE,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  },
}
