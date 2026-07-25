import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/laboral/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = {
  title: "Ginástica Laboral",
  description: OFFER.meta.description,
  icons: { icon: "/images/laboral/favicon.webp" },
}

export default function LaboralLayout({ children }: { children: React.ReactNode }) {
  const { palette: p } = OFFER
  return (
    <>
      {/* Pixel Meta removido daqui: o tracker.js do Hub já inicializa o pixel
          configurado em Configurações > Integrações (client-side, com o mesmo
          event_id da CAPI) — manter os dois causaria PageView/ViewContent
          duplicados na Meta para o mesmo pixel. */}
      <Script
        id="utmify-pixel-init-laboral"
        strategy="afterInteractive"
      >
        {`window.pixelId = "6a5965f393dcaa95d693af7a";`}
      </Script>
      <Script
        id="utmify-pixel-laboral"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
      />
      <Script
        id="utmify-utms-laboral"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        strategy="afterInteractive"
      />
      <Script
        id="hub-tracker-laboral"
        src="https://hub.universoeduk.com/tracker.js"
        strategy="afterInteractive"
      />

      <div id="offer-root" className="laboral-offer" style={{
        "--brand": p.brand, "--brand-deep": p.brandDeep, "--brand-ink": p.brandInk,
        "--brand-dark": p.brandDark, "--brand-light": p.brandLight, "--brand-subtle": p.brandSubtle,
        "--cta": p.cta, "--cta-deep": p.ctaDeep, "--cta-darkest": p.ctaDarkest,
        "--accent": p.accent, "--yellow": p.yellow, "--bg": p.bg, "--bg-alt": p.bgAlt,
      } as React.CSSProperties}>
        <OfferProvider offer={OFFER}>{children}</OfferProvider>
      </div>
    </>
  )
}
