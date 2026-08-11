import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/jardim/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = {
  title: "35 Projetos de Jardins Verticais",
  description: OFFER.meta.description,
  icons: {
    icon: "/images/jardim/favicon.webp",
  },
  openGraph: {
    title: OFFER.meta.title,
    description: OFFER.meta.description,
    type: "website",
    locale: "pt_BR",
    siteName: OFFER.meta.title,
  },
}

export default function JardimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { palette: p } = OFFER
  return (
    <>
      {/* Pixel Meta: o tracker.js do Hub já inicializa o(s) pixel(s) ativos (via
          /api/config, client-side, com o mesmo event_id da CAPI) — não embarcar
          pixel próprio nem Utmify aqui pra não duplicar PageView/ViewContent.
          Checkout desta oferta é Cakto: não sobrescrever data-checkout-hosts — o
          default do tracker.js já cobre cakto.com.br (além de wa.me). O ggCheckout
          foi desligado do Hub (e removido da lista default do tracker.js), então
          um data-checkout-hosts="ggcheckout.app" aqui só quebraria a propagação
          do trck_uid pro checkout real desta oferta. */}
      <Script
        id="hub-tracker-jardim"
        src="https://hub.universoeduk.com/tracker.js"
        strategy="afterInteractive"
      />

      <div
        id="offer-root"
        style={{
          "--brand": p.brand,
          "--brand-deep": p.brandDeep,
          "--brand-ink": p.brandInk,
          "--brand-dark": p.brandDark,
          "--brand-light": p.brandLight,
          "--brand-subtle": p.brandSubtle,
          "--cta": p.cta,
          "--cta-deep": p.ctaDeep,
          "--cta-darkest": p.ctaDarkest,
          "--accent": p.accent,
          "--yellow": p.yellow,
          "--bg": p.bg,
          "--bg-alt": p.bgAlt,
        } as React.CSSProperties}
      >
        <OfferProvider offer={OFFER}>{children}</OfferProvider>
      </div>
    </>
  )
}
