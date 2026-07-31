import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/lembrancinhas/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = {
  title: "Lembrancinhas Cristã",
  description: OFFER.meta.description,
  icons: {
    icon: "/images/lembrancinhas/favicon.png",
  },
  openGraph: {
    title: OFFER.meta.title,
    description: OFFER.meta.description,
    type: "website",
    locale: "pt_BR",
    siteName: OFFER.meta.title,
  },
}

export default function LembrancinhasLayout({
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
          Removido o snippet fbq('init', '1653520942410205') + <noscript> que estava
          hardcoded aqui e duplicava PageView com o tracker do Hub. Oferta inativa e
          sem checkout configurado (ctaHref="#" em offer.ts) — o ggCheckout usado
          antes foi desligado do Hub e da lista default de hosts do tracker.js.
          Antes de reativar: cadastrar o produto na Cakto e trocar os ctaHref. */}
      <Script
        id="hub-tracker-lembrancinhas"
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
