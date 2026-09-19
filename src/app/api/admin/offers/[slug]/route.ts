import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { OFFER_CATALOG, isKnownPalette, isKnownStatus } from "@/config/offers/catalog"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { OPERATIONAL_CATALOG_CACHE_TAG, updateOperationalOffer } from "@/lib/operational-catalog"

export const runtime = "nodejs"

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para alterar o catálogo." }, { status: 401 })

  let body: { pin?: unknown; status?: unknown; paletteKey?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 })
  }
  if (body.pin !== "1010") return NextResponse.json({ error: "PIN de confirmação inválido." }, { status: 403 })
  if (body.status === undefined && body.paletteKey === undefined) return NextResponse.json({ error: "Nenhuma alteração informada." }, { status: 400 })
  if (body.status !== undefined && !isKnownStatus(body.status)) return NextResponse.json({ error: "Status inválido." }, { status: 400 })
  if (body.paletteKey !== undefined && !isKnownPalette(body.paletteKey)) return NextResponse.json({ error: "Paleta inválida." }, { status: 400 })

  const { slug } = await params
  if (!OFFER_CATALOG.offers[slug]) return NextResponse.json({ error: "Oferta não encontrada." }, { status: 404 })

  try {
    const entry = await updateOperationalOffer(slug, {
      ...(body.status !== undefined ? { status: body.status } : {}),
      ...(body.paletteKey !== undefined ? { paletteKey: body.paletteKey } : {}),
    })
    revalidateTag(OPERATIONAL_CATALOG_CACHE_TAG, "max")
    revalidatePath(`/${slug}`)
    if (slug === OFFER_CATALOG.homepageOffer) revalidatePath("/")
    return NextResponse.json({ ok: true, offer: entry })
  } catch {
    return NextResponse.json({ error: "Não foi possível salvar agora. Tente novamente." }, { status: 503 })
  }
}
