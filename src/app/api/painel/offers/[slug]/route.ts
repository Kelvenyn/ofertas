import { BlobPreconditionFailedError } from "@vercel/blob"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { getCheckoutSummary } from "@/config/offers/catalog"
import { getOperationalCatalog, getOperationalOffer, getOperationalOfferRecord, OPERATIONAL_CATALOG_CACHE_TAG, updateOperationalOffer } from "@/lib/operational-catalog"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { generatePaletteCandidates, validatePaletteContrast } from "@/lib/color"
import { getOfferRevalidationPaths, OfferRoutingError } from "@/lib/offer-routing"
import { validateOfferConfig } from "@/lib/offer-validation"
import type { OfferPalette } from "@/types/offer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

async function refreshOffer(previousSlug: string, nextSlug = previousSlug) {
  revalidateTag(OPERATIONAL_CATALOG_CACHE_TAG, { expire: 0 })
  for (const path of getOfferRevalidationPaths(previousSlug, nextSlug)) revalidatePath(path)
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para continuar." }, { status: 401 })
  const { slug } = await params
  const [catalog, record] = await Promise.all([getOperationalCatalog(), getOperationalOfferRecord(slug)])
  const entry = catalog.offers[slug]
  if (!entry || !record || record.entry.id !== entry.id) return NextResponse.json({ error: "Oferta não encontrada." }, { status: 404 })
  return NextResponse.json({
    offer: record.offer,
    cashflow: entry.cashflow,
    favicon: entry.favicon,
    slug: entry.slug,
    status: entry.status,
    checkout: getCheckoutSummary(record.offer),
  })
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para continuar." }, { status: 401 })
  const { slug } = await params
  if (!(await getOperationalOffer(slug))) return NextResponse.json({ error: "Oferta não encontrada." }, { status: 404 })
  let body: { action?: unknown }
  try { body = await request.json() } catch { return NextResponse.json({ error: "Dados inválidos." }, { status: 400 }) }
  if (body.action !== "generate-palettes") return NextResponse.json({ error: "Ação não reconhecida." }, { status: 400 })
  const offer = await getOperationalOffer(slug)
  if (!offer) return NextResponse.json({ error: "Oferta não encontrada." }, { status: 404 })

  const candidates: OfferPalette[] = [offer.palette]
  const seed = Math.floor(Math.random() * 0xffffffff)
  for (let attempt = 0; candidates.length < 10 && attempt < 8; attempt += 1) {
    const generated = generatePaletteCandidates(offer.palette, {
      count: 10,
      seed: (seed + attempt * 104729) >>> 0,
      hueShifts: [-36, 36, -72, 72, 108, -108, 144, -144, 180, 0],
    })
    for (const raw of generated) {
      const palette = raw as OfferPalette
      if (validatePaletteContrast(palette).length || candidates.some((current) => current.brand === palette.brand)) continue
      candidates.push(palette)
      if (candidates.length === 10) break
    }
  }
  if (candidates.length !== 10) return NextResponse.json({ error: "Não foi possível encontrar dez paletas com contraste suficiente." }, { status: 422 })
  return NextResponse.json({ paletteCandidates: candidates })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para alterar a oferta." }, { status: 401 })
  const { slug } = await params

  let body: Record<string, unknown>
  try {
    const candidate = await request.json()
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) throw new Error("invalid body")
    body = candidate as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 })
  }

  const has = (key: string) => Object.hasOwn(body, key)
  if (!Object.keys(body).some((key) => ["offer", "cashflow", "favicon", "slug", "status"].includes(key))) {
    return NextResponse.json({ error: "Informe ao menos um campo para salvar." }, { status: 400 })
  }

  let checkedOffer: ReturnType<typeof validateOfferConfig>["offer"]
  if (has("offer")) {
    const checked = validateOfferConfig(body.offer)
    if (!checked.offer) return NextResponse.json({ error: checked.errors[0] ?? "A configuração da oferta é inválida.", issues: checked.errors }, { status: 400 })
    if (!checked.offer.paletteCandidates || checked.offer.paletteCandidates.length !== 10) {
      return NextResponse.json({ error: "Gere ou restaure dez paletas antes de salvar." }, { status: 400 })
    }
    checkedOffer = checked.offer
  }
  if (has("status") && body.status !== "active" && body.status !== "inactive" && body.status !== "draft") {
    return NextResponse.json({ error: "Status inválido. Use active, inactive ou draft." }, { status: 400 })
  }
  if (has("slug") && typeof body.slug !== "string") return NextResponse.json({ error: "Slug inválida." }, { status: 400 })
  if (has("cashflow") && body.cashflow !== null && (typeof body.cashflow !== "object" || Array.isArray(body.cashflow) ||
      typeof (body.cashflow as { workspaceId?: unknown }).workspaceId !== "string" ||
      typeof (body.cashflow as { offerId?: unknown }).offerId !== "string")) {
    return NextResponse.json({ error: "Configuração de tracking inválida." }, { status: 400 })
  }
  if (has("favicon") && body.favicon !== null && typeof body.favicon !== "string") return NextResponse.json({ error: "Favicon inválido." }, { status: 400 })

  const changes = {
    ...(has("offer") ? { offer: checkedOffer } : {}),
    ...(has("cashflow") ? { cashflow: body.cashflow as { workspaceId: string; offerId: string } | null } : {}),
    ...(has("favicon") ? { favicon: body.favicon as string | null } : {}),
    ...(has("slug") ? { slug: body.slug as string } : {}),
    ...(has("status") ? { status: body.status as "active" | "inactive" | "draft" } : {}),
  }

  try {
    const entry = await updateOperationalOffer(slug, changes)
    if (!entry) return NextResponse.json({ error: "Oferta não encontrada." }, { status: 404 })
    await refreshOffer(slug, entry.slug)
    const offer = checkedOffer ?? await getOperationalOffer(entry.slug)
    if (!offer) return NextResponse.json({ error: "Configuração da oferta não encontrada." }, { status: 404 })
    return NextResponse.json({
      ok: true,
      entry,
      offer,
      slug: entry.slug,
      status: entry.status,
      checkout: getCheckoutSummary(offer),
      previousSlug: slug,
    })
  } catch (error) {
    if (error instanceof OfferRoutingError) return NextResponse.json({ error: error.message }, { status: error.statusCode })
    if (error instanceof BlobPreconditionFailedError) {
      return NextResponse.json({ error: "A oferta foi alterada ao mesmo tempo por outra gravação. Confira os dados e salve novamente." }, { status: 409 })
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : "Não foi possível salvar agora." }, { status: 503 })
  }
}
