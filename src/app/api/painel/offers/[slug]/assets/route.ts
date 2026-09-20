import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalCatalog } from "@/lib/operational-catalog"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ASSET_NAME = /^(?:plano-completo|plano-basico|demonstrativo-(?:0[1-9]|1[0-8])|depoimento-0[1-7]|bonus-0[1-6]-(?:frente|verso)|garantia|favicon|beneficio)\.webp$/

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Faça login para enviar imagens." }, { status: 401 })
  const { slug } = await params
  const catalog = await getOperationalCatalog()
  const entry = catalog.offers[slug]
  if (!entry) return NextResponse.json({ error: "Oferta não encontrada." }, { status: 404 })
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "O armazenamento de imagens não está configurado." }, { status: 503 })

  let form: FormData
  try { form = await request.formData() } catch { return NextResponse.json({ error: "Upload inválido." }, { status: 400 }) }
  const name = form.get("name")
  const file = form.get("file")
  if (typeof name !== "string" || !ASSET_NAME.test(name) || !(file instanceof File)) {
    return NextResponse.json({ error: "Use um nome de imagem previsto no padrão da oferta." }, { status: 400 })
  }
  if (file.type !== "image/webp" || file.size === 0 || file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "A imagem precisa ser WebP e ter até 8 MB depois da conversão." }, { status: 400 })
  }
  const data = Buffer.from(await file.arrayBuffer())
  if (data.subarray(0, 4).toString("ascii") !== "RIFF" || data.subarray(8, 12).toString("ascii") !== "WEBP") {
    return NextResponse.json({ error: "O arquivo enviado não contém uma imagem WebP válida." }, { status: 400 })
  }

  try {
    const blob = await put(`images/${entry.id}/${name}`, data, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "image/webp",
      cacheControlMaxAge: 60,
    })
    return NextResponse.json({ url: `${blob.url}?v=${Date.now()}`, name })
  } catch {
    return NextResponse.json({ error: "Não foi possível enviar a imagem ao Vercel Blob." }, { status: 503 })
  }
}
