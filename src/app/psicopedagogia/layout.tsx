import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/psicopedagogia/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = {
  title: "Mapa de Perfil Infantil",
  description: OFFER.meta.description,
  icons: {
    icon: "/images/psicopedagogia/favicon.png",
  },
  openGraph: {
    title: OFFER.meta.title,
    description: OFFER.meta.description,
    type: "website",
    locale: "pt_BR",
    siteName: OFFER.meta.title,
  },
}

export default function PsicopedagogiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { palette: p } = OFFER
  return (
    <>
      {/* Trackhub: inicializa o(s) Meta Pixel(s) ativos dinamicamente (via /api/config) e
          espelha os eventos server-side (Meta CAPI) com o mesmo event_id (dedup). Substitui
          o snippet estático do Pixel — o pixel 1024867226763534 já está configurado no hub. */}
      <Script
        async
        src="https://hub.universoeduk.com/tracker.js"
        data-checkout-hosts="ggcheckout.app"
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
