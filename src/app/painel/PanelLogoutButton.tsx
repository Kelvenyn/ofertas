"use client"

import { useState } from "react"
import styles from "./panel.module.css"

export function PanelLogoutButton() {
  const [busy, setBusy] = useState(false)
  async function logout() {
    setBusy(true)
    await fetch("/api/painel/logout", { method: "POST" })
    window.location.assign("/painel/login")
  }
  return <button className={styles.logout} type="button" onClick={logout} disabled={busy}>{busy ? "Saindo…" : "Sair"}</button>
}
