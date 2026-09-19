#!/usr/bin/env node
import path from "node:path"
import { fileURLToPath } from "node:url"
import { importOffer } from "./new-offer-lib.mjs"

export function parseArgs(argv) {
  const result = { dryRun: false }
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === "--dry-run") result.dryRun = true
    else if (argument === "--source" || argument === "--slug" || argument === "--workspace-root") {
      const value = argv[index + 1]
      if (!value || value.startsWith("--")) throw new Error(`Valor ausente para ${argument}.`)
      result[argument.slice(2).replace("workspace-root", "workspaceRoot")] = value
      index += 1
    } else if (argument === "--help" || argument === "-h") result.help = true
    else throw new Error(`Argumento desconhecido: ${argument}`)
  }
  return result
}

export const HELP = `Uso: npm run offer:new -- --source <pasta> --slug <slug> [--dry-run]

Converte e normaliza imagens, preserva PV.txt e cria um relatório para adaptação da copy.
O importador recusa sobrescrever uma oferta existente.`

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv)
  if (options.help) {
    console.log(HELP)
    return
  }
  if (!options.source || !options.slug) throw new Error("--source e --slug são obrigatórios.")

  const result = await importOffer(options)
  console.log(JSON.stringify({
    mode: result.dryRun ? "dry-run" : "import",
    slug: options.slug,
    assets: result.report.counts,
    copyRequiresAgent: result.report.copy.requiresAgent,
    destinations: {
      assets: path.relative(result.root, result.targetAssetsDir),
      route: path.relative(result.root, result.targetRouteDir),
      report: path.relative(result.root, path.join(result.targetConfigDir, "import-report.json")),
    },
  }, null, 2))
}

const isEntryPoint = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isEntryPoint) {
  main().catch((error) => {
    console.error(`Erro: ${error.message}`)
    process.exitCode = 1
  })
}
