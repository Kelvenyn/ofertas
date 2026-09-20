import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { BlobPreconditionFailedError } from "@vercel/blob"
import ts from "typescript"

const helperSource = await readFile(new URL("../src/lib/versioned-blob-update.ts", import.meta.url), "utf8")
const helperModule = ts.transpileModule(helperSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { updateVersionedValue } = await import(`data:text/javascript;base64,${Buffer.from(helperModule).toString("base64")}`)

test("re-reads and reapplies an update after an ETag conflict", async () => {
  let stored = {
    value: { offers: { psicopedagogia: "checkout antigo", tilapia: "link atual" } },
    etag: "etag-1",
  }
  let writeCount = 0

  const result = await updateVersionedValue({
    read: async () => structuredClone(stored),
    update: (current) => ({
      value: { ...current, offers: { ...current.offers, psicopedagogia: "checkout novo" } },
      result: "psicopedagogia",
    }),
    write: async (value, etag) => {
      writeCount += 1
      if (etag !== stored.etag) {
        throw new BlobPreconditionFailedError()
      }

      if (writeCount === 1) {
        stored = {
          value: { ...stored.value, offers: { ...stored.value.offers, tilapia: "link atualizado em paralelo" } },
          etag: "etag-2",
        }
        throw new BlobPreconditionFailedError()
      }

      stored = { value, etag: "etag-3" }
    },
    isConflict: (error) => error instanceof BlobPreconditionFailedError,
  })

  assert.equal(result, "psicopedagogia")
  assert.equal(writeCount, 2)
  assert.deepEqual(stored.value.offers, {
    psicopedagogia: "checkout novo",
    tilapia: "link atualizado em paralelo",
  })
})
