"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Save, X } from "lucide-react"
import type { OfferConfig, OfferPalette } from "@/types/offer"
import { paletteCssVariables } from "@/config/offers/palettes"
import styles from "./palette-editor.module.css"

export function PaletteEditor({ slug, initialOffer }: { slug: string; initialOffer: OfferConfig }) {
  const options = initialOffer.paletteCandidates ?? [initialOffer.palette]
  const [selected, setSelected] = useState<OfferPalette>(initialOffer.palette)
  const [open, setOpen] = useState(true)
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [message, setMessage] = useState("")

  function previewPalette(palette: OfferPalette) {
    const root = document.getElementById("offer-root")
    if (!root) return
    const variables = paletteCssVariables(palette) as Record<string, string>
    Object.entries(variables).forEach(([property, value]) => root.style.setProperty(property, value))
    setSelected(palette)
    setState("idle")
    setMessage("")
  }

  async function savePalette() {
    setState("saving"); setMessage("")
    try {
      const response = await fetch(`/api/painel/offers/${slug}/palette`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ palette: selected }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível salvar a paleta.")
      setState("saved"); setMessage("Paleta salva e publicada.")
      window.setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      setState("error"); setMessage(error instanceof Error ? error.message : "Não foi possível salvar a paleta.")
    }
  }

  if (!open) return <button className={styles.reopen} onClick={() => setOpen(true)}>Editar paleta</button>

  return (
    <aside className={styles.editor} aria-label="Editor de paletas">
      <div className={styles.heading}><div><strong>Paletas da oferta</strong><code>/{slug}</code></div><button className={styles.iconButton} onClick={() => setOpen(false)} aria-label="Fechar editor"><X size={18} /></button></div>
      <div className={styles.options}>{options.map((palette, index) => <button key={`${palette.brand}-${index}`} onClick={() => previewPalette(palette)} aria-pressed={selected.brand === palette.brand}>
        <span className={styles.swatches} aria-hidden="true"><i style={{ background: palette.brandDeep }} /><i style={{ background: palette.brand }} /><i style={{ background: palette.accent }} /><i style={{ background: palette.bg }} /></span>
        <span>Opção {index + 1}</span>{selected.brand === palette.brand && <Check size={17} aria-hidden="true" />}
      </button>)}</div>
      <button className={styles.save} onClick={savePalette} disabled={state === "saving"}><Save size={16} aria-hidden="true" />{state === "saving" ? "Salvando…" : "Salvar paleta"}</button>
      {message && <p className={state === "error" ? styles.error : styles.success} role="status">{message}</p>}
      <Link className={styles.back} href="/painel">Voltar ao painel</Link>
    </aside>
  )
}
