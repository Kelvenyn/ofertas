import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/castracao/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = { title: OFFER.meta.title, description: OFFER.meta.description, icons: { icon: "/images/castracao/favicon.webp" }, openGraph: { title: OFFER.meta.title, description: OFFER.meta.description, type: "website", locale: "pt_BR", siteName: OFFER.meta.title } }

export default function CastracaoLayout({ children }: { children: React.ReactNode }) {
  const { palette: p } = OFFER
  return (
    <>
      {/* Pixel Meta: o tracker.js do Hub já inicializa o(s) pixel(s) ativos (via
          /api/config, client-side, com o mesmo event_id da CAPI) — não embarcar
          pixel próprio nem Utmify aqui pra não duplicar PageView/ViewContent. */}
      <Script
        id="hub-tracker-castracao"
        src="https://hub.universoeduk.com/tracker.js"
        strategy="afterInteractive"
      />
      <div
        id="offer-root"
        className="castracao-offer"
        style={{ "--brand": p.brand, "--brand-deep": p.brandDeep, "--brand-ink": p.brandInk, "--brand-dark": p.brandDark, "--brand-light": p.brandLight, "--brand-subtle": p.brandSubtle, "--cta": p.cta, "--cta-deep": p.ctaDeep, "--cta-darkest": p.ctaDarkest, "--accent": p.accent, "--yellow": p.yellow, "--bg": p.bg, "--bg-alt": p.bgAlt } as React.CSSProperties}
      >
        <OfferProvider offer={OFFER}>{children}</OfferProvider>
      </div>
    </>
  )
}
