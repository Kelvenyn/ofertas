/** Fixed origin of the hub tracker script (the hub only boots pages for configurations it created). */
export const HUB_TRACKER_ORIGIN = "https://prado-company.com"
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/** Script URL for a page whose hub tracker is on, or null. Runs alongside the Cashflow tag, never instead of it. */
export function hubTrackerScriptUrl(value: unknown): string | null {
  const key = value && typeof value === "object" ? (value as { publicKey?: unknown }).publicKey : undefined
  return typeof key === "string" && UUID.test(key) ? `${HUB_TRACKER_ORIGIN}/api/tracker/script/${key}` : null
}
