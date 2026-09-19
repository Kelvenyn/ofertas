#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const STATUSES = new Set(["draft", "active", "archived"])
const CHECKOUT_PATTERN = /^https:\/\/(?:pay\.hotmart\.com|pay\.cakto\.com\.br)\//
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const LEGACY_HOST_PATTERN = new RegExp(["hub", "universoeduk", "com"].join("\\."), "i")
const LEGACY_SCRIPT_PATTERN = new RegExp(["tracker", "js"].join("\\."), "i")

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(target)
    return /\.(?:ts|tsx|js|jsx|mjs)$/.test(entry.name) ? [target] : []
  }))
  return nested.flat()
}

export async function validateOffers(workspaceRoot = process.cwd()) {
  const errors = []
  const warnings = []
  const root = path.resolve(workspaceRoot)
  const catalogPath = path.join(root, "src", "config", "offers", "catalog.json")
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"))
  const paletteSource = await readFile(path.join(root, "src", "config", "offers", "palettes.ts"), "utf8")
  const configuredPalettes = new Set([...paletteSource.matchAll(/^  (?:"([^"]+)"|([a-z][a-z0-9-]*)): \{$/gm)].map((match) => match[1] ?? match[2]))

  if (!catalog.offers || typeof catalog.offers !== "object") errors.push("catalog.json precisa conter offers.")
  if (!catalog.offers?.[catalog.homepageOffer]) errors.push("homepageOffer não aponta para uma oferta cadastrada.")

  for (const [slug, entry] of Object.entries(catalog.offers ?? {})) {
    if (!STATUSES.has(entry.status)) errors.push(`${slug}: status inválido (${entry.status}).`)
    if (entry.paletteKey !== null && !configuredPalettes.has(entry.paletteKey)) errors.push(`${slug}: paleta desconhecida (${entry.paletteKey}).`)
    if (entry.cashflow === null) warnings.push(`${slug}: tracking Cashflow pendente.`)
    else if (!UUID_PATTERN.test(entry.cashflow?.workspaceId ?? "") || !UUID_PATTERN.test(entry.cashflow?.offerId ?? "")) errors.push(`${slug}: configuração Cashflow inválida.`)

    if (entry.status !== "active") continue
    const offerPath = path.join(root, "src", "config", "offers", slug, "offer.ts")
    let offerSource
    try {
      offerSource = await readFile(offerPath, "utf8")
    } catch {
      errors.push(`${slug}: oferta ativa sem offer.ts.`)
      continue
    }
    const checkoutLinks = [...offerSource.matchAll(/ctaHref\s*:\s*["']([^"']+)["']/g)].map((match) => match[1])
    if (!checkoutLinks.length) errors.push(`${slug}: oferta ativa sem checkout explícito.`)
    for (const checkout of checkoutLinks) if (!CHECKOUT_PATTERN.test(checkout)) errors.push(`${slug}: checkout inválido (${checkout}).`)
    if (/ctaDisabled\s*:\s*true/.test(offerSource)) errors.push(`${slug}: oferta ativa contém CTA desabilitado.`)
  }

  const sourceFiles = await collectSourceFiles(path.join(root, "src"))
  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8")
    if (LEGACY_HOST_PATTERN.test(source) || LEGACY_SCRIPT_PATTERN.test(source)) errors.push(`${path.relative(root, sourceFile)}: referência à integração antiga.`)
  }

  const routeLayout = await readFile(path.join(root, "src", "components", "OfferRouteLayout.tsx"), "utf8")
  for (const marker of ["cashflowScriptUrl", 'data-nowprocket', 'data-no-minify="1"', 'data-no-optimize="1"', 'data-cfasync="false"', 'strategy="afterInteractive"']) {
    if (!routeLayout.includes(marker)) errors.push(`OfferRouteLayout não contém ${marker}.`)
  }

  return { errors, warnings, offerCount: Object.keys(catalog.offers ?? {}).length, paletteCount: configuredPalettes.size }
}

export async function main(argv = process.argv.slice(2)) {
  const rootIndex = argv.indexOf("--workspace-root")
  const workspaceRoot = rootIndex >= 0 ? argv[rootIndex + 1] : process.cwd()
  if (rootIndex >= 0 && !workspaceRoot) throw new Error("Valor ausente para --workspace-root.")
  const result = await validateOffers(workspaceRoot)
  for (const warning of result.warnings) console.warn(`Aviso: ${warning}`)
  for (const error of result.errors) console.error(`Erro: ${error}`)
  console.log(`${result.offerCount} ofertas e ${result.paletteCount} paletas verificadas.`)
  if (result.errors.length) process.exitCode = 1
}

const isEntryPoint = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isEntryPoint) main().catch((error) => { console.error(`Erro: ${error.message}`); process.exitCode = 1 })
