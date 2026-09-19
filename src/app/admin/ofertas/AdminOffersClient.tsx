"use client"

import { useMemo, useState } from "react"
import { ExternalLink, LogOut, Palette, Search, ShieldCheck } from "lucide-react"
import type { OfferStatus } from "@/config/offers/catalog"
import type { PaletteKey } from "@/config/offers/palettes"
import styles from "./admin.module.css"

interface AdminOffer {
  slug: string
  label: string
  status: OfferStatus
  paletteKey: PaletteKey | null
  hasCashflow: boolean
  checkoutCount: number
  checkoutValid: boolean
}

const STATUS_LABELS: Record<OfferStatus, string> = {
  draft: "Rascunho",
  active: "Ativa",
  archived: "Arquivada",
}

export function AdminOffersClient({ initialOffers }: { initialOffers: AdminOffer[] }) {
  const [offers, setOffers] = useState(initialOffers)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | OfferStatus>("all")
  const [pin, setPin] = useState("")
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState<string | null>(null)

  const visibleOffers = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR")
    return offers.filter((offer) => {
      const matchesFilter = filter === "all" || offer.status === filter
      const matchesQuery = !term || `${offer.label} ${offer.slug}`.toLocaleLowerCase("pt-BR").includes(term)
      return matchesFilter && matchesQuery
    })
  }, [filter, offers, query])

  async function updateStatus(slug: string, status: OfferStatus) {
    if (pin !== "1010") {
      setMessage("Digite o PIN de confirmação 1010 antes de salvar.")
      return
    }

    setSaving(slug)
    setMessage("")
    try {
      const response = await fetch(`/api/admin/offers/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, status }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Não foi possível salvar o status.")
      setOffers((current) => current.map((offer) => offer.slug === slug ? { ...offer, status } : offer))
      setMessage(`${slug}: status salvo no catálogo.`)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível salvar o status.")
    } finally {
      setSaving(null)
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.assign("/admin/login")
  }

  const pendingTracking = offers.filter((offer) => !offer.hasCashflow).length

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Catálogo de ofertas</h1>
          <p>Controle o ciclo de publicação e abra cada página no editor de paletas.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.summary} aria-label="Resumo do catálogo">
            <strong>{offers.length}</strong>
            <span>ofertas</span>
            <strong>{pendingTracking}</strong>
            <span>tracking pendente</span>
          </div>
          <button type="button" className={styles.logout} onClick={logout}><LogOut size={16} /> Sair</button>
        </div>
      </header>

      <section className={styles.toolbar} aria-label="Ferramentas do catálogo">
        <label className={styles.search}>
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Buscar oferta</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome ou rota" />
        </label>

        <label>
          <span className="sr-only">Filtrar por status</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value as "all" | OfferStatus)}>
            <option value="all">Todos os status</option>
            <option value="active">Ativas</option>
            <option value="draft">Rascunhos</option>
            <option value="archived">Arquivadas</option>
          </select>
        </label>

        <label className={styles.pin}>
          <ShieldCheck size={18} aria-hidden="true" />
          <span>PIN para salvar</span>
          <input value={pin} onChange={(event) => setPin(event.target.value)} inputMode="numeric" maxLength={4} type="password" placeholder="••••" />
        </label>
      </section>

      {message && <p className={styles.feedback} role="status">{message}</p>}

      <section className={styles.list} aria-label="Ofertas">
        {visibleOffers.map((offer) => (
          <article className={styles.row} key={offer.slug}>
            <div className={styles.identity}>
              <strong>{offer.label}</strong>
              <code>/{offer.slug}</code>
            </div>

            <div className={styles.health}>
              <span className={offer.checkoutValid ? styles.ok : styles.warning}>{offer.checkoutCount} checkout{offer.checkoutCount === 1 ? "" : "s"}</span>
              <span className={offer.hasCashflow ? styles.ok : styles.warning}>{offer.hasCashflow ? "Cashflow ativo" : "Tracking pendente"}</span>
              <span>{offer.paletteKey ? `Paleta: ${offer.paletteKey}` : "Paleta atual preservada"}</span>
            </div>

            <div className={styles.actions}>
              <label>
                <span className="sr-only">Status de {offer.label}</span>
                <select
                  value={offer.status}
                  disabled={saving === offer.slug}
                  onChange={(event) => updateStatus(offer.slug, event.target.value as OfferStatus)}
                >
                  {(Object.keys(STATUS_LABELS) as OfferStatus[]).map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
                </select>
              </label>
              <a href={`/${offer.slug}`} target="_blank" rel="noreferrer" aria-label={`Abrir ${offer.label}`}><ExternalLink size={18} /></a>
              <a href={`/${offer.slug}/paleta`} aria-label={`Editar paleta de ${offer.label}`}><Palette size={18} /></a>
            </div>
          </article>
        ))}
        {visibleOffers.length === 0 && <p className={styles.empty}>Nenhuma oferta corresponde aos filtros.</p>}
      </section>
    </main>
  )
}
