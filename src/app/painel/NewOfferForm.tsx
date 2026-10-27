"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { parseOfferCreateInput, suggestOfferSlug } from "@/lib/panel-offer-create"
import styles from "./panel.module.css"

type CreateResponse = { ok?: boolean; entry?: { slug: string }; error?: string }

export function NewOfferForm() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState("")
  const [slug, setSlug] = useState("")
  const [slugEdited, setSlugEdited] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function updateLabel(value: string) {
    setLabel(value)
    if (!slugEdited) setSlug(suggestOfferSlug(value))
    setError("")
  }

  function updateSlug(value: string) {
    setSlugEdited(true)
    setSlug(value)
    setError("")
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = parseOfferCreateInput({ label, slug })
    if ("error" in input) {
      setError(input.error)
      return
    }

    setSaving(true)
    setError("")
    try {
      const response = await fetch("/api/painel/offers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      const result = await response.json() as CreateResponse
      if (!response.ok || !result.entry?.slug) {
        setError(result.error ?? "Não foi possível criar a oferta agora.")
        return
      }
      router.push(`/painel/${encodeURIComponent(result.entry.slug)}`)
    } catch {
      setError("Não foi possível conectar ao painel. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.createOffer}>
      <button type="button" className={styles.createOfferTrigger} aria-expanded={open} aria-controls="new-offer-form" onClick={() => { setOpen((value) => !value); setError("") }}>
        Nova oferta
      </button>
      {open && <form id="new-offer-form" className={styles.createOfferForm} onSubmit={(event) => { void submit(event) }}>
        <h2>Criar oferta</h2>
        <p>Modelo inicial: <strong>Psicopedagogia</strong>. Você poderá personalizar o rascunho no editor.</p>
        <label htmlFor="new-offer-label">Nome de exibição</label>
        <input id="new-offer-label" autoFocus maxLength={80} value={label} onChange={(event) => updateLabel(event.currentTarget.value)} placeholder="Ex.: Mapa de estudos" required />
        <label htmlFor="new-offer-slug">Slug da página</label>
        <div className={styles.slugInput}><span>/</span><input id="new-offer-slug" value={slug} onChange={(event) => updateSlug(event.currentTarget.value)} placeholder="mapa-de-estudos" maxLength={63} required /></div>
        <small>Endereço sugerido a partir do nome. Você pode editá-lo.</small>
        {error && <p className={styles.createOfferError} role="alert">{error}</p>}
        <div className={styles.createOfferActions}>
          <button type="button" onClick={() => setOpen(false)} disabled={saving}>Cancelar</button>
          <button type="submit" disabled={saving || !label.trim() || !slug}>{saving ? "Criando…" : "Criar rascunho"}</button>
        </div>
      </form>}
    </div>
  )
}
