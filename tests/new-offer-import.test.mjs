import assert from "node:assert/strict"
import { execFile } from "node:child_process"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { promisify } from "node:util"
import { classifySourceAsset, importOffer, planOfferImport } from "../scripts/new-offer-lib.mjs"

const execFileAsync = promisify(execFile)

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "ofertas-import-test-"))
  const source = path.join(root, "source")
  const workspaceRoot = path.join(root, "workspace")
  await mkdir(source, { recursive: true })
  await mkdir(path.join(workspaceRoot, "public", "images"), { recursive: true })
  await mkdir(path.join(workspaceRoot, "src", "config", "offers"), { recursive: true })
  await mkdir(path.join(workspaceRoot, "src", "app"), { recursive: true })
  await writeFile(path.join(workspaceRoot, "src", "config", "offers", "catalog.json"), '{"homepageOffer":"referencia","offers":{"referencia":{"status":"active"}}}\n')
  await writeFile(path.join(workspaceRoot, "src", "config", "offers", "index.ts"), `import type { OfferConfig } from "@/types/offer"
import { OFFER as referencia } from "./referencia/offer"

export const OFFER_CONFIGS = {
  referencia,
} satisfies Record<string, OfferConfig>
`)
  return { root, source, workspaceRoot }
}

test("normaliza todos os padrões de nomes da pasta de origem", () => {
  const cases = {
    "Imagem (1).png": "page-01.webp",
    "Imagem (15).PNG": "page-15.webp",
    "Depoimento (6).png": "testimonial-06.webp",
    "bonus-2-frente.png": "bonus-02-front.webp",
    "bonus-2-verso.png": "bonus-02-back.webp",
    "Plano Básico.png": "plan-basic.webp",
    "Plano Completo.png": "plan-complete.webp",
  }
  for (const [sourceName, targetName] of Object.entries(cases)) {
    assert.equal(classifySourceAsset(sourceName)?.targetName, targetName)
  }
  assert.equal(classifySourceAsset("PV.txt"), null)
  assert.equal(classifySourceAsset("capa-surpresa.png")?.kind, "unknown")
})

test("--dry-run inventaria sem criar arquivos ou chamar o conversor", async (t) => {
  const paths = await fixture()
  t.after(() => rm(paths.root, { recursive: true, force: true }))
  await writeFile(path.join(paths.source, "Imagem (1).png"), "não precisa ser uma imagem no dry-run")
  await writeFile(path.join(paths.source, "PV.txt"), "Copy da página")
  let converterCalled = false

  const result = await importOffer(
    { source: paths.source, slug: "oferta-teste", workspaceRoot: paths.workspaceRoot, dryRun: true },
    { convert: async () => { converterCalled = true } },
  )

  assert.equal(result.dryRun, true)
  assert.equal(result.report.counts.page, 1)
  assert.equal(result.report.copy.requiresAgent, true)
  assert.equal(converterCalled, false)
  await assert.rejects(readFile(path.join(paths.workspaceRoot, "public", "images", "oferta-teste", "page-01.webp")))
})

test("recusa sobrescrever uma pasta de assets ou configuração existente", async (t) => {
  const paths = await fixture()
  t.after(() => rm(paths.root, { recursive: true, force: true }))
  await writeFile(path.join(paths.source, "Imagem (1).png"), "fixture")
  await mkdir(path.join(paths.workspaceRoot, "public", "images", "oferta-teste"))

  await assert.rejects(
    planOfferImport({ source: paths.source, slug: "oferta-teste", workspaceRoot: paths.workspaceRoot }),
    /nunca sobrescreve/,
  )
})

test("converte para WebP, limita dimensões e uma segunda execução não altera o resultado", async (t) => {
  try {
    await execFileAsync("magick", ["-version"], { windowsHide: true })
  } catch {
    t.skip("ImageMagick não está disponível")
    return
  }

  const paths = await fixture()
  t.after(() => rm(paths.root, { recursive: true, force: true }))
  await execFileAsync("magick", ["-size", "1300x80", "xc:#334155", path.join(paths.source, "Imagem (1).png")], { windowsHide: true })
  await execFileAsync("magick", ["-size", "1200x1200", "xc:#D4A017", path.join(paths.source, "Plano Básico.png")], { windowsHide: true })
  await writeFile(path.join(paths.source, "PV.txt"), "Copy que será adaptada por um agente")

  const result = await importOffer({ source: paths.source, slug: "oferta-teste", workspaceRoot: paths.workspaceRoot })
  assert.equal(result.dryRun, false)
  const page = path.join(result.targetAssetsDir, "page-01.webp")
  const plan = path.join(result.targetAssetsDir, "plan-basic.webp")
  const { stdout } = await execFileAsync("magick", ["identify", "-format", "%m %wx%h\n", page, plan], { windowsHide: true })
  assert.match(stdout, /^WEBP 1200x74\r?\nWEBP 1080x1080/m)

  const report = JSON.parse(await readFile(path.join(result.targetConfigDir, "import-report.json"), "utf8"))
  assert.equal(report.catalogDefaults.status, "draft")
  assert.equal(report.copy.requiresAgent, true)
  assert.equal(await readFile(path.join(result.targetConfigDir, "PV.txt"), "utf8"), "Copy que será adaptada por um agente")
  assert.match(await readFile(path.join(result.targetConfigDir, "offer.ts"), "utf8"), /Scaffold inicial/)
  assert.match(await readFile(path.join(result.targetRouteDir, "layout.tsx"), "utf8"), /OfferRouteLayout/)
  assert.match(await readFile(path.join(result.targetRouteDir, "page.tsx"), "utf8"), /OfferPage/)
  const catalog = JSON.parse(await readFile(path.join(paths.workspaceRoot, "src", "config", "offers", "catalog.json"), "utf8"))
  assert.equal(catalog.offers["oferta-teste"].status, "draft")
  assert.equal(catalog.offers["oferta-teste"].cashflow, null)
  assert.match(await readFile(path.join(paths.workspaceRoot, "src", "config", "offers", "index.ts"), "utf8"), /"oferta-teste": oferta_teste/)

  await assert.rejects(
    importOffer({ source: paths.source, slug: "oferta-teste", workspaceRoot: paths.workspaceRoot }),
    /nunca sobrescreve/,
  )
  assert.equal(await readFile(path.join(result.targetConfigDir, "PV.txt"), "utf8"), "Copy que será adaptada por um agente")
})
