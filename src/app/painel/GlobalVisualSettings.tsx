"use client"

import Image from "next/image"
import { useState } from "react"
import type { GlobalSiteSettings, GlobalSize } from "@/lib/global-site-settings"
import styles from "./panel.module.css"

const choices: GlobalSize[] = ["P", "M", "G"]

export function GlobalVisualSettings({ initialSettings, previewImage }: { initialSettings: GlobalSiteSettings; previewImage: string }) {
  const [settings, setSettings] = useState(initialSettings)
  const [savedSettings, setSavedSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const fontScale = { P: 0.94, M: 1, G: 1.08 }[settings.typographySize]
  const imageScale = { P: 0.94, M: 1, G: 1.08 }[settings.imageSize]
  const dirty = settings.typographySize !== savedSettings.typographySize || settings.imageSize !== savedSettings.imageSize

  async function save() {
    setSaving(true)
    setMessage("")
    try {
      const response = await fetch("/api/painel/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível salvar.")
      setSavedSettings(settings)
      setMessage("Configurações globais salvas para todas as ofertas.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível salvar agora.")
    } finally {
      setSaving(false)
    }
  }

  function sizePicker(label: string, key: keyof GlobalSiteSettings, value: GlobalSize) {
    return (
      <fieldset className={styles.sizeField}>
        <legend>{label}</legend>
        <div className={styles.sizeChoices}>
          {choices.map((size) => (
            <button
              type="button"
              key={size}
              className={value === size ? styles.sizeSelected : ""}
              aria-pressed={value === size}
              onClick={() => { setSettings((current) => ({ ...current, [key]: size })); setMessage("") }}
            >{size}<small>{size === "P" ? "Pequeno" : size === "M" ? "Médio" : "Grande"}</small></button>
          ))}
        </div>
      </fieldset>
    )
  }

  return (
    <section className={styles.globalSettings} aria-labelledby="global-visual-settings-title">
      <div className={styles.settingsIntro}>
        <div><p className={styles.settingsEyebrow}>PADRÃO GLOBAL</p><h2 id="global-visual-settings-title">Tamanho de textos e imagens</h2><p>As escalas se adaptam a cada tela e valem para todas as páginas de oferta.</p></div>
        <button className={styles.settingsSave} type="button" onClick={save} disabled={!dirty || saving}>{saving ? "Salvando…" : "Salvar ajustes globais"}</button>
      </div>
      <div className={styles.settingsBody}>
        <div className={styles.settingsControls}>
          {sizePicker("Tamanho da fonte", "typographySize", settings.typographySize)}
          {sizePicker("Tamanho das imagens", "imageSize", settings.imageSize)}
          <p className={styles.settingsHelp}>A escolha de imagens é independente da fonte. O layout reduz o espaço da imagem quando necessário para manter o CTA da hero na primeira dobra.</p>
        </div>
        <div className={styles.settingsPreview} aria-live="polite">
          <span className={styles.previewLabel}>Prévia responsiva</span>
          <div className={styles.previewArtwork}>
            <Image src={previewImage} alt="Prévia da imagem de uma oferta" width={256} height={256} sizes="160px" style={{ width: `${140 * imageScale}px`, height: `${140 * imageScale}px` }} />
          </div>
          <strong style={{ fontSize: `calc(16px * ${fontScale})` }}>Texto da página</strong>
          <p style={{ fontSize: `calc(13px * ${fontScale})` }}>A escala acompanha o tamanho da tela.</p>
        </div>
      </div>
      {message && <p className={message.startsWith("Configurações") ? styles.settingsSuccess : styles.settingsError} role="status">{message}</p>}
    </section>
  )
}
