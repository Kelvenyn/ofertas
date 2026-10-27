import "server-only"
import { get } from "@vercel/blob"
import { unstable_cache } from "next/cache"
import { isSnapshot, type HubPage, type HubSnapshot } from "@/lib/hub-pages-domain"

export { renderableOffer, snapshotSettings, snapshotToOverrides, type HubPage, type HubSnapshot } from "@/lib/hub-pages-domain"

/**
 * "O hub manda, o site exibe": the pages come from the hub (prado-company, GET /api/paginas/site). If the hub is
 * down the site serves the last snapshot it read, then the copy the hub keeps in the Blob store; a legacy page
 * missing from all of them falls back to its offer.ts. See prado-company/docs/PAGINAS.md.
 */

const SNAPSHOT_BLOB_PATH = `paginas/hub-snapshot-${process.env.VERCEL_ENV ?? "local"}.json`
const memory = globalThis as typeof globalThis & { __hubPagesLastGood?: HubSnapshot }

export function hubPagesUrl(): string | null {
  const value = process.env.HUB_PAGES_URL?.trim()
  if (!value || !process.env.PAGES_SITE_TOKEN?.trim()) return null
  try { return new URL(value).origin } catch { return null }
}


async function fetchHub(path: string): Promise<Response> {
  const base = hubPagesUrl()
  if (!base) throw new Error("Hub de páginas não configurado.")
  return fetch(new URL(path, base), {
    headers: { authorization: `Bearer ${process.env.PAGES_SITE_TOKEN!.trim()}` },
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  })
}

async function readBlobSnapshot(): Promise<HubSnapshot | undefined> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return undefined
  try {
    const blob = await get(SNAPSHOT_BLOB_PATH, { access: "private", useCache: false })
    const value = blob ? await new Response(blob.stream).json() : undefined
    return isSnapshot(value) ? value : undefined
  } catch { return undefined }
}

/** Hub first; then the last good snapshot of this instance; then the hub's copy in Blob. */
export async function loadHubSnapshot(): Promise<{ snapshot: HubSnapshot; source: "hub" | "memory" | "blob" }> {
  try {
    const response = await fetchHub("/api/paginas/site")
    if (!response.ok) throw new Error(`Hub respondeu ${response.status}.`)
    const value = await response.json()
    if (!isSnapshot(value)) throw new Error("Resposta do hub em formato desconhecido.")
    memory.__hubPagesLastGood = value
    return { snapshot: value, source: "hub" }
  } catch (error) {
    if (memory.__hubPagesLastGood) return { snapshot: memory.__hubPagesLastGood, source: "memory" }
    const blob = await readBlobSnapshot()
    if (blob) return { snapshot: blob, source: "blob" }
    throw new Error("Nem o hub nem a cópia do Blob responderam.", { cause: error })
  }
}

// The hub asks for a revalidation on every save; the 5-minute window only bounds a missed call. The tags are the
// ones of the catalog and of the global settings (operational-catalog.ts, global-site-settings.ts).
export const getCachedHubSnapshot = unstable_cache(
  async () => (await loadHubSnapshot()).snapshot,
  ["hub-pages-snapshot-v1"],
  { revalidate: 300, tags: ["operational-offers", "global-site-settings"] },
)




/** One page in any status for the hub editor's preview (never cached). */
export async function fetchHubPage(id: string): Promise<HubPage | undefined> {
  const response = await fetchHub(`/api/paginas/site/${encodeURIComponent(id)}`)
  if (response.status === 404) return undefined
  if (!response.ok) throw new Error(`Hub respondeu ${response.status}.`)
  return response.json() as Promise<HubPage>
}
