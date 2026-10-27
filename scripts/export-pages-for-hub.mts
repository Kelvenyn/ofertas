/**
 * Exporta a configuração efetiva de cada página (override do Blob ou offer.ts) no formato de importação do hub.
 * Só lê: o Blob privado (`admin/ofertas-operacionais.json` e `admin/global-site-settings.json`) e os offer.ts.
 * Uso: tsx scripts/export-pages-for-hub.mts [saida.json]   (BLOB_READ_WRITE_TOKEN em .env.local; sem ele, só offer.ts)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import path from "node:path"
import { get } from "@vercel/blob"
import { OFFER_CATALOG, getCatalogEntryById } from "../src/config/offers/catalog"
import { getOfferConfig } from "../src/config/offers"
import { mergeOperationalCatalog, validateOperationalOverrides, type OfferOverride } from "../src/lib/operational-catalog-domain"

function loadEnvFile(file: string) {
  try {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1")
    }
  } catch { /* sem .env.local */ }
}

async function readBlobJson(pathname: string): Promise<unknown> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return undefined
  const blob = await get(pathname, { access: "private", useCache: false })
  return blob ? new Response(blob.stream).json() : undefined
}

loadEnvFile(".env.local")
const output = process.argv[2] ?? ".local/paginas-export.json"
const rawOverrides = await readBlobJson("admin/ofertas-operacionais.json")
const overrides: Record<string, OfferOverride> = rawOverrides ? validateOperationalOverrides(rawOverrides) : {}
const rawSettings = await readBlobJson("admin/global-site-settings.json") as { typographySize?: string; imageSize?: string } | undefined
const catalog = mergeOperationalCatalog(overrides)

const pages = Object.values(catalog.offers).map((entry) => {
  const isStatic = Boolean(getCatalogEntryById(entry.id))
  const offer = overrides[entry.id]?.offer ?? getOfferConfig(entry.id)
  if (!offer) throw new Error(`Sem configuração para ${entry.id}.`)
  return {
    legacyId: isStatic ? entry.id : null,
    sourceId: entry.id,
    templateId: entry.templateId ?? null,
    slug: entry.slug,
    label: entry.label,
    status: entry.status,
    favicon: entry.favicon,
    cashflow: entry.cashflow,
    source: overrides[entry.id]?.offer ? "blob" : "offer.ts",
    offer,
  }
})

mkdirSync(path.dirname(output), { recursive: true })
writeFileSync(output, JSON.stringify({
  schemaVersion: 1,
  exportedAt: new Date().toISOString(),
  homepageOffer: OFFER_CATALOG.homepageOffer,
  blobOverrides: Boolean(rawOverrides),
  settings: { typographySize: rawSettings?.typographySize ?? "M", imageSize: rawSettings?.imageSize ?? "M" },
  pages,
}, null, 2))
console.log(`${pages.length} páginas exportadas para ${output} (Blob: ${rawOverrides ? "sim" : "não"}).`)
for (const page of pages) console.log(`- ${page.slug.padEnd(16)} ${page.status.padEnd(8)} ${page.source}${page.legacyId ? "" : " (criada no painel)"}`)
