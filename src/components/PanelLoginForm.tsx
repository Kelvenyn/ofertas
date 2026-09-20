"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import styles from "./PanelLoginForm.module.css"

export function PanelLoginForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError("")
    try {
      const response = await fetch("/api/painel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, next: searchParams.get("next") }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível entrar.")
      window.location.assign(result.next)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível entrar.")
      setSaving(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label><span>E-mail</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
      <label><span>Senha</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button type="submit" disabled={saving}>{saving ? "Entrando…" : "Entrar no painel"}</button>
    </form>
  )
}
