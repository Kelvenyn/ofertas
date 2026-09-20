"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { CashflowConfig } from "@/config/offers/catalog"
import { FIXED_ACTION_COLORS } from "@/config/offers/palettes"
import type { OfferConfig, OfferPalette, SectionId } from "@/types/offer"
import { getOfferCopyIssues } from "@/lib/offer-validation"
import { calculateDiscountPercentage } from "@/lib/pricing"
import { PanelLogoutButton } from "../PanelLogoutButton"
import styles from "./editor.module.css"

type TabId = "cores" | "imagens" | "oferta" | "copy" | "secoes"
type OfferStatus = "active" | "inactive" | "draft"
type OfferSubtab = "checkout" | "cashflow"
type CopySubtab = "edicao" | "prompt" | "colar"
type UploadResult = { file: string; canonical?: string; status: "success" | "error"; message: string }
const TABS: { id: TabId; label: string }[] = [
  { id: "cores", label: "Cores" }, { id: "imagens", label: "Imagens" }, { id: "oferta", label: "Oferta" },
  { id: "copy", label: "Copy" }, { id: "secoes", label: "Seções" },
]
const SECTION_LABELS: Record<SectionId, string> = {
  countdown: "Barra de contagem", hero: "Hero", socialProof: "Prova social", counter: "Contador",
  kit: "Primeiro trilho do kit", kitReversed: "Segundo trilho do kit", benefits: "Benefícios", urgency: "Urgência",
  deliverables: "Tudo o que você recebe", bonuses: "Bônus", pricing: "Planos e compra", guarantee: "Garantia",
  access: "Como acessar", faq: "Perguntas frequentes", footer: "Rodapé",
}
const SECTION_IDS = Object.keys(SECTION_LABELS) as SectionId[]
const CURRENT_ACTION_COLORS = FIXED_ACTION_COLORS

function cashflowScriptFor(config: CashflowConfig | null): string {
  if (!config?.workspaceId || !config.offerId) return ""
  const workspace = encodeURIComponent(config.workspaceId)
  const offer = encodeURIComponent(config.offerId)
  return `<script src="https://cashflow.mentoriaprocesso.com/t/p.js?w=${workspace}&o=${offer}" data-offer="${config.offerId}" data-nowprocket data-no-minify="1" data-no-optimize="1" data-cfasync="false" async></script>`
}

function parseCashflowScript(source: string): { config?: CashflowConfig; error?: string } {
  const trimmed = source.trim()
  if (!trimmed) return { config: undefined }
  const script = trimmed.match(/^<script\b([^>]*)>\s*<\/script\s*>$/i)
  if (!script) return { error: "Cole somente a tag script da Cashflow, sem código adicional." }

  const attributes = new Map<string, string>()
  const pattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g
  for (const match of script[1].matchAll(pattern)) attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? "")
  const src = attributes.get("src")
  if (!src) return { error: "A tag precisa conter o endereço oficial da Cashflow." }
  let url: URL
  try { url = new URL(src) } catch { return { error: "O endereço do script não é válido." } }
  if (url.protocol !== "https:" || url.hostname !== "cashflow.mentoriaprocesso.com" || url.pathname !== "/t/p.js") {
    return { error: "Use o script oficial https://cashflow.mentoriaprocesso.com/t/p.js." }
  }
  const workspaceId = url.searchParams.get("w")?.trim() ?? ""
  const offerId = url.searchParams.get("o")?.trim() ?? ""
  if (!workspaceId || !offerId) return { error: "O endereço precisa conter os parâmetros w e o." }
  if (attributes.get("data-offer") !== offerId) return { error: "O valor de data-offer precisa corresponder ao parâmetro o." }
  return { config: { workspaceId, offerId } }
}

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch { /* Tenta o método compatível com páginas fora de contexto seguro. */ }
  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.append(textarea)
  textarea.select()
  const copied = document.execCommand("copy")
  textarea.remove()
  return copied
}

function readPath(value: unknown, path: (string | number)[]): unknown {
  return path.reduce<unknown>((current, part) => {
    if (current && typeof current === "object") return (current as Record<string | number, unknown>)[part]
    return undefined
  }, value)
}

function writePath<T>(source: T, path: (string | number)[], value: unknown): T {
  const clone = structuredClone(source) as unknown as Record<string | number, unknown>
  let current: Record<string | number, unknown> | unknown[] = clone
  for (const part of path.slice(0, -1)) {
    const next = (current as Record<string | number, unknown>)[part]
    current = next as Record<string | number, unknown> | unknown[]
  }
  ;(current as Record<string | number, unknown>)[path[path.length - 1]] = value
  return clone as unknown as T
}

function canonicalImageName(input: string): string | undefined {
  const stem = input.split(/[\\/]/).pop()?.replace(/\.[^.]+$/, "") ?? ""
  const normalized = stem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-").replace(/_/g, "-")
  if (/^(plano-?completo|plan-?complete)$/.test(normalized)) return "plano-completo.webp"
  if (/^(plano-?basico|plan-?basic)$/.test(normalized)) return "plano-basico.webp"
  if (/^(garantia|garantia-30-dias)$/.test(normalized)) return "garantia.webp"
  if (/^(favicon|icone)$/.test(normalized)) return "favicon.webp"
  if (/^(beneficio|benefit)$/.test(normalized)) return "beneficio.webp"
  const bonus = normalized.match(/^bonus-?(\d{1,2})-(frente|front|verso|back)$/)
  if (bonus) return `bonus-${String(Number(bonus[1])).padStart(2, "0")}-${/verso|back/.test(bonus[2]) ? "verso" : "frente"}.webp`
  const demo = normalized.match(/^(?:demonstrativo|demo|imagem|page)-?(\d{1,2})$/)
  if (demo) return `demonstrativo-${String(Number(demo[1])).padStart(2, "0")}.webp`
  const testimonial = normalized.match(/^(?:depoimento|testimonial|testemunho)-?(\d{1,2})$/)
  if (testimonial) return `depoimento-${String(Number(testimonial[1])).padStart(2, "0")}.webp`
  return undefined
}

