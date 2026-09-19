"use client"

import { useState } from "react"
import { Check, LockKeyhole, Save, X } from "lucide-react"
import { PALETTES, paletteCssVariables, type PaletteKey } from "@/config/offers/palettes"
import styles from "./palette-editor.module.css"

export function PaletteEditor({ slug, initialPaletteKey }: { slug: string; initialPaletteKey: PaletteKey | null }) {
  const [selected, setSelected] = useState<PaletteKey | null>(initialPaletteKey)
  const [open, setOpen] = useState(true)
  const [pin, setPin] = useState("")
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [message, setMessage] = useState("")

  function previewPalette(key: PaletteKey) {
    const root = document.getElementById("offer-root")
    if (!root) return
    const variables = paletteCssVariables(PALETTES[key].colors) as Record<string, string>
    Object.entries(variables).forEach(([property, value]) => root.style.setProperty(property, value))
    setSelected(key)
    setState("idle")
    setMessage("")
  }

  async function savePalette() {
    if (!selected) {
      setState("error")
      setMessage("Escolha uma das dez paletas antes de salvar.")
      return
    }
    if (pin !== "1010") {
      setState("error")
      setMessage("Use o PIN de confirmação 1010.")
      return
    }

    setState("saving")
    setMessage("")
    try {
      const response = await fetch(`/api/admin/offers/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, paletteKey: selected }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível salvar a paleta.")
      setState("saved")
      setMessage("Paleta salva e publicada na configuração operacional.")
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Não foi possível salvar a paleta.")
    }
  }

  if (!open) {
    return <button className={styles.reopen} onClick={() => setOpen(true)}>Editar paleta</button>
  }

  return (
    <aside className={styles.editor} aria-label="Editor de paletas">
      <div className={styles.heading}>
        <div>
          <strong>Paleta da oferta</strong>
          <code>/{slug}</code>
        </div>
        <button className={styles.iconButton} onClick={() => setOpen(false)} aria-label="Fechar editor"><X size={18} /></button>
      </div>

      {!initialPaletteKey && <p className={styles.note}>A paleta atual foi preservada. Escolha uma alternativa apenas quando quiser substituí-la.</p>}

      <div className={styles.options}>
        {(Object.entries(PALETTES) as [PaletteKey, (typeof PALETTES)[PaletteKey]][]).map(([key, preset]) => (
          <button key={key} onClick={() => previewPalette(key)} aria-pressed={selected === key}>
            <span className={styles.swatches} aria-hidden="true">
              <i style={{ background: preset.colors.brandDeep }} />
              <i style={{ background: preset.colors.brand }} />
              <i style={{ background: preset.colors.accent }} />
              <i style={{ background: preset.colors.bg }} />
            </span>
            <span>{preset.label}</span>
            {selected === key && <Check size={17} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className={styles.saveArea}>
        <label>
          <LockKeyhole size={16} aria-hidden="true" />
          <span className="sr-only">PIN de confirmação</span>
          <input type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(event) => setPin(event.target.value)} placeholder="PIN 1010" />
        </label>
        <button className={styles.save} onClick={savePalette} disabled={state === "saving"}>
          <Save size={16} aria-hidden="true" />
          {state === "saving" ? "Salvando…" : "Salvar paleta"}
        </button>
      </div>
      {message && <p className={state === "error" ? styles.error : styles.success} role="status">{message}</p>}
      <a className={styles.back} href="/admin/ofertas">Voltar ao catálogo</a>
    </aside>
  )
}
