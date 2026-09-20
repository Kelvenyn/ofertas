import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getOperationalCatalog, getOperationalOffer } from "@/lib/operational-catalog"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getGlobalSiteSettings } from "@/lib/global-site-settings"
import { PanelLogoutButton } from "./PanelLogoutButton"
import { GlobalVisualSettings } from "./GlobalVisualSettings"
import styles from "./panel.module.css"

export const metadata = { title: "Painel de ofertas | Universo Eduk" }

export default async function PanelHomePage() {
  if (!(await isAdminAuthenticated())) redirect("/painel/login?next=/painel")
  const catalog = await getOperationalCatalog()
  const globalSettings = await getGlobalSiteSettings()
  const offers = await Promise.all(Object.entries(catalog.offers).map(async ([slug, entry]) => ({
    slug,
    entry,
    offer: await getOperationalOffer(slug),
  })))
  const activeCount = offers.filter(({ entry }) => {
    const status = (entry as typeof entry & { status?: string }).status
    return status === undefined || status === "active"
  }).length
  const checkoutCount = offers.filter(({ offer }) => Boolean(offer &&
    offer.pricing.plans.length >= 1 && offer.pricing.plans.length <= 2 &&
    offer.pricing.plans.every((plan) => /^https:\/\/(pay\.hotmart\.com|pay\.cakto\.com\.br)\//.test(plan.ctaHref ?? "")))).length
  const cashflowCount = offers.filter(({ entry }) => Boolean(entry.cashflow?.workspaceId && entry.cashflow.offerId)).length

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>UNIVERSO EDUK</p><h1>Painel de ofertas</h1><p>Edite conteúdo, imagens, cores e seções das suas landing pages.</p></div>
        <PanelLogoutButton />
      </header>
      <section className={styles.dashboard} aria-label="Resumo das ofertas">
        <article className={styles.metricCard}><span>Ofertas no total</span><strong>{offers.length}</strong><small>No catálogo</small></article>
        <article className={styles.metricCard}><span>Ofertas ativas</span><strong>{activeCount}</strong><small>Visíveis ao público</small></article>
        <article className={styles.metricCard}><span>Checkout pronto</span><strong>{checkoutCount}</strong><small>Todos os planos com link válido</small></article>
        <article className={styles.metricCard}><span>Cashflow instalado</span><strong>{cashflowCount}</strong><small>Tracking configurado</small></article>
      </section>
      <GlobalVisualSettings
        initialSettings={globalSettings}
        previewImage={offers.find(({ offer }) => offer)?.offer?.hero.image ?? "/images/psicopedagogia/plano-completo.webp"}
      />
      <section className={styles.grid} aria-label="Ofertas">
        {offers.map(({ slug, entry, offer }) => (
          <Link className={styles.offerCard} href={`/painel/${slug}`} key={slug}>
            {offer && <Image src={offer.hero.image} alt="" width={88} height={88} className={styles.thumbnail} />}
            <span className={styles.offerText}><strong>{entry.label}</strong><code>/{(entry as typeof entry & { slug?: string }).slug ?? slug}</code><small className={`${styles.status} ${(entry as typeof entry & { status?: string }).status === "draft" ? styles.statusDraft : (entry as typeof entry & { status?: string }).status === "inactive" ? styles.statusInactive : styles.statusActive}`}>{(entry as typeof entry & { status?: string }).status === "draft" ? "Rascunho" : (entry as typeof entry & { status?: string }).status === "inactive" ? "Desativada" : "Ativa"}</small></span>
            {offer && <span className={styles.swatch} style={{ backgroundColor: offer.palette.brand }} aria-label="Cor principal atual" />}
            <span className={styles.open}>Abrir</span>
          </Link>
        ))}
      </section>
    </main>
  )
}
