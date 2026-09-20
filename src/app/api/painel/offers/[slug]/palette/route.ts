import { BlobPreconditionFailedError } from "@vercel/blob"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalOffer, OPERATIONAL_CATALOG_CACHE_TAG, updateOperationalOffer } from "@/lib/operational-catalog"
import { validatePaletteContrast } from "@/lib/color"
import type { OfferPalette } from "@/types/offer"

export const runtime = "nodejs"

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para continuar." }, { status: 401 })
  const { slug } = await params
  let body: { palette?: unknown }
  try { body = await request.json() } catch { return NextResponse.json({ error: "Dados inválidos." }, { status: 400 }) }
  const offer = await getOperationalOffer(slug)
  if (!offer) return NextResponse.json({ error: "Oferta não encontrada." }, { status: 404 })
  const palette = body.palette as OfferPalette
  if (!palette || validatePaletteContrast(palette).length) return NextResponse.json({ error: "A paleta não passou na validação de contraste." }, { status: 400 })
  if (!offer.paletteCandidates?.some((candidate) => candidate.brand === palette.brand)) return NextResponse.json({ error: "Escolha uma das paletas candidatas da oferta." }, { status: 400 })
  try {
    await updateOperationalOffer(slug, { offer: { ...offer, palette } })
    revalidateTag(OPERATIONAL_CATALOG_CACHE_TAG, { expire: 0 })
    revalidatePath(`/${slug}`)
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError) {
      return NextResponse.json({ error: "A oferta foi alterada ao mesmo tempo por outra gravação. Tente salvar a paleta novamente." }, { status: 409 })
    }
    return NextResponse.json({ error: "Não foi possível salvar a paleta." }, { status: 503 })
  }
}
