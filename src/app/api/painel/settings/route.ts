import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalCatalog } from "@/lib/operational-catalog"
import { getOfferRevalidationPaths } from "@/lib/offer-routing"
import { GLOBAL_SITE_SETTINGS_CACHE_TAG, getGlobalSiteSettings, updateGlobalSiteSettings, type GlobalSize } from "@/lib/global-site-settings"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function isSize(value: unknown): value is GlobalSize {
  return value === "P" || value === "M" || value === "G"
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para continuar." }, { status: 401 })
  return NextResponse.json(await getGlobalSiteSettings())
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para alterar as configurações." }, { status: 401 })

  let body: Record<string, unknown>
  try {
    const candidate = await request.json()
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) throw new Error("invalid body")
    body = candidate as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 })
  }

  if (!isSize(body.typographySize) || !isSize(body.imageSize)) {
    return NextResponse.json({ error: "Escolha P, M ou G para texto e imagens." }, { status: 400 })
  }

  try {
    const settings = { typographySize: body.typographySize, imageSize: body.imageSize }
    await updateGlobalSiteSettings(settings)
    revalidateTag(GLOBAL_SITE_SETTINGS_CACHE_TAG, { expire: 0 })
    revalidatePath("/painel")
    const catalog = await getOperationalCatalog()
    const paths = new Set<string>(["/painel"])
    for (const slug of Object.keys(catalog.offers)) {
      for (const path of getOfferRevalidationPaths(slug)) paths.add(path)
      paths.add(`/painel/${slug}`)
    }
    for (const path of paths) revalidatePath(path)
    return NextResponse.json({ ok: true, settings })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Não foi possível salvar agora." }, { status: 503 })
  }
}
