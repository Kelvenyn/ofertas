import Link from "next/link"
import { getOperationalCatalog } from "@/lib/operational-catalog"
import { getActiveFallbackSlug } from "@/lib/offer-routing"

export default async function NotFound() {
  const catalog = await getOperationalCatalog()
  const activeSlug = getActiveFallbackSlug(catalog.homepageOffer, catalog.offers)
  const destination = activeSlug ? `/${activeSlug}` : "/painel"
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: 24, background: "#f3f8fa", color: "#17212b", fontFamily: "Arial, sans-serif" }}>
      <section style={{ width: "min(100%, 520px)", padding: "clamp(28px, 7vw, 52px)", borderRadius: 24, background: "#fff", boxShadow: "0 20px 60px rgba(20, 43, 58, .12)", textAlign: "center" }}>
        <p style={{ margin: 0, color: "#12883e", fontWeight: 800, letterSpacing: ".12em", fontSize: 13 }}>UNIVERSO EDUK</p>
        <p style={{ margin: "24px 0 0", color: "#1199cf", fontWeight: 800, fontSize: "clamp(56px, 18vw, 86px)", lineHeight: 1 }}>404</p>
        <h1 style={{ margin: "16px 0 8px", fontSize: "clamp(22px, 6vw, 30px)", lineHeight: 1.2 }}>Esta página não está disponível</h1>
        <p style={{ margin: "0 auto 28px", maxWidth: 360, color: "#52616e", lineHeight: 1.6 }}>O endereço pode ter mudado ou a oferta está temporariamente desativada.</p>
        <Link href={destination} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "0 24px", borderRadius: 999, color: "#fff", background: "#12883e", fontWeight: 700, textDecoration: "none" }}>Ver ofertas disponíveis</Link>
      </section>
    </main>
  )
}
