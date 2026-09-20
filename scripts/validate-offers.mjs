#!/usr/bin/env node
import { open, readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const CHECKOUT_PATTERN = /^https:\/\/(?:pay\.hotmart\.com|pay\.cakto\.com\.br)\//
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const LEGACY_HOST_PATTERN = new RegExp(["hub", "universoeduk", "com"].join("\\."), "i")
const LEGACY_SCRIPT_PATTERN = new RegExp(["tracker", "js"].join("\\."), "i")

// Limites de copy (§6 do plano); qualquer violação bloqueia a publicação.
// Comprimento medido sem as quebras forçadas "\n" do headline.
const COPY_LIMITS = {
  heroPill: 30, heroHeadline: 70, heroSubline: 70, heroSupport: 160,
  heroBullets: 4, heroBullet: 34, heroCta: 34, heroMarquee: 70,
  socialTitle: 48, testimonialsMax: 7,
  counterPrefix: 8, counterLabel: 44,
  kitHeading: 48, kitMin: 10, kitMax: 18,
  benefitsTitle: 48, benefitsCards: 4, benefitTitle: 32, benefitDesc: 100,
  urgencyTitle: 60, urgencyBody: 140, trustMin: 1, trustMax: 3, trustItem: 30,
  deliverablesTitle: 48, deliverablesMin: 6, deliverablesMax: 10, deliverableItem: 60,
  bonusTitleTotal: 48, bonusSubtitle: 140, bonusesMax: 6, bonusDesc: 120,
  plansTitleTotal: 48, basicItems: 6, completeItems: 8, planItem: 60, plansNote: 160,
  guaranteeTitle: 50, guaranteeBody: 200,
  accessTitle: 48, accessSteps: 4, stepTitle: 30, stepDesc: 90,
  faqTitle: 48, faqItems: 5, faqQ: 70, faqA: 200,
  footerTitle: 50, footerBody: 160,
}

function extractBlock(source, key) {
  const match = source.match(new RegExp(`["']?${key}["']?\\s*:\\s*\\{`))
  if (!match || match.index === undefined) return null
  let depth = 0
  for (let i = match.index + match[0].length - 1; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1
    else if (source[i] === "}") {
      depth -= 1
      if (depth === 0) return source.slice(match.index, i + 1)
    }
  }
  return null
}

function extractArrayBlock(source, key) {
  const match = source.match(new RegExp(`["']?${key}["']?\\s*:\\s*\\[`))
  if (!match || match.index === undefined) return null
  const arrStart = match.index + match[0].length - 1 // posição do `[` (sem a chave)
  let depth = 0
  let inStr = null
  for (let i = arrStart; i < source.length; i += 1) {
    const ch = source[i]
    if (inStr) {
      if (ch === "\\") i += 1
      else if (ch === inStr) inStr = null
      continue
    }
    if (ch === '"' || ch === "'") inStr = ch
    else if (ch === "[") depth += 1
    else if (ch === "]") {
      depth -= 1
      if (depth === 0) return source.slice(arrStart, i + 1)
    }
  }
  return null
}

function getStr(block, field) {
  if (!block) return null
  const match = block.match(new RegExp(`["']?${field}["']?\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"))
  return match ? match[1].replace(/\\"/g, '"') : null
}

function getStrList(block, field) {
  const arr = block ? extractArrayBlock(block, field) : null
  if (!arr || /\.\.\./.test(arr)) return null // spread/template — não verificável estaticamente
  return [...arr.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1])
}

function countObjects(block, field) {
  const arr = block ? extractArrayBlock(block, field) : null
  if (!arr || /\.\.\./.test(arr)) return null
  return arr.split("{").length - 1
}

function visibleLen(value) {
  return value.replace(/\\n/g, "").length
}

function resolveSection(source, bases, section) {
  const own = extractBlock(source, section)
  const spread = own?.match(/\.\.\.(\w+)(?:\.(\w+))?/) ?? source.match(new RegExp(`${section}\\s*:\\s*\\.\\.\\.(\\w+)(?:\\.(\\w+))?`))
  if (!spread) return own
  const baseSource = bases[spread[1]]
  const baseBlock = baseSource ? resolveSection(baseSource, bases, spread[2] ?? section) : null
  if (!own || !baseBlock) return own ?? baseBlock
  // Override primeiro: em spread o próprio arquivo vence a base; a base completa o que falta.
  return `${own.slice(0, -1)} ${baseBlock.slice(baseBlock.indexOf("{") + 1)}`
}

async function loadBases(root, source) {
  const bases = {}
  const imports = [...source.matchAll(/OFFER\s+as\s+(\w+)\s*\}\s*from\s+["']@\/config\/offers\/([\w-]+)\/offer["']/g)]
  for (const [, ident, slug] of imports) {
    try {
      bases[ident] = await readFile(path.join(root, "src", "config", "offers", slug, "offer.ts"), "utf8")
    } catch { /* oferta-base ausente: checagem estrutural já cobre */ }
  }
  return bases
}

function checkCopyLimits(slug, source, bases, errors) {
  const copy = (msg) => errors.push(`${slug}: copy ${msg}`)
  const hero = resolveSection(source, bases, "hero")
  if (hero) {
    const pill = getStr(hero, "pill")
    const headline = getStr(hero, "headline")
    const subline = getStr(hero, "subline")
    const support = getStr(hero, "support")
    const cta = getStr(hero, "ctaText")
    const marquee = getStr(hero, "marqueeText")
    const bullets = getStrList(hero, "bullets")
    if (pill !== null && pill.length > COPY_LIMITS.heroPill) copy(`pill com ${pill.length} car. (limite ${COPY_LIMITS.heroPill}).`)
    if (headline !== null && visibleLen(headline) > COPY_LIMITS.heroHeadline) copy(`headline com ${visibleLen(headline)} car. (limite ${COPY_LIMITS.heroHeadline}).`)
    if (subline !== null && subline.length > COPY_LIMITS.heroSubline) copy(`subline com ${subline.length} car. (limite ${COPY_LIMITS.heroSubline}).`)
    if (support !== null && support.length > COPY_LIMITS.heroSupport) copy(`support com ${support.length} car. (limite ${COPY_LIMITS.heroSupport}).`)
    if (cta !== null && cta.length > COPY_LIMITS.heroCta) copy(`cta do hero com ${cta.length} car. (limite ${COPY_LIMITS.heroCta}).`)
    if (marquee !== null && marquee.length > COPY_LIMITS.heroMarquee) copy(`marquee com ${marquee.length} car. (limite ${COPY_LIMITS.heroMarquee}).`)
    if (bullets) {
      if (bullets.length !== COPY_LIMITS.heroBullets) copy(`hero com ${bullets.length} bullets (exigido ${COPY_LIMITS.heroBullets}).`)
      bullets.forEach((b, i) => { if (b.length > COPY_LIMITS.heroBullet) copy(`bullet ${i + 1} com ${b.length} car. (limite ${COPY_LIMITS.heroBullet}).`) })
    }
  }
  const social = resolveSection(source, bases, "socialProof")
  if (social) {
    const title = getStr(social, "title")
    if (title !== null && title.length > COPY_LIMITS.socialTitle) copy(`título da prova social com ${title.length} car. (limite ${COPY_LIMITS.socialTitle}).`)
    const n = countObjects(social, "testimonials")
    if (n !== null && n > COPY_LIMITS.testimonialsMax) copy(`${n} depoimentos (limite ${COPY_LIMITS.testimonialsMax}).`)
  }
  const counter = resolveSection(source, bases, "counter")
  if (counter) {
    const prefix = getStr(counter, "prefix")
    const label = getStr(counter, "label")
    if (prefix !== null && prefix.length > COPY_LIMITS.counterPrefix) copy(`prefixo do contador com ${prefix.length} car. (limite ${COPY_LIMITS.counterPrefix}).`)
    if (label !== null && label.replace(/\\n/g, " ").length > COPY_LIMITS.counterLabel) copy(`rótulo do contador com ${label.replace(/\\n/g, " ").length} car. (limite ${COPY_LIMITS.counterLabel}).`)
  }
  const kit = resolveSection(source, bases, "kitCards")
  if (kit) {
    const heading = getStr(kit, "heading")
    if (heading !== null && heading.length > COPY_LIMITS.kitHeading) copy(`título do kit com ${heading.length} car. (limite ${COPY_LIMITS.kitHeading}).`)
    const n = countObjects(kit, "images")
    if (n !== null && (n < COPY_LIMITS.kitMin || n > COPY_LIMITS.kitMax)) copy(`kit com ${n} imagens (limite ${COPY_LIMITS.kitMin}-${COPY_LIMITS.kitMax}).`)
  }
  const benefits = resolveSection(source, bases, "benefits")
  if (benefits) {
    const title = getStr(benefits, "title")
    if (title !== null && title.length > COPY_LIMITS.benefitsTitle) copy(`título de benefícios com ${title.length} car. (limite ${COPY_LIMITS.benefitsTitle}).`)
    const items = extractArrayBlock(benefits, "items")
    if (items && !/\.\.\./.test(items)) {
      const cards = [...items.matchAll(/\{[^{}]*title\s*:\s*"((?:[^"\\]|\\.)*)"[^{}]*desc\s*:\s*"((?:[^"\\]|\\.)*)"[^{}]*\}/gs)]
      if (cards.length && cards.length !== COPY_LIMITS.benefitsCards) copy(`benefícios com ${cards.length} cards (exigido ${COPY_LIMITS.benefitsCards}).`)
      cards.forEach(([ , t, d ], i) => {
        if (t.length > COPY_LIMITS.benefitTitle) copy(`benefício ${i + 1}: título com ${t.length} car. (limite ${COPY_LIMITS.benefitTitle}).`)
        if (d.length > COPY_LIMITS.benefitDesc) copy(`benefício ${i + 1}: descrição com ${d.length} car. (limite ${COPY_LIMITS.benefitDesc}).`)
      })
    }
  }
  const urgency = resolveSection(source, bases, "urgency")
  if (urgency) {
    const title = getStr(urgency, "title")
    const body = getStr(urgency, "body")
    const trust = getStrList(urgency, "trust")
    if (title !== null && title.length > COPY_LIMITS.urgencyTitle) copy(`título de urgência com ${title.length} car. (limite ${COPY_LIMITS.urgencyTitle}).`)
    if (body !== null && body.length > COPY_LIMITS.urgencyBody) copy(`corpo de urgência com ${body.length} car. (limite ${COPY_LIMITS.urgencyBody}).`)
    if (trust) {
      if (trust.length < COPY_LIMITS.trustMin || trust.length > COPY_LIMITS.trustMax) copy(`urgência com ${trust.length} selos (limite ${COPY_LIMITS.trustMin}-${COPY_LIMITS.trustMax}).`)
      trust.forEach((t, i) => { if (t.length > COPY_LIMITS.trustItem) copy(`selo ${i + 1} com ${t.length} car. (limite ${COPY_LIMITS.trustItem}).`) })
    }
  }
  const deliverables = resolveSection(source, bases, "deliverables")
  if (deliverables) {
    const title = getStr(deliverables, "title")
    const bullets = getStrList(deliverables, "bullets")
    if (title !== null && title.length > COPY_LIMITS.deliverablesTitle) copy(`título de entregáveis com ${title.length} car. (limite ${COPY_LIMITS.deliverablesTitle}).`)
    if (bullets) {
      if (bullets.length < COPY_LIMITS.deliverablesMin || bullets.length > COPY_LIMITS.deliverablesMax) copy(`entregáveis com ${bullets.length} itens (limite ${COPY_LIMITS.deliverablesMin}-${COPY_LIMITS.deliverablesMax}).`)
      bullets.forEach((b, i) => { if (b.length > COPY_LIMITS.deliverableItem) copy(`entregável ${i + 1} com ${b.length} car. (limite ${COPY_LIMITS.deliverableItem}).`) })
    }
  }
  const bonusSection = resolveSection(source, bases, "bonusSection")
  if (bonusSection) {
    const lead = getStr(bonusSection, "titleLead") ?? ""
    const high = getStr(bonusSection, "titleHighlight") ?? ""
    const subtitle = getStr(bonusSection, "subtitle")
    if (lead || high) {
      const total = `${lead} ${high}`.trim().length
      if (total > COPY_LIMITS.bonusTitleTotal) copy(`título de bônus com ${total} car. (limite ${COPY_LIMITS.bonusTitleTotal}).`)
    }
    if (subtitle !== null && subtitle.length > COPY_LIMITS.bonusSubtitle) copy(`subtítulo de bônus com ${subtitle.length} car. (limite ${COPY_LIMITS.bonusSubtitle}).`)
  }
  const bonusesBlock = extractArrayBlock(source, "bonuses")
  if (bonusesBlock && !/\.\.\./.test(bonusesBlock)) {
    const descs = [...bonusesBlock.matchAll(/desc\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1])
    const n = (bonusesBlock.match(/front\s*:/g) ?? []).length || descs.length
    if (n > COPY_LIMITS.bonusesMax) copy(`${n} bônus (limite ${COPY_LIMITS.bonusesMax}).`)
    descs.forEach((d, i) => { if (d.length > COPY_LIMITS.bonusDesc) copy(`bônus ${i + 1}: descrição com ${d.length} car. (limite ${COPY_LIMITS.bonusDesc}).`) })
  }
  const pricing = resolveSection(source, bases, "pricing")
  if (pricing) {
    const lead = getStr(pricing, "titleLead") ?? ""
    const high = getStr(pricing, "titleHighlight") ?? ""
    const note = getStr(pricing, "note")
    if (lead || high) {
      const total = `${lead} ${high}`.trim().length
      if (total > COPY_LIMITS.plansTitleTotal) copy(`título de planos com ${total} car. (limite ${COPY_LIMITS.plansTitleTotal}).`)
    }
    if (note !== null && note.length > COPY_LIMITS.plansNote) copy(`nota de planos com ${note.length} car. (limite ${COPY_LIMITS.plansNote}).`)
    const plans = extractArrayBlock(pricing, "plans")
    if (plans && !/\.\.\./.test(plans)) {
      for (const plan of [...plans.matchAll(/\{\s*id\s*:\s*"([^"]+)"([\s\S]*?)(?=\{\s*id\s*:|\}$)/g)]) {
        const items = getStrList(`{${plan[2]}`, "items")
        if (!items) continue
        const expected = plan[1] === "basic" ? COPY_LIMITS.basicItems : COPY_LIMITS.completeItems
        if (items.length !== expected) copy(`plano ${plan[1]} com ${items.length} itens (exigido ${expected}).`)
        items.forEach((item, i) => { if (item.length > COPY_LIMITS.planItem) copy(`plano ${plan[1]} item ${i + 1} com ${item.length} car. (limite ${COPY_LIMITS.planItem}).`) })
      }
    }
  }
  const guarantee = resolveSection(source, bases, "guarantee")
  if (guarantee) {
    const title = getStr(guarantee, "title")
    const body = getStr(guarantee, "body")
    if (title !== null && title.length > COPY_LIMITS.guaranteeTitle) copy(`título de garantia com ${title.length} car. (limite ${COPY_LIMITS.guaranteeTitle}).`)
    if (body !== null && body.replace(/\*\*/g, "").length > COPY_LIMITS.guaranteeBody) copy(`corpo de garantia com ${body.replace(/\*\*/g, "").length} car. (limite ${COPY_LIMITS.guaranteeBody}).`)
  }
  const access = resolveSection(source, bases, "access")
  if (access) {
    const title = getStr(access, "title")
    if (title !== null && title.length > COPY_LIMITS.accessTitle) copy(`título de acesso com ${title.length} car. (limite ${COPY_LIMITS.accessTitle}).`)
    const steps = extractArrayBlock(access, "steps")
    if (steps && !/\.\.\./.test(steps)) {
      const parsed = [...steps.matchAll(/title\s*:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?desc\s*:\s*"((?:[^"\\]|\\.)*)"/g)]
      if (parsed.length && parsed.length !== COPY_LIMITS.accessSteps) copy(`acesso com ${parsed.length} passos (exigido ${COPY_LIMITS.accessSteps}).`)
      parsed.forEach(([ , t, d ], i) => {
        if (t.length > COPY_LIMITS.stepTitle) copy(`passo ${i + 1}: título com ${t.length} car. (limite ${COPY_LIMITS.stepTitle}).`)
        if (d.length > COPY_LIMITS.stepDesc) copy(`passo ${i + 1}: descrição com ${d.length} car. (limite ${COPY_LIMITS.stepDesc}).`)
      })
    }
  }
  const faq = resolveSection(source, bases, "faq")
  if (faq) {
    const title = getStr(faq, "title")
    if (title !== null && title.length > COPY_LIMITS.faqTitle) copy(`título de FAQ com ${title.length} car. (limite ${COPY_LIMITS.faqTitle}).`)
    const items = extractArrayBlock(faq, "items")
    if (items && !/\.\.\./.test(items)) {
      const parsed = [...items.matchAll(/\bq\s*:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?\ba\s*:\s*"((?:[^"\\]|\\.)*)"/g)]
      if (parsed.length && parsed.length !== COPY_LIMITS.faqItems) copy(`FAQ com ${parsed.length} perguntas (exigido ${COPY_LIMITS.faqItems}).`)
      parsed.forEach(([ , q, a ], i) => {
        if (q.length > COPY_LIMITS.faqQ) copy(`FAQ ${i + 1}: pergunta com ${q.length} car. (limite ${COPY_LIMITS.faqQ}).`)
        if (a.length > COPY_LIMITS.faqA) copy(`FAQ ${i + 1}: resposta com ${a.length} car. (limite ${COPY_LIMITS.faqA}).`)
      })
    }
  }
  const footer = resolveSection(source, bases, "footer")
  if (footer) {
    const title = getStr(footer, "updateTitle")
    const body = getStr(footer, "updateBody")
    if (title !== null && title.length > COPY_LIMITS.footerTitle) copy(`título do aviso com ${title.length} car. (limite ${COPY_LIMITS.footerTitle}).`)
    if (body !== null && body.length > COPY_LIMITS.footerBody) copy(`corpo do aviso com ${body.length} car. (limite ${COPY_LIMITS.footerBody}).`)
  }
}

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(target)
    return /\.(?:ts|tsx|js|jsx|mjs)$/.test(entry.name) ? [target] : []
  }))
  return nested.flat()
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectFiles(target)
    return entry.isFile() ? [target] : []
  }))
  return nested.flat()
}

async function isWebpFile(filePath) {
  const handle = await open(filePath, "r")
  try {
    const header = Buffer.alloc(12)
    const { bytesRead } = await handle.read(header, 0, header.length, 0)
    return bytesRead === 12 && header.toString("ascii", 0, 4) === "RIFF" && header.toString("ascii", 8, 12) === "WEBP"
  } finally {
    await handle.close()
  }
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
  if (catalog.offers?.[catalog.homepageOffer]?.status === "draft") errors.push("homepageOffer não pode apontar para um rascunho.")

  const entries = Object.entries(catalog.offers ?? {})
  const draftCount = entries.filter(([, entry]) => entry.status === "draft").length
  const publishedCount = entries.length - draftCount
  if (publishedCount !== 15) errors.push("catalog.json precisa conter as 15 ofertas publicadas.")

  for (const [slug, entry] of entries) {
    if (entry.status !== undefined && entry.status !== "draft") errors.push(`${slug}: status legado ou inválido (${entry.status}).`)
    if (Object.hasOwn(entry, "paletteKey") || Object.hasOwn(entry, "className")) {
      errors.push(`${slug}: catálogo ainda contém paletteKey ou className legado.`)
    }
    if (typeof entry.label !== "string" || !entry.label.trim()) errors.push(`${slug}: label ausente.`)
    if (entry.favicon !== null && (typeof entry.favicon !== "string" || !entry.favicon.endsWith(".webp"))) errors.push(`${slug}: favicon precisa ser WebP.`)
    const isDraft = entry.status === "draft"
    if (isDraft) warnings.push(`${slug}: rascunho não publicado; configure checkout, valide e faça QA antes de ativar.`)
    if (entry.cashflow === null) {
      if (!isDraft) warnings.push(`${slug}: tracking Cashflow pendente.`)
    } else if (!UUID_PATTERN.test(entry.cashflow?.workspaceId ?? "") || !UUID_PATTERN.test(entry.cashflow?.offerId ?? "")) {
      errors.push(`${slug}: configuração Cashflow inválida.`)
    }

    const offerPath = path.join(root, "src", "config", "offers", slug, "offer.ts")
    let offerSource
    try {
      offerSource = await readFile(offerPath, "utf8")
    } catch {
      errors.push(`${slug}: oferta publicada sem offer.ts.`)
      continue
    }
    if (!isDraft) {
      const checkoutLinks = [...offerSource.matchAll(/ctaHref\s*:\s*["']([^"']+)["']/g)].map((match) => match[1])
      if (!checkoutLinks.length) errors.push(`${slug}: oferta publicada sem checkout explícito.`)
      for (const checkout of checkoutLinks) if (!CHECKOUT_PATTERN.test(checkout)) errors.push(`${slug}: checkout inválido (${checkout}).`)
      if (/ctaDisabled\s*:\s*true/.test(offerSource)) errors.push(`${slug}: oferta publicada contém CTA desabilitado.`)
    }
    if (!/\borientation\s*:\s*"(portrait|landscape)"/.test(offerSource) && !/"orientation"\s*:\s*"(portrait|landscape)"/.test(offerSource)) errors.push(`${slug}: orientation ausente (portrait|landscape).`)
    for (const dead of ["titleLine1", "titleLine2", "titleLine3", "subtitlePosition", "displayAspect", "cardImageAspect", "imageWidth", "imageHeight", "heading1", "heading2"]) {
      if (new RegExp(`["']?${dead}["']?\\s*:`).test(offerSource)) errors.push(`${slug}: campo removido ainda presente (${dead}).`)
    }
    if (/(?:^|[^.\w])audience\s*:/.test(offerSource)) errors.push(`${slug}: campo removido ainda presente (audience).`)
    if (/pill\s*:\s*["']/.test(extractBlock(offerSource, "bonusSection") ?? "")) errors.push(`${slug}: campo removido ainda presente (bonusSection.pill).`)
    const bases = await loadBases(root, offerSource)
    checkCopyLimits(slug, offerSource, bases, errors)
  }

  const publicImages = path.join(root, "public", "images")
  const imageFiles = await collectFiles(publicImages)
  for (const filePath of imageFiles) {
    const relative = path.relative(publicImages, filePath).split(path.sep).join("/")
    const nestedParts = relative.split("/").slice(1)
    const asset = path.basename(filePath)
    if (path.extname(asset).toLowerCase() !== ".webp") errors.push(`public/images/${relative}: somente WebP pode ser publicado.`)
    if (nestedParts.length !== 1 || !/^(?:plano-(?:basico|completo)|demonstrativo-\d{2}|depoimento-\d{2}|bonus-\d{2}-(?:frente|verso)|garantia|favicon|beneficio)\.webp$/.test(asset)) {
      errors.push(`public/images/${relative}: nome de imagem fora do padrão.`)
    }
    if (path.extname(asset).toLowerCase() === ".webp" && !(await isWebpFile(filePath))) errors.push(`public/images/${relative}: arquivo não contém dados WebP válidos.`)
  }
  const faviconPath = path.join(root, "public", "favicon.webp")
  try {
    await readFile(faviconPath)
    if (!(await isWebpFile(faviconPath))) errors.push("public/favicon.webp não contém dados WebP válidos.")
  } catch { errors.push("public/favicon.webp ausente.") }

  const sourceFiles = await collectSourceFiles(path.join(root, "src"))
  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8")
    if (LEGACY_HOST_PATTERN.test(source) || LEGACY_SCRIPT_PATTERN.test(source)) errors.push(`${path.relative(root, sourceFile)}: referência à integração antiga.`)
  }

  const routeLayout = await readFile(path.join(root, "src", "components", "OfferRouteLayout.tsx"), "utf8")
  for (const marker of ["cashflowScriptUrl", 'data-nowprocket', 'data-no-minify="1"', 'data-no-optimize="1"', 'data-cfasync="false"', 'strategy="afterInteractive"']) {
    if (!routeLayout.includes(marker)) errors.push(`OfferRouteLayout não contém ${marker}.`)
  }

  return { errors, warnings, offerCount: publishedCount, draftCount, paletteCount: configuredPalettes.size, imageCount: imageFiles.length }
}

export async function main(argv = process.argv.slice(2)) {
  const rootIndex = argv.indexOf("--workspace-root")
  const workspaceRoot = rootIndex >= 0 ? argv[rootIndex + 1] : process.cwd()
  if (rootIndex >= 0 && !workspaceRoot) throw new Error("Valor ausente para --workspace-root.")
  const result = await validateOffers(workspaceRoot)
  for (const warning of result.warnings) console.warn(`Aviso: ${warning}`)
  for (const error of result.errors) console.error(`Erro: ${error}`)
  console.log(`${result.offerCount} ofertas publicadas, ${result.draftCount} rascunhos, ${result.paletteCount} paletas e ${result.imageCount + 1} arquivos WebP validados.`)
  if (result.errors.length) process.exitCode = 1
}

const isEntryPoint = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isEntryPoint) main().catch((error) => { console.error(`Erro: ${error.message}`); process.exitCode = 1 })
