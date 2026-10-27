#!/usr/bin/env node
/**
 * Conferência da migração para o hub: compara, página a página, o HTML renderizado de #offer-root (sem scripts)
 * entre o site "antes" (Blob + offer.ts) e o site "depois" (lendo do hub), e o favicon, o título e o script da Cashflow.
 * Uso: node scripts/qa-hub-parity.mjs --antes http://127.0.0.1:3101 --depois http://127.0.0.1:3102 [--slugs a,b]
 * As slugs vêm da exportação (.local/paginas-export.json) quando --slugs não é informado.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import path from "node:path"

const args = process.argv.slice(2)
const option = (name, fallback) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : fallback }
const before = new URL(option("--antes", "http://127.0.0.1:3101"))
const after = new URL(option("--depois", "http://127.0.0.1:3102"))
const outDir = path.resolve(option("--saida", ".local/qa-hub-parity"))
const slugs = option("--slugs", "")
  ? option("--slugs").split(",")
  : JSON.parse(await readFile(".local/paginas-export.json", "utf8")).pages.map((page) => page.slug)

function normalize(html) {
  const start = html.indexOf('id="offer-root"')
  const end = html.lastIndexOf("</body>")
  const body = start >= 0 ? html.slice(html.lastIndexOf("<", start), end) : ""
  return body
    .replace(/<script\b[\s\S]*?<\/script>/g, "")
    .replace(/<template\b[\s\S]*?<\/template>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    // Next streams the metadata into the body when it is ready; title and icon are compared separately.
    .replace(/<title>[^<]*<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g, "")
    // Empty React streaming placeholders depend on compile timing, not on the page.
    .replace(/<div hidden id="S:\d+"><\/div>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function head(html) {
  return {
    title: html.match(/<title>([^<]*)<\/title>/)?.[1] ?? null,
    icon: html.match(/<link rel="icon" href="([^"]+)"/)?.[1] ?? null,
    cashflow: html.match(/cashflow\.mentoriaprocesso\.com\/t\/p\.js\?w=([^&"]+)&(?:amp;)?o=([^"&]+)/)?.slice(1).join("/") ?? null,
  }
}

async function render(base, slug) {
  const response = await fetch(new URL(`/${slug}`, base), { redirect: "manual", cache: "no-store" })
  return { status: response.status, html: await response.text() }
}

await mkdir(outDir, { recursive: true })
const results = []
for (const slug of slugs) {
  const [a, b] = await Promise.all([render(before, slug), render(after, slug)])
  const bodyA = normalize(a.html), bodyB = normalize(b.html)
  const headA = head(a.html), headB = head(b.html)
  const problems = []
  if (a.status !== b.status) problems.push(`status ${a.status} → ${b.status}`)
  if (bodyA !== bodyB) {
    let index = 0
    while (index < bodyA.length && bodyA[index] === bodyB[index]) index += 1
    problems.push(`HTML difere a partir de: …${bodyA.slice(Math.max(0, index - 60), index + 80)}… ≠ …${bodyB.slice(Math.max(0, index - 60), index + 80)}…`)
    await writeFile(path.join(outDir, `${slug}-antes.html`), bodyA)
    await writeFile(path.join(outDir, `${slug}-depois.html`), bodyB)
  }
  for (const key of ["title", "icon", "cashflow"]) if (headA[key] !== headB[key]) problems.push(`${key}: ${headA[key]} → ${headB[key]}`)
  if (a.status === 200 && bodyA.length < 1000) problems.push("página 'antes' sem conteúdo renderizado")
  results.push({ slug, status: b.status, bytes: bodyB.length, ok: problems.length === 0, problems })
  console.log(`${problems.length ? "DIFERE" : "igual "} ${slug.padEnd(16)} ${a.status}/${b.status} ${bodyB.length} bytes${problems.length ? `\n  ${problems.join("\n  ")}` : ""}`)
}
await writeFile(path.join(outDir, "resultado.json"), JSON.stringify({ before: before.origin, after: after.origin, at: new Date().toISOString(), results }, null, 2))
const failed = results.filter((item) => !item.ok)
console.log(`\n${results.length - failed.length}/${results.length} páginas iguais.`)
if (failed.length) process.exitCode = 1
