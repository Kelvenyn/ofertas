import { NextResponse } from "next/server"
import { adminSessionCookie, createAdminSession, isValidAdminCredential } from "@/lib/admin-auth"

function safeNext(value: unknown): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/painel"
}

export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown; next?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 })
  }
  if (!isValidAdminCredential(body.email, body.password)) return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 })
  const response = NextResponse.json({ ok: true, next: safeNext(body.next) })
  response.cookies.set(adminSessionCookie.name, createAdminSession(), adminSessionCookie.options)
  return response
}
