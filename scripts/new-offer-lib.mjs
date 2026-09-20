import { randomUUID } from "node:crypto"
import { execFile } from "node:child_process"
import { access, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"])

export function normalizeForMatch(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

export function assertValidSlug(slug) {
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug inválido. Use apenas letras minúsculas, números e hífens.")
  }
  return slug
}

export function classifySourceAsset(fileName) {
  const sourceExtension = path.extname(fileName)
  const extension = sourceExtension.toLowerCase()
  if (!IMAGE_EXTENSIONS.has(extension)) return null

  const base = normalizeForMatch(path.basename(fileName, sourceExtension)).trim()
  let match = base.match(/^imagem\s*\(\s*(\d+)\s*\)$/)
  if (match) return namedAsset(fileName, "page", Number(match[1]), `demonstrativo-${pad(match[1])}.webp`, 1200)

  match = base.match(/^depoimento\s*\(\s*(\d+)\s*\)$/)
  if (match) return namedAsset(fileName, "testimonial", Number(match[1]), `depoimento-${pad(match[1])}.webp`)

  match = base.match(/^bonus[-_\s]*(\d+)[-_\s]*(frente|verso)$/)
  if (match) {
    const side = match[2]
    return namedAsset(fileName, "bonus", Number(match[1]), `bonus-${pad(match[1])}-${side}.webp`, 1200, side)
  }

  if (/^plano\s+basico$/.test(base)) return namedAsset(fileName, "plan", 1, "plano-basico.webp", 1080, "basic")
  if (/^plano\s+completo$/.test(base)) return namedAsset(fileName, "plan", 2, "plano-completo.webp", 1080, "complete")
  if (/^favicon$/.test(base)) return namedAsset(fileName, "icon", 1, "favicon.webp", 128)
  if (/^garantia(?:[-_\s]*30[-_\s]*dias)?$/.test(base)) return namedAsset(fileName, "square", 1, "garantia.webp", 1080)
  if (/^beneficio$/.test(base)) return namedAsset(fileName, "square", 1, "beneficio.webp", 1080)
  return { sourceName: fileName, kind: "unknown", targetName: null }
}

function pad(value) {
  return String(Number(value)).padStart(2, "0")
}

function namedAsset(sourceName, kind, index, targetName, maxWidth, variant) {
  return { sourceName, kind, index, targetName, maxWidth: maxWidth ?? null, variant: variant ?? null }
}

export function sortAssets(assets) {
  const order = { icon: 0, plan: 1, page: 2, testimonial: 3, bonus: 4, square: 5 }
  return [...assets].sort((a, b) =>
    (order[a.kind] ?? 99) - (order[b.kind] ?? 99) ||
    (a.index ?? 0) - (b.index ?? 0) ||
    String(a.variant ?? "").localeCompare(String(b.variant ?? "")) ||
    a.sourceName.localeCompare(b.sourceName),
  )
}

export function buildImportReport({ slug, copyFile, assets, ignoredFiles = [] }) {
  const counts = Object.fromEntries(["page", "testimonial", "bonus", "plan", "square", "icon"].map((kind) => [kind, assets.filter((asset) => asset.kind === kind).length]))
  return {
    schemaVersion: 1,
    slug,
    catalogDefaults: { status: "draft", paletteKey: null, cashflow: null },
    copy: copyFile
      ? {
          sourceName: path.basename(copyFile),
          requiresAgent: true,
          reason: "A copy precisa ser adaptada ao contrato OfferConfig; o importador não inventa conteúdo comercial.",
        }
      : {
          sourceName: null,
          requiresAgent: true,
          reason: "PV.txt não foi encontrado. Forneça a copy antes de montar offer.ts.",
        },
    counts,
    assets: assets.map(({ sourceName, kind, targetName }) => ({ sourceName, kind, targetName })),
    ignoredFiles: [...ignoredFiles].sort((a, b) => a.localeCompare(b)),
    nextSteps: [
      `Adaptar a copy para src/config/offers/${slug}/offer.ts.`,
      "Cadastrar checkouts, paleta e Cashflow no catálogo.",
      "Rodar npm run offer:validate, testes, typecheck e build antes de ativar.",
    ],
  }
}

async function pathExists(target) {
  try {
    await access(target)
    return true
  } catch {
    return false
  }
}

export async function planOfferImport({ source, slug, workspaceRoot = process.cwd() }) {
  assertValidSlug(slug)
  const sourceDir = path.resolve(source)
  const root = path.resolve(workspaceRoot)
  const targetAssetsDir = path.join(root, "public", "images", slug)
  const targetConfigDir = path.join(root, "src", "config", "offers", slug)
  const targetRouteDir = path.join(root, "src", "app", slug)
  const catalogPath = path.join(root, "src", "config", "offers", "catalog.json")
  const registryPath = path.join(root, "src", "config", "offers", "index.ts")

  const sourceEntries = await readdir(sourceDir, { withFileTypes: true })
  const files = sourceEntries.filter((entry) => entry.isFile()).map((entry) => entry.name)
  const classified = files.map(classifySourceAsset).filter(Boolean)
  const unknownImages = classified.filter((asset) => asset.kind === "unknown")
  if (unknownImages.length) {
    throw new Error(`Imagens sem padrão reconhecido: ${unknownImages.map((asset) => asset.sourceName).join(", ")}`)
  }

  const assets = sortAssets(classified.filter((asset) => asset.kind !== "unknown"))
  if (!assets.length) throw new Error("Nenhuma imagem reconhecida na pasta de origem.")

  const duplicateTargets = assets.map((asset) => asset.targetName).filter((name, index, all) => all.indexOf(name) !== index)
  if (duplicateTargets.length) throw new Error(`Arquivos resultariam em nomes duplicados: ${[...new Set(duplicateTargets)].join(", ")}`)

  const [catalogSource, registrySource] = await Promise.all([
    readFile(catalogPath, "utf8"),
    readFile(registryPath, "utf8"),
  ])
  const catalog = JSON.parse(catalogSource)
  const alreadyRegistered = Object.hasOwn(catalog.offers ?? {}, slug) || new RegExp(`\\b${escapeRegExp(slug)}\\b`).test(registrySource)
  if (await pathExists(targetAssetsDir) || await pathExists(targetConfigDir) || await pathExists(targetRouteDir) || alreadyRegistered) {
    throw new Error(`A oferta "${slug}" já existe. O importador nunca sobrescreve assets, rotas ou configuração.`)
  }

  const copyName = files.find((name) => normalizeForMatch(name) === "pv.txt")
  const copyFile = copyName ? path.join(sourceDir, copyName) : null
  const ignoredFiles = files.filter((name) => !IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()) && name !== copyName && name !== ".gitkeep")
  const report = buildImportReport({ slug, copyFile, assets, ignoredFiles })

  return {
    sourceDir,
    root,
    targetAssetsDir,
    targetConfigDir,
    targetRouteDir,
    catalogPath,
    registryPath,
    catalogSource,
    registrySource,
    catalog,
    copyFile,
    assets,
    report,
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function offerLabel(slug) {
  return slug.split("-").map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" ")
}

function offerScaffold(slug) {
  const label = offerLabel(slug)
  return `import type { OfferConfig } from "@/types/offer"
import { OFFER as referenceOffer } from "@/config/offers/psicopedagogia/offer"

/**
 * Scaffold inicial. Substitua a copy herdada pelos blocos de PV.txt antes de ativar.
 */
export const OFFER: OfferConfig = {
  ...referenceOffer,
  meta: {
    title: ${JSON.stringify(label)},
    description: ${JSON.stringify(`Material digital ${label}. Adapte esta descrição antes de ativar.`)},
  },
}
`
}

function routeScaffold(slug) {
  return {
    layout: `import { createOfferMetadata, OfferRouteLayout } from "@/components/OfferRouteLayout"
import { OFFER } from "@/config/offers/${slug}/offer"

const SLUG = ${JSON.stringify(slug)}

export const metadata = createOfferMetadata(SLUG, OFFER)

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OfferRouteLayout slug={SLUG} offer={OFFER}>{children}</OfferRouteLayout>
}
`,
    page: `export { default } from "@/components/OfferPage"
`,
  }
}

function updatedCatalogSource(catalog, slug) {
  const next = structuredClone(catalog)
  next.offers ??= {}
  next.offers[slug] = {
    label: offerLabel(slug),
    status: "draft",
    favicon: null,
    cashflow: null,
  }
  next.offers = Object.fromEntries(Object.entries(next.offers).sort(([a], [b]) => a.localeCompare(b)))
  return `${JSON.stringify(next, null, 2)}\n`
}

function updatedRegistrySource(source, slug) {
  const importLine = `import { OFFER as ${slug.replaceAll("-", "_")} } from "./${slug}/offer"\n`
  const importAnchor = "\nexport const OFFER_CONFIGS = {"
  if (!source.includes(importAnchor)) throw new Error("Não foi possível localizar o registro OFFER_CONFIGS em index.ts.")
  let updated = source.replace(importAnchor, `${importLine}${importAnchor}`)
  const objectAnchor = "} satisfies Record<string, OfferConfig>"
  if (!updated.includes(objectAnchor)) throw new Error("Não foi possível localizar o final de OFFER_CONFIGS em index.ts.")
  const property = slug.includes("-") ? `  ${JSON.stringify(slug)}: ${slug.replaceAll("-", "_")},\n` : `  ${slug},\n`
  updated = updated.replace(objectAnchor, `${property}${objectAnchor}`)
  return updated
}

async function atomicWrite(target, content) {
  const temporary = path.join(path.dirname(target), `.${path.basename(target)}-${randomUUID()}.tmp`)
  await writeFile(temporary, content, "utf8")
  try {
    await rename(temporary, target)
  } catch (error) {
    await rm(temporary, { force: true })
    throw error
  }
}

export async function runMagickConversion(input, output, asset, magickBin = process.env.MAGICK_BIN || "magick") {
  const args = [input, "-auto-orient", "-strip"]
  if (asset.kind === "page" || asset.kind === "bonus") args.push("-resize", "1200x>")
  if (asset.kind === "plan" || asset.kind === "square") args.push("-resize", "1080x1080>")
  if (asset.kind === "icon") args.push("-resize", "128x128>")
  args.push("-define", "webp:lossless=true", output)
  await execFileAsync(magickBin, args, { windowsHide: true })
}

export async function importOffer(options, dependencies = {}) {
  const plan = await planOfferImport(options)
  if (options.dryRun) return { ...plan, dryRun: true }

  const convert = dependencies.convert ?? runMagickConversion
  const token = randomUUID()
  const assetsParent = path.dirname(plan.targetAssetsDir)
  const configParent = path.dirname(plan.targetConfigDir)
  const routeParent = path.dirname(plan.targetRouteDir)
  const stagedAssets = path.join(assetsParent, `.${options.slug}-${token}`)
  const stagedConfig = path.join(configParent, `.${options.slug}-${token}`)
  const stagedRoute = path.join(routeParent, `.${options.slug}-${token}`)
  let assetsPublished = false
  let configPublished = false
  let routePublished = false
  let catalogPublished = false
  let registryPublished = false

  try {
    await mkdir(stagedAssets, { recursive: false })
    await mkdir(stagedConfig, { recursive: false })
    await mkdir(stagedRoute, { recursive: false })
    for (const asset of plan.assets) {
      await convert(path.join(plan.sourceDir, asset.sourceName), path.join(stagedAssets, asset.targetName), asset)
    }
    await writeFile(path.join(stagedConfig, "import-report.json"), `${JSON.stringify(plan.report, null, 2)}\n`, "utf8")
    if (plan.copyFile) await writeFile(path.join(stagedConfig, "PV.txt"), await readFile(plan.copyFile))
    await writeFile(path.join(stagedConfig, "offer.ts"), offerScaffold(options.slug), "utf8")
    const route = routeScaffold(options.slug)
    await writeFile(path.join(stagedRoute, "layout.tsx"), route.layout, "utf8")
    await writeFile(path.join(stagedRoute, "page.tsx"), route.page, "utf8")

    await rename(stagedAssets, plan.targetAssetsDir)
    assetsPublished = true
    await rename(stagedConfig, plan.targetConfigDir)
    configPublished = true
    await rename(stagedRoute, plan.targetRouteDir)
    routePublished = true
    await atomicWrite(plan.catalogPath, updatedCatalogSource(plan.catalog, options.slug))
    catalogPublished = true
    await atomicWrite(plan.registryPath, updatedRegistrySource(plan.registrySource, options.slug))
    registryPublished = true
  } catch (error) {
    await rm(stagedAssets, { recursive: true, force: true })
    await rm(stagedConfig, { recursive: true, force: true })
    await rm(stagedRoute, { recursive: true, force: true })
    if (assetsPublished) await rm(plan.targetAssetsDir, { recursive: true, force: true })
    if (configPublished) await rm(plan.targetConfigDir, { recursive: true, force: true })
    if (routePublished) await rm(plan.targetRouteDir, { recursive: true, force: true })
    if (catalogPublished) await atomicWrite(plan.catalogPath, plan.catalogSource)
    if (registryPublished) await atomicWrite(plan.registryPath, plan.registrySource)
    throw error
  }

  return { ...plan, dryRun: false }
}