function replaceAssetReferences(value: unknown, slug: string, name: string, url: string): unknown {
  if (typeof value === "string") {
    const localPath = `/images/${slug}/${name}`
    if (value === localPath) return url
    try {
      const parsed = new URL(value, window.location.origin)
      const isBlob = parsed.hostname.endsWith(".public.blob.vercel-storage.com")
      if (isBlob && decodeURIComponent(parsed.pathname).endsWith(`/${name}`)) return url
    } catch { /* Mantém referências que não são URLs. */ }
    return value
  }
  if (Array.isArray(value)) return value.map((item) => replaceAssetReferences(item, slug, name, url))
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceAssetReferences(item, slug, name, url)]))
  }
  return value
}

function toPipePair(value: string): [string, string] {
  const divider = value.indexOf("|")
  return divider < 0 ? [value.trim(), ""] : [value.slice(0, divider).trim(), value.slice(divider + 1).trim()]
}

function applyCopyBlock(copy: string, source: OfferConfig): { offer: OfferConfig; count: number } {
  let offer = structuredClone(source)
  let count = 0
  const apply = (path: (string | number)[], value: string) => { offer = writePath(offer, path, value); count += 1 }
  const lines = copy.split(/\r?\n/)
  for (const rawLine of lines) {
    const match = rawLine.trim().match(/^([A-ZÀ-Ü_]+?)(?:\s+(\d+))?(?:\s+ITEM\s+(\d+))?(?:\s+\([^)]*\))?\s*:\s*(.*)$/i)
    if (!match) continue
    const [, rawKey, rawIndex, rawItemIndex, rawValue] = match
    const key = rawKey.toUpperCase()
    const index = rawIndex ? Number(rawIndex) - 1 : -1
    const itemIndex = rawItemIndex ? Number(rawItemIndex) - 1 : -1
    const pair = toPipePair(rawValue)
    if (key === "PILL") apply(["hero", "pill"], rawValue)
    else if (key === "HEADLINE") apply(["hero", "headline"], rawValue)
    else if (key === "SUBLINE") apply(["hero", "subline"], rawValue)
    else if (key === "APOIO") apply(["hero", "support"], rawValue)
    else if (key === "BULLET" && index >= 0 && index < 4) apply(["hero", "bullets", index], rawValue)
    else if (key === "BOTAO") apply(["hero", "ctaText"], rawValue)
    else if (key === "MARQUEE") apply(["hero", "marqueeText"], rawValue)
    else if (key === "PROVA_SOCIAL_TITULO") apply(["socialProof", "title"], rawValue)
    else if (key === "CONTADOR_PREFIXO") apply(["counter", "prefix"], rawValue)
    else if (key === "CONTADOR_LABEL") apply(["counter", "label"], rawValue)
    else if (key === "KIT_TITULO") apply(["kitCards", "heading"], rawValue)
    else if (key === "BENEFICIOS_TITULO") apply(["benefits", "title"], rawValue)
    else if (key === "BENEFICIO" && index >= 0 && index < offer.benefits.items.length) {
      apply(["benefits", "items", index, "title"], pair[0]); apply(["benefits", "items", index, "desc"], pair[1])
    } else if (key === "BOTAO_BENEFICIOS") apply(["benefits", "ctaText"], rawValue)
    else if (key === "URGENCIA_TITULO") apply(["urgency", "title"], rawValue)
    else if (key === "URGENCIA_CORPO") apply(["urgency", "body"], rawValue)
    else if (key === "BOTAO_URGENCIA") apply(["urgency", "ctaText"], rawValue)
    else if (key === "ENTREGAVEIS_TITULO") apply(["deliverables", "title"], rawValue)
    else if (key === "ENTREGAVEIS_BULLET" && index >= 0 && index < offer.deliverables.bullets.length) apply(["deliverables", "bullets", index], rawValue)
    else if (key === "BONUS_TITULO") { apply(["bonusSection", "titleLead"], pair[0]); apply(["bonusSection", "titleHighlight"], pair[1]) }
    else if (key === "BONUS_SUBTITULO") apply(["bonusSection", "subtitle"], rawValue)
    else if (key === "BONUS" && index >= 0 && index < offer.bonuses.length) {
      apply(["bonuses", index, "title"], pair[0]); apply(["bonuses", index, "desc"], pair[1])
    } else if (key === "PLANOS_TITULO") { apply(["pricing", "titleLead"], pair[0]); apply(["pricing", "titleHighlight"], pair[1]) }
    else if (key === "PLANOS_NOTA") apply(["pricing", "note"], rawValue)
    else if (key === "PLANO_TITULO" && index >= 0 && index < offer.pricing.plans.length) apply(["pricing", "plans", index, "title"], rawValue)
    else if (key === "PLANO" && index >= 0 && index < offer.pricing.plans.length && itemIndex >= 0 && itemIndex < 8) {
      const planItems = offer.pricing.plans[index].items
      if (itemIndex < planItems.length) apply(["pricing", "plans", index, "items", itemIndex], rawValue)
    } else if (key === "GARANTIA_TITULO") apply(["guarantee", "title"], rawValue)
    else if (key === "GARANTIA_CORPO") apply(["guarantee", "body"], rawValue)
    else if (key === "ACESSO_TITULO") apply(["access", "title"], rawValue)
    else if (key === "ACESSO_PASSO" && index >= 0 && index < 4) {
      apply(["access", "steps", index, "title"], pair[0]); apply(["access", "steps", index, "desc"], pair[1])
    } else if (key === "BOTAO_ACESSO") apply(["access", "ctaText"], rawValue)
    else if (key === "FAQ_TITULO") apply(["faq", "title"], rawValue)
    else if (key === "FAQ" && index >= 0 && index < 5) {
      apply(["faq", "items", index, "q"], pair[0]); apply(["faq", "items", index, "a"], pair[1])
    } else if (key === "FOOTER_TITULO") apply(["footer", "updateTitle"], rawValue)
    else if (key === "FOOTER_CORPO") apply(["footer", "updateBody"], rawValue)
  }
  return { offer, count }
}

