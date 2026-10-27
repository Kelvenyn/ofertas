import { BlobPreconditionFailedError } from "@vercel/blob"
import { OfferRoutingError } from "./offer-routing"

export interface OfferCreateInput {
  label: string
  slug: string
}

export interface OfferCreateHandlerDependencies {
  isAdminAuthenticated: () => Promise<boolean>
  createOperationalOffer: (input: OfferCreateInput) => Promise<{ id: string; slug: string; status: string; label: string }>
  revalidateOffer: (slug: string) => void | Promise<void>
}

export async function handleOfferCreateRequest(request: Request, dependencies: OfferCreateHandlerDependencies) {
  if (!(await dependencies.isAdminAuthenticated())) {
    return { status: 401, body: { error: "Faça login para criar ofertas." } }
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return { status: 400, body: { error: "Dados inválidos." } }
  }
  const parsed = parseOfferCreateInput(body)
  if ("error" in parsed) return { status: 400, body: { error: parsed.error } }

  let entry: Awaited<ReturnType<OfferCreateHandlerDependencies["createOperationalOffer"]>>
  try {
    entry = await dependencies.createOperationalOffer(parsed)
  } catch (error) {
    if (error instanceof OfferRoutingError) return { status: error.statusCode, body: { error: error.message } }
    if (error instanceof BlobPreconditionFailedError) {
      return { status: 409, body: { error: "O catálogo foi alterado ao mesmo tempo por outra gravação. Tente criar a oferta novamente." } }
    }
    if (error instanceof Error && error.message === "O armazenamento operacional não está configurado.") {
      return { status: 503, body: { error: error.message } }
    }
    return { status: 503, body: { error: "Não foi possível criar a oferta agora." } }
  }

  await dependencies.revalidateOffer(entry.slug)
  return { status: 201, body: { ok: true, entry } }
}

export function suggestOfferSlug(label: string): string {
  return label.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function parseOfferCreateInput(value: unknown): OfferCreateInput | { error: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Dados inválidos." }
  const candidate = value as Record<string, unknown>
  if (typeof candidate.label !== "string") return { error: "O nome deve ter de 1 a 80 caracteres." }
  const label = candidate.label.trim()
  if (!label || label.length > 80) return { error: "O nome deve ter de 1 a 80 caracteres." }
  if (typeof candidate.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.slug) || candidate.slug.length > 63) {
    return { error: "A slug deve usar até 63 caracteres, com letras minúsculas, números e hífens entre palavras." }
  }
  return { label, slug: candidate.slug }
}
