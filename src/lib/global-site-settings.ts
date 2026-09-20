import "server-only"
import { get, put } from "@vercel/blob"
import { unstable_cache } from "next/cache"

export type GlobalSize = "P" | "M" | "G"

export interface GlobalSiteSettings {
  typographySize: GlobalSize
  imageSize: GlobalSize
}

const BLOB_PATH = "admin/global-site-settings.json"
export const GLOBAL_SITE_SETTINGS_CACHE_TAG = "global-site-settings"
export const DEFAULT_GLOBAL_SITE_SETTINGS: GlobalSiteSettings = {
  typographySize: "M",
  imageSize: "M",
}

const SIZE_SCALES: Record<GlobalSize, number> = { P: 0.94, M: 1, G: 1.08 }

function isGlobalSize(value: unknown): value is GlobalSize {
  return value === "P" || value === "M" || value === "G"
}

function parseSettings(value: unknown): GlobalSiteSettings {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Configuração global inválida.")
  }
  const candidate = value as Record<string, unknown>
  if (candidate.version !== 1 || !isGlobalSize(candidate.typographySize) || !isGlobalSize(candidate.imageSize)) {
    throw new Error("Configuração global incompatível.")
  }
  return { typographySize: candidate.typographySize, imageSize: candidate.imageSize }
}

async function readSettings(): Promise<GlobalSiteSettings> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULT_GLOBAL_SITE_SETTINGS
  const blob = await get(BLOB_PATH, { access: "private", useCache: false })
  if (!blob) return DEFAULT_GLOBAL_SITE_SETTINGS
  try {
    return parseSettings(await new Response(blob.stream).json())
  } catch (error) {
    throw new Error("As configurações globais não puderam ser lidas.", { cause: error })
  }
}

const getCachedSettings = unstable_cache(
  readSettings,
  ["global-site-settings-v1"],
  { revalidate: 3600, tags: [GLOBAL_SITE_SETTINGS_CACHE_TAG] },
)

export async function getGlobalSiteSettings(): Promise<GlobalSiteSettings> {
  return getCachedSettings()
}

export function globalSiteSettingsStyle(settings: GlobalSiteSettings): Record<string, string> {
  return {
    "--lp-font-scale": String(SIZE_SCALES[settings.typographySize]),
    "--lp-image-scale": String(SIZE_SCALES[settings.imageSize]),
  }
}

export async function updateGlobalSiteSettings(settings: GlobalSiteSettings): Promise<void> {
  if (!isGlobalSize(settings.typographySize) || !isGlobalSize(settings.imageSize)) {
    throw new Error("Escolha P, M ou G para texto e imagens.")
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("O armazenamento de configurações não está configurado.")

  const current = await get(BLOB_PATH, { access: "private", useCache: false })
  await put(BLOB_PATH, JSON.stringify({ version: 1, ...settings }), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
    ...(current ? { ifMatch: current.blob.etag } : {}),
  })
}