export function OfferEditor({ slug, label, initialOffer, initialCashflow, initialFavicon, initialStatus = "active" }: {
  slug: string; label: string; initialOffer: OfferConfig; initialCashflow: CashflowConfig | null; initialFavicon: string | null; initialStatus?: OfferStatus
}) {
  const router = useRouter()
  const [draft, setDraft] = useState(initialOffer)
  const [savedOffer, setSavedOffer] = useState(initialOffer)
  const [cashflow, setCashflow] = useState<CashflowConfig>(initialCashflow ?? { workspaceId: "", offerId: "" })
  const [cashflowScript, setCashflowScript] = useState(() => cashflowScriptFor(initialCashflow))
  const [cashflowError, setCashflowError] = useState("")
  const [favicon, setFavicon] = useState(initialFavicon ?? `/images/${slug}/favicon.webp`)
  const [slugInput, setSlugInput] = useState(slug)
  const [status, setStatus] = useState<OfferStatus>(initialStatus)
  const [tab, setTab] = useState<TabId>("cores")
  const [offerSubtab, setOfferSubtab] = useState<OfferSubtab>("checkout")
  const [copySubtab, setCopySubtab] = useState<CopySubtab>("edicao")
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile")
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([])
  const [copySource, setCopySource] = useState("")
  const [copyMessage, setCopyMessage] = useState("")
  const [copyBrief, setCopyBrief] = useState("")
  const [prompt, setPrompt] = useState("")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const issues = useMemo(() => getOfferCopyIssues(draft), [draft])
  const checkoutReady = draft.pricing.plans.length >= 1 && draft.pricing.plans.length <= 2 && draft.pricing.plans.every((plan) => /^https:\/\/(pay\.hotmart\.com|pay\.cakto\.com\.br)\//.test(plan.ctaHref ?? ""))
  const savedCheckoutReady = savedOffer.pricing.plans.length >= 1 && savedOffer.pricing.plans.length <= 2 && savedOffer.pricing.plans.every((plan) => /^https:\/\/(pay\.hotmart\.com|pay\.cakto\.com\.br)\//.test(plan.ctaHref ?? ""))

  const sendPreview = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: "ofertas:preview", offer: draft, favicon }, window.location.origin)
  }, [draft, favicon])

  useEffect(() => {
    const handleReady = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === "ofertas:preview-ready") sendPreview()
    }
    window.addEventListener("message", handleReady)
    const timeout = window.setTimeout(sendPreview, 250)
    return () => { window.removeEventListener("message", handleReady); window.clearTimeout(timeout) }
  }, [sendPreview])

  function field(path: (string | number)[], title: string, max?: number, multiline = false) {
    const value = readPath(draft, path)
    const text = typeof value === "string" ? value : value === undefined ? "" : String(value)
    const count = text.replace(/\n/g, "").length
    const fieldId = `${slug}-${path.join("-")}`
    return (
      <label className={styles.field} key={fieldId} htmlFor={fieldId}>
        <span className={styles.fieldHead}><span>{title}</span>{max !== undefined && <span className={count > max ? styles.overLimit : ""}>{count}/{max}</span>}</span>
        {multiline
          ? <textarea id={fieldId} value={text} rows={3} onChange={(event) => setDraft((current) => writePath(current, path, event.target.value))} />
          : <input id={fieldId} type={path.join(".") === "counter.target" ? "number" : "text"} value={text} onChange={(event) => setDraft((current) => writePath(current, path, path.join(".") === "counter.target" ? Number(event.target.value) : event.target.value))} />}
      </label>
    )
  }

  function setColor(palette: OfferPalette) {
    setDraft((current) => ({ ...current, palette }))
  }

  async function generatePalettes() {
    setGenerating(true); setMessage(""); setIsError(false)
    try {
      const response = await fetch(`/api/painel/offers/${slug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "generate-palettes" }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível gerar paletas.")
      setDraft((current) => ({ ...current, paletteCandidates: result.paletteCandidates }))
      setMessage("Dez opções de cor foram geradas e passaram pela validação de contraste.")
    } catch (error) {
      setIsError(true); setMessage(error instanceof Error ? error.message : "Falha ao gerar paletas.")
    } finally { setGenerating(false) }
  }

  async function save() {
    const checked = getOfferCopyIssues(draft)
    if (checked.length) { setTab("copy"); setIsError(true); setMessage(`Ajuste os campos fora do limite antes de salvar (${checked.length}).`); return }
    if (cashflowError) { setTab("oferta"); setOfferSubtab("cashflow"); setIsError(true); setMessage(cashflowError); return }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugInput) || slugInput.length > 63) {
      setTab("oferta"); setIsError(true); setMessage("Use uma slug com letras minúsculas, números e hífens, sem hífen no início ou no fim."); return
    }
    setSaving(true); setMessage(""); setIsError(false)
    try {
      const response = await fetch(`/api/painel/offers/${slug}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer: draft,
          cashflow: cashflow.workspaceId && cashflow.offerId ? cashflow : null,
          favicon,
          ...(slugInput !== slug ? { slug: slugInput } : {}),
          ...(status !== initialStatus ? { status } : {}),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível salvar.")
      setDraft(result.offer ?? draft)
      setSavedOffer(result.offer ?? draft)
      setStatus(result.status ?? result.entry?.status ?? status)
      const savedSlug = result.slug ?? result.entry?.slug ?? slugInput
      setMessage("Alterações salvas.")
      if (savedSlug !== slug) {
        router.replace(`/painel/${encodeURIComponent(savedSlug)}`)
        router.refresh()
      }
    } catch (error) {
      setIsError(true); setMessage(error instanceof Error ? error.message : "Falha ao salvar.")
    } finally { setSaving(false) }
  }

  async function toggleStatus() {
    const nextStatus: OfferStatus = status === "active" ? "inactive" : "active"
    if (nextStatus === "active" && !savedCheckoutReady) {
      setIsError(true)
      setMessage(checkoutReady ? "Salve um ou dois links de checkout válidos antes de ativar." : "Para ativar, configure um ou dois checkouts válidos em cada plano e salve as alterações.")
      setTab("oferta"); setOfferSubtab("checkout")
      return
    }
    setSaving(true); setIsError(false); setMessage("")
    try {
      const response = await fetch(`/api/painel/offers/${slug}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível alterar o status.")
      setStatus(result.status ?? result.entry?.status ?? nextStatus)
      setMessage(nextStatus === "active" ? "Oferta ativada." : "Oferta desativada; a página pública responderá 404.")
    } catch (error) {
      setIsError(true); setMessage(error instanceof Error ? error.message : "Falha ao alterar o status.")
    } finally { setSaving(false) }
  }

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return
    setUploading(true); setMessage(""); setIsError(false)
    const results: UploadResult[] = []
    for (const file of Array.from(files)) {
      const name = canonicalImageName(file.name)
      if (!name) { results.push({ file: file.name, status: "error", message: "Nome fora do padrão; não foi enviado." }); continue }
      if (file.size > 20 * 1024 * 1024) { results.push({ file: file.name, canonical: name, status: "error", message: "Arquivo acima de 20 MB; não foi enviado." }); continue }
      try {
        const bitmap = await createImageBitmap(file)
        const limits = name === "plano-completo.webp" || name === "plano-basico.webp" || name === "beneficio.webp"
          ? [1080, 1080] : name.startsWith("depoimento-") ? [360, 640] : name === "favicon.webp" ? [256, 256]
          : draft.orientation === "portrait" ? [1200, 1600] : [1600, 1200]
        const scale = Math.min(1, limits[0] / bitmap.width, limits[1] / bitmap.height)
        const canvas = document.createElement("canvas")
        canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale))
        const context = canvas.getContext("2d")
        if (!context) throw new Error("Não foi possível converter a imagem.")
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close()
        const webp = await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Falha ao converter para WebP.")), "image/webp", 0.84))
        const form = new FormData()
        form.set("name", name); form.set("file", new File([webp], name, { type: "image/webp" }))
        const response = await fetch(`/api/painel/offers/${slug}/assets`, { method: "POST", body: form })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error ?? "Falha no upload.")
        if (name === "favicon.webp") setFavicon(result.url)
        else setDraft((current) => replaceAssetReferences(current, slug, name, result.url) as OfferConfig)
        results.push({ file: file.name, canonical: name, status: "success", message: "Nome reconhecido e imagem enviada como WebP." })
      } catch (error) {
        results.push({ file: file.name, canonical: name, status: "error", message: error instanceof Error ? error.message : "Erro no envio." })
      }
    }
    setUploading(false)
    setUploadResults(results)
    const errors = results.filter((item) => item.status === "error")
    setIsError(errors.length > 0)
    setMessage(`${results.length - errors.length} de ${results.length} imagem(ns) enviadas.${errors.length ? ` ${errors.length} precisam de ajuste.` : ""}`)
  }

  function copyTemplate() {
    const format = [
      "PILL: ...", "HEADLINE: ...", "SUBLINE: ...", "APOIO: ...",
      ...draft.hero.bullets.map((_, index) => `BULLET ${index + 1}: ...`),
      "BOTAO: ...", "MARQUEE: ...", "PROVA_SOCIAL_TITULO: ...",
      "CONTADOR_PREFIXO: ...", "CONTADOR_LABEL: ...", "KIT_TITULO: ...",
      "BENEFICIOS_TITULO: ...",
      ...draft.benefits.items.map((_, index) => `BENEFICIO ${index + 1} (TITULO | DESCRICAO): ... | ...`),
      "BOTAO_BENEFICIOS: ...", "URGENCIA_TITULO: ...", "URGENCIA_CORPO: ...", "BOTAO_URGENCIA: ...",
      "ENTREGAVEIS_TITULO: ...",
      ...draft.deliverables.bullets.map((_, index) => `ENTREGAVEIS_BULLET ${index + 1}: ...`),
      "BONUS_TITULO: ... | ...", "BONUS_SUBTITULO: ...",
      ...draft.bonuses.map((_, index) => `BONUS ${index + 1} (TITULO | DESCRICAO): ... | ...`),
      "PLANOS_TITULO: ... | ...",
      ...draft.pricing.plans.flatMap((plan, planIndex) => [
        `PLANO_TITULO ${planIndex + 1}: ...`,
        ...plan.items.map((_, itemIndex) => `PLANO ${planIndex + 1} ITEM ${itemIndex + 1}: ...`),
      ]),
      "PLANOS_NOTA: ...", "GARANTIA_TITULO: ...", "GARANTIA_CORPO: ...",
      "ACESSO_TITULO: ...",
      ...draft.access.steps.map((_, index) => `ACESSO_PASSO ${index + 1} (TITULO | DESCRICAO): ... | ...`),
      ...(draft.access.ctaText ? ["BOTAO_ACESSO: ..."] : []),
      "FAQ_TITULO: ...",
      ...draft.faq.items.map((_, index) => `FAQ ${index + 1} (PERGUNTA | RESPOSTA): ... | ...`),
      "FOOTER_TITULO: ...", "FOOTER_CORPO: ...",
    ];
    return format.join("\n")
  }

  async function copyEmptyStructure() {
    const template = copyTemplate()
    const copied = await copyToClipboard(template)
    setCopyMessage(copied ? "Estrutura vazia copiada." : "Não foi possível copiar automaticamente. Selecione e copie o conteúdo abaixo.")
    setPrompt(template)
  }

  async function makePrompt() {
    const format = copyTemplate()
    const text = `Você é redator de landing pages diretas em português brasileiro. Escreva copy clara, específica e natural usando somente os fatos fornecidos. Não invente resultados, depoimentos, garantias, escassez nem números. Preserve o tom humano e objetivo.

ELEMENTOS DA OFERTA
${copyBrief}

LIMITES OBRIGATÓRIOS: pill 30; headline 70 em até 2 linhas; subline 70; apoio 160; exatamente 4 bullets do hero com 34 cada; todos os botões com até 34 caracteres em uma linha; marquee 70; título social 48; prefixo do contador 8 e rótulo 44; título kit 48; 4 benefícios com título 32 e descrição 100; urgência título 60 e corpo 140; 6 a 10 entregáveis com 60 cada; bônus com título combinado 48, subtítulo 140 e até 6 descrições de 120; título de planos 48, título de plano 34, 6 itens no Básico e 8 no Completo com 60 cada; garantia título 50 e corpo 200; acesso com 4 passos, título 30 e descrição 90; FAQ com exatamente 5 pares, pergunta 70 e resposta 200; rodapé título 50 e corpo 160. Não use hífens ou travessões na copy, substitua por espaços quando necessário.

Use somente as linhas aplicáveis ao produto. Responda sem introdução, uma linha por campo, exatamente neste formato. Use “ | ” nos campos com pares:
${format}`;
    setPrompt(text);
    const copied = await copyToClipboard(text)
    setCopyMessage(copied ? "Prompt gerado e copiado." : "Prompt gerado; não foi possível copiar automaticamente. Selecione e copie o conteúdo abaixo.")
  }

  function pasteCopy() {
    const result = applyCopyBlock(copySource, draft)
    setDraft(result.offer)
    const errors = getOfferCopyIssues(result.offer)
    setCopyMessage(`${result.count} campos atualizados.${errors.length ? ` Revise ${errors.length} limites sinalizados abaixo antes de salvar.` : " Copy dentro dos limites atuais."}`)
  }

  function jumpToCopySection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function changeCashflowScript(value: string) {
    setCashflowScript(value)
    const parsed = parseCashflowScript(value)
    setCashflowError(parsed.error ?? "")
    setCashflow(parsed.config ?? { workspaceId: "", offerId: "" })
  }

  const candidates = draft.paletteCandidates ?? [draft.palette]
  const previewWidth = device === "mobile" ? "390px" : "100%"

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerIdentity}><Link href="/painel" className={styles.back}>← Ofertas</Link><p className={styles.eyebrow}>EDIÇÃO DE OFERTA</p><h1>{label}</h1><code>/{slugInput}</code></div>
        <div className={styles.headerActions}>
          <div className={styles.statusControl}>
            <span className={`${styles.statusBadge} ${status === "active" ? styles.statusActive : status === "draft" ? styles.statusDraft : styles.statusInactive}`}>{status === "active" ? "Ativa" : status === "draft" ? "Rascunho" : "Desativada"}</span>
            <button type="button" className={styles.statusSwitch} role="switch" aria-checked={status === "active"} onClick={toggleStatus} disabled={saving} aria-label={status === "active" ? "Desativar oferta" : "Ativar oferta"}><span /></button>
          </div>
          <PanelLogoutButton />
          <button type="button" className={styles.save} onClick={save} disabled={saving || issues.length > 0}>{saving ? "Salvando…" : "Salvar alterações"}</button>
        </div>
      </header>

      {message && <p className={`${styles.feedback}${isError ? ` ${styles.feedbackError}` : ""}`} role="status">{message}</p>}

      <div className={styles.workspace}>
        <section className={styles.editorPanel}>
          <div className={styles.tabs} role="tablist" aria-label="Editar oferta">
            {TABS.map((item) => <button key={item.id} id={`tab-${item.id}`} type="button" role="tab" aria-selected={tab === item.id} aria-controls={`panel-${item.id}`} onClick={() => setTab(item.id)}>{item.label}</button>)}
          </div>

          <div className={styles.tabPanel} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} data-lenis-prevent>
            {tab === "cores" && <div className={styles.content}>
              <div className={styles.sectionHeading}><h2>Paletas da oferta</h2><button type="button" onClick={generatePalettes} disabled={generating}>{generating ? "Gerando…" : "Gerar novas paletas"}</button></div>
              <p className={styles.help}>Escolha uma das dez paletas. Botões e elementos fixos mantêm as cores de ação da marca; as opções passam por checagem de contraste.</p>
              <div className={styles.paletteGrid}>{candidates.map((palette, index) => <button key={`${palette.brand}-${index}`} type="button" className={`${styles.paletteCard}${draft.palette.brand === palette.brand ? ` ${styles.paletteActive}` : ""}`} aria-pressed={draft.palette.brand === palette.brand} onClick={() => setColor(palette)}>
                <span className={styles.swatches}><i style={{ background: palette.brandDeep }} /><i style={{ background: palette.brand }} /><i style={{ background: palette.accent }} /><i style={{ background: palette.bg }} /></span>
                <span>Opção {index + 1}{draft.palette.brand === palette.brand ? " · ativa" : ""}</span>
              </button>)}</div>
              <div className={styles.palettePreview} style={{ background: draft.palette.bg }}><strong style={{ color: draft.palette.brandInk }}>Prévia da paleta</strong><span style={{ color: draft.palette.brand }}>Texto e destaque</span><button type="button" style={{ background: CURRENT_ACTION_COLORS.ctaDeep }}>Ação fixa</button></div>
              {draft.paletteCandidates?.length !== 10 && <p className={styles.warning}>As dez opções ainda não estão carregadas. Gere novas paletas para completar a lista.</p>}
            </div>}

            {tab === "imagens" && <div className={styles.content}>
              <h2>Imagens e orientação</h2>
              <label className={styles.field}>Orientação do entregável<select value={draft.orientation} onChange={(event) => setDraft((current) => ({ ...current, orientation: event.target.value as OfferConfig["orientation"] }))}><option value="portrait">Retrato</option><option value="landscape">Paisagem</option></select></label>
              <p className={styles.help}>Selecione várias imagens com nomes descritivos como plano-completo, demonstrativo-01, depoimento-01 ou bonus-01-frente. PNG/JPG são convertidos para WebP; arquivos fora do padrão são ignorados.</p>
              <label className={styles.uploadBox}><span>{uploading ? "Convertendo e enviando…" : "Escolher imagens"}</span><input type="file" accept="image/png,image/jpeg,image/webp" multiple disabled={uploading} onChange={(event) => { void uploadFiles(event.currentTarget.files); event.currentTarget.value = "" }} /></label>
              {uploadResults.length > 0 && <div className={styles.uploadResults} aria-label="Resultado dos arquivos selecionados">
                <strong>Resultado dos arquivos</strong>
                <ul>{uploadResults.map((item, index) => <li key={`${item.file}-${index}`} className={item.status === "success" ? styles.uploadSuccess : styles.uploadError}>
                  <span><b>{item.file}</b>{item.canonical && item.canonical !== item.file && <small> → {item.canonical}</small>}</span><span>{item.message}</span>
                </li>)}</ul>
              </div>}
              <div className={styles.assetList}><strong>Referências atuais</strong><p>Hero: {draft.hero.image.split("/").pop()}</p><p>Plano: {draft.pricing.plans.map((plan) => plan.image.split("/").pop()).join(", ")}</p><p>Kit: {draft.kitCards.images.length} imagens</p><p>Depoimentos: {draft.socialProof.testimonials.length}</p><p>Bônus: {draft.bonuses.length}</p><p>Favicon: {favicon.split("/").pop()}</p></div>
            </div>}

            {tab === "oferta" && <div className={styles.content}>
              <h2>Oferta</h2><p className={styles.help}>Configure um ou dois checkouts. O tracking da Cashflow é opcional.</p>
              <div className={styles.subtabs} role="tablist" aria-label="Configurações da oferta">
                <button type="button" role="tab" aria-selected={offerSubtab === "checkout"} onClick={() => setOfferSubtab("checkout")}>Checkouts</button>
                <button type="button" role="tab" aria-selected={offerSubtab === "cashflow"} onClick={() => setOfferSubtab("cashflow")}>Cashflow</button>
              </div>
              {offerSubtab === "checkout" && <>
                <div className={styles.group}>
                  <h3>Endereço da página</h3>
                  <label className={styles.field}>Slug da oferta<input value={slugInput} maxLength={63} onChange={(event) => setSlugInput(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="nome-da-oferta" /></label>
                  <p className={styles.help}>A URL nova será /{slugInput || "slug"}. A slug antiga responderá 404 depois que salvar.</p>
                </div>
                <div className={styles.sectionHeading}>
                  <h3>Links de checkout</h3>
                  <label className={styles.planCount}>Número de checkouts<select value={draft.pricing.plans.length} onChange={(event) => {
                    const count = Number(event.target.value)
                    setDraft((current) => {
                      const plans = current.pricing.plans
                      if (count === 1) return writePath(current, ["pricing", "plans"], plans.slice(0, 1))
                      if (plans.length >= 2) return current
                      const first = plans[0]
                      const second = { ...structuredClone(first), id: `${first.id}-2`, label: undefined, title: "Plano 2", ctaHref: undefined, price: "", installments: "", featured: false }
                      return writePath(current, ["pricing", "plans"], [...plans, second])
                    })
                  }}><option value={1}>Único</option><option value={2}>Duplo</option></select></label>
                </div>
                <p className={styles.checkoutReadiness} data-ready={savedCheckoutReady}>{!checkoutReady ? "Preencha um link válido em cada plano para ativar" : savedCheckoutReady ? "Checkout salvo e pronto para ativação" : "Salve os links de checkout antes de ativar"}</p>
                {draft.pricing.plans.map((plan, index) => <fieldset className={styles.group} key={plan.id}><legend>Checkout {index + 1}: {plan.title || `Plano ${index + 1}`}</legend>
                  <label className={styles.field}>Link de checkout<input type="url" value={plan.ctaHref ?? ""} onChange={(event) => setDraft((current) => writePath(current, ["pricing", "plans", index, "ctaHref"], event.target.value || undefined))} placeholder="https://pay.hotmart.com/..." /></label>
                  <label className={styles.field}>Preço de ancoragem<input value={plan.oldPrice} onChange={(event) => setDraft((current) => writePath(current, ["pricing", "plans", index, "oldPrice"], event.target.value))} placeholder="de R$ 39,90" aria-label={`Preço de ancoragem do plano ${index + 1}`} /></label>
                  <p className={styles.discountPreview} aria-live="polite">{calculateDiscountPercentage(plan.oldPrice, plan.price)}% OFF calculado automaticamente, com arredondamento</p>
                  <label className={styles.field}>Preço<input value={plan.price} onChange={(event) => setDraft((current) => writePath(current, ["pricing", "plans", index, "price"], event.target.value))} /></label>
                  <label className={styles.field}>Parcelamento<input value={plan.installments} onChange={(event) => setDraft((current) => writePath(current, ["pricing", "plans", index, "installments"], event.target.value))} /></label>
                </fieldset>)}
              </>}
              {offerSubtab === "cashflow" && <div className={styles.group}>
                <h3>Script da Cashflow</h3>
                <p className={styles.help}>Cole a tag script completa fornecida pela Cashflow. O painel valida o endereço e salva apenas os identificadores, sem executar código colado.</p>
                <label className={styles.field}>Script<textarea rows={5} value={cashflowScript} onChange={(event) => changeCashflowScript(event.target.value)} placeholder={'<script src="https://cashflow.mentoriaprocesso.com/t/p.js?w=...&o=..." data-offer="..." async></script>'} aria-invalid={Boolean(cashflowError)} /></label>
                {cashflowError ? <p className={styles.cashflowError} role="alert">{cashflowError}</p> : <p className={styles.help}>{cashflow.workspaceId && cashflow.offerId ? "Script reconhecido. O tracking será atualizado ao salvar." : "Sem script, o tracking permanece desligado."}</p>}
              </div>}
            </div>}

            {tab === "copy" && <div className={styles.content}>
              <h2>Copy da página</h2><p className={styles.help}>Edite os textos, prepare um prompt ou cole um bloco de copy. O preview acompanha cada alteração.</p>
              <div className={styles.subtabs} role="tablist" aria-label="Ferramentas de copy">
                <button type="button" role="tab" aria-selected={copySubtab === "edicao"} onClick={() => setCopySubtab("edicao")}>Editar copy</button>
                <button type="button" role="tab" aria-selected={copySubtab === "prompt"} onClick={() => setCopySubtab("prompt")}>Prompt</button>
                <button type="button" role="tab" aria-selected={copySubtab === "colar"} onClick={() => setCopySubtab("colar")}>Colar copy</button>
              </div>
              {copySubtab === "edicao" && <>
                <p className={styles.help}>Atalhos para navegar pelas partes da página:</p>
                <nav className={styles.copyNav} aria-label="Ir para seção da copy">
                  {[ ["copy-hero", "Hero"], ["copy-social", "Prova social"], ["copy-benefits", "Benefícios"], ["copy-urgency", "Urgência"], ["copy-bonus", "Bônus"], ["copy-pricing", "Planos"], ["copy-guarantee", "Garantia e acesso"], ["copy-faq", "FAQ e rodapé"] ].map(([id, title]) => <button key={id} type="button" onClick={() => jumpToCopySection(id)}>{title}</button>)}
                </nav>
                <div className={styles.group} id="copy-hero"><h3>Hero</h3>
                  {field(["hero", "pill"], "Pill", 30)}{field(["hero", "headline"], "Headline", 70, true)}{field(["hero", "subline"], "Subline", 70)}{field(["hero", "support"], "Texto de apoio", 160, true)}
                  {draft.hero.bullets.map((_, index) => field(["hero", "bullets", index], `Bullet ${index + 1}`, 34))}{field(["hero", "ctaText"], "Botão do hero", 34)}{field(["hero", "marqueeText"], "Marquee", 70)}
                </div>
                <div className={styles.group} id="copy-social"><h3>Prova social, contador e kit</h3>{field(["socialProof", "title"], "Título de prova social", 48)}{field(["counter", "prefix"], "Prefixo do contador", 8)}{field(["counter", "target"], "Número do contador")}{field(["counter", "label"], "Rótulo do contador", 44)}{field(["kitCards", "heading"], "Título do demonstrativo", 48)}</div>
                <div className={styles.group} id="copy-benefits"><h3>Benefícios</h3>{field(["benefits", "title"], "Título", 48)}{draft.benefits.items.map((item, index) => <div key={index} className={styles.subgroup}><strong>Benefício {index + 1}</strong>{field(["benefits", "items", index, "title"], "Título", 32)}{field(["benefits", "items", index, "desc"], "Descrição", 100, true)}</div>)}{field(["benefits", "ctaText"], "Botão dos benefícios", 34)}</div>
                <div className={styles.group} id="copy-urgency"><h3>Urgência e entregáveis</h3>{field(["urgency", "title"], "Título de urgência", 60)}{field(["urgency", "body"], "Texto de urgência", 140, true)}{field(["urgency", "ctaText"], "Botão de urgência", 34)}{field(["deliverables", "title"], "Título dos entregáveis", 48)}{draft.deliverables.bullets.map((_, index) => field(["deliverables", "bullets", index], `Entregável ${index + 1}`, 60))}</div>
                <div className={styles.group} id="copy-bonus"><h3>Bônus</h3>{field(["bonusSection", "titleLead"], "Título: início", 48)}{field(["bonusSection", "titleHighlight"], "Título: destaque", 48)}{field(["bonusSection", "subtitle"], "Subtítulo", 140, true)}{draft.bonuses.map((_, index) => <div key={index} className={styles.subgroup}><strong>Bônus {index + 1}</strong>{field(["bonuses", index, "title"], "Título")}{field(["bonuses", index, "desc"], "Descrição", 120, true)}</div>)}</div>
                <div className={styles.group} id="copy-pricing"><h3>Planos</h3>{field(["pricing", "titleLead"], "Título: início", 48)}{field(["pricing", "titleHighlight"], "Título: destaque", 48)}{draft.pricing.plans.map((plan, index) => <div key={plan.id} className={styles.subgroup}><strong>{plan.title}</strong>{field(["pricing", "plans", index, "title"], "Título do plano", 34)}{plan.items.map((_, itemIndex) => field(["pricing", "plans", index, "items", itemIndex], `Item ${itemIndex + 1}`, 60))}</div>)}</div>
                <div className={styles.group} id="copy-guarantee"><h3>Garantia e acesso</h3>{field(["guarantee", "title"], "Título da garantia", 50)}{field(["guarantee", "body"], "Texto da garantia", 200, true)}{field(["access", "title"], "Título do acesso", 48)}{draft.access.steps.map((_, index) => <div key={index} className={styles.subgroup}><strong>Passo {index + 1}</strong>{field(["access", "steps", index, "title"], "Título", 30)}{field(["access", "steps", index, "desc"], "Descrição", 90, true)}</div>)}{field(["access", "ctaText"], "Botão do acesso", 34)}</div>
                <div className={styles.group} id="copy-faq"><h3>FAQ e rodapé</h3>{field(["faq", "title"], "Título do FAQ", 48)}{draft.faq.items.map((_, index) => <div key={index} className={styles.subgroup}><strong>Pergunta {index + 1}</strong>{field(["faq", "items", index, "q"], "Pergunta", 70)}{field(["faq", "items", index, "a"], "Resposta", 200, true)}</div>)}{field(["footer", "updateTitle"], "Título de atualização", 50)}{field(["footer", "updateBody"], "Aviso de atualização", 160, true)}</div>
                {issues.length > 0 && <ul className={styles.issueList}>{issues.slice(0, 24).map((issue) => <li key={issue}>{issue}</li>)}</ul>}
              </>}
              {copySubtab === "prompt" && <div className={styles.group}>
                <h3>Montar prompt para gerar copy</h3>
                <label className={styles.field}>Informações da oferta<textarea rows={5} value={copyBrief} onChange={(event) => setCopyBrief(event.target.value)} placeholder="Nicho, persona, dor, desejo, promessa, produto, bônus e preços…" /></label>
                <p className={styles.help}>A estrutura vazia contém os campos esperados. Ao gerar, o prompt inclui suas informações e é copiado automaticamente.</p>
                <div className={styles.buttonRow}><button type="button" className={styles.secondary} onClick={copyEmptyStructure}>Copiar estrutura vazia</button><button type="button" className={styles.primaryAction} onClick={() => { void makePrompt() }}>Gerar e copiar prompt</button></div>
                {copyMessage && <p className={styles.copyFeedback} role="status">{copyMessage}</p>}
                {prompt && <label className={styles.field}>Conteúdo copiado<textarea className={styles.promptOutput} readOnly rows={12} value={prompt} aria-label="Prompt ou estrutura vazia" onFocus={(event) => event.currentTarget.select()} /></label>}
              </div>}
              {copySubtab === "colar" && <div className={styles.group}>
                <h3>Colar copy preenchida</h3>
                <p className={styles.help}>Cole o texto no formato abaixo. Campos reconhecidos serão aplicados ao formulário e ao preview.</p>
                <div className={styles.buttonRow}><button type="button" className={styles.secondary} onClick={copyEmptyStructure}>Copiar estrutura vazia</button><button type="button" className={styles.primaryAction} onClick={pasteCopy}>Aplicar copy</button></div>
                <label className={styles.field}>Copy no formato do prompt<textarea rows={15} value={copySource} onChange={(event) => setCopySource(event.target.value)} placeholder="PILL: …&#10;HEADLINE: …&#10;FAQ 1 (PERGUNTA | RESPOSTA): … | …" /></label>
                {copyMessage && <p className={styles.copyFeedback} role="status">{copyMessage}</p>}
                {issues.length > 0 && <ul className={styles.issueList}>{issues.slice(0, 24).map((issue) => <li key={issue}>{issue}</li>)}</ul>}
              </div>}
            </div>}

            {tab === "secoes" && <div className={styles.content}><h2>Seções da landing page</h2><p className={styles.help}>Os dois trilhos do kit começam ligados. As demais seções começam ligadas.</p><div className={styles.sectionList}>{SECTION_IDS.map((id) => <label key={id} className={styles.sectionToggle}><span>{SECTION_LABELS[id]}</span><input type="checkbox" checked={draft.sections?.[id] ?? true} onChange={(event) => setDraft((current) => ({ ...current, sections: { ...current.sections, [id]: event.target.checked } }))} /></label>)}</div></div>}
          </div>
        </section>

        <aside className={styles.previewPanel} aria-label="Prévia da oferta">
          <div className={styles.previewHeader}><div><h2>Prévia ao vivo</h2><p>As alterações aparecem aqui enquanto você edita.</p></div><div className={styles.deviceButtons} role="group" aria-label="Largura da prévia"><button type="button" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")}>Celular</button><button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>Desktop</button></div></div>
          <div className={styles.frameWrap}><iframe ref={iframeRef} key={slug} title={`Prévia de ${label}`} src={`/${slug}/preview`} onLoad={sendPreview} style={{ width: previewWidth }} /></div>
        </aside>
      </div>
    </main>
  )
}
