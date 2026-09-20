import assert from "node:assert/strict"
import { execFile } from "node:child_process"
import { readdir } from "node:fs/promises"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)
const assetDir = fileURLToPath(new URL("../public/images/higienizacao/", import.meta.url))

test("Higienização usa os 37 WebPs normalizados, incluindo favicon e selo", async () => {
  const files = (await readdir(assetDir)).sort()
  assert.equal(files.length, 37)
  assert.ok(files.every((file) => path.extname(file) === ".webp"))
  assert.equal(files.filter((file) => /^demonstrativo-\d{2}\.webp$/.test(file)).length, 15)
  assert.equal(files.filter((file) => /^depoimento-\d{2}\.webp$/.test(file)).length, 6)
  assert.equal(files.filter((file) => /^bonus-\d{2}-(frente|verso)\.webp$/.test(file)).length, 12)
  assert.deepEqual(files.filter((file) => /^plano-/.test(file)), ["plano-basico.webp", "plano-completo.webp"])
  assert.ok(files.includes("favicon.webp"))
  assert.ok(files.includes("garantia.webp"))

  const { stdout } = await execFileAsync("magick", ["identify", "-format", "%f %m %wx%h\n", ...files.map((file) => path.join(assetDir, file))], { windowsHide: true })
  for (const line of stdout.trim().split(/\r?\n/)) {
    const match = line.match(/^(\S+) WEBP (\d+)x(\d+)$/)
    assert.ok(match, `asset inválido: ${line}`)
    const [, name, width, height] = match
    if (name.startsWith("plano-")) assert.equal(`${width}x${height}`, "1080x1080")
    else if (name.startsWith("demonstrativo-") || name.startsWith("bonus-")) assert.ok(Number(width) <= 1200, `${name}: largura acima de 1200px`)
  }
})
