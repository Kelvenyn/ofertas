import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/castracao/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = { title: OFFER.meta.title, description: OFFER.meta.description, icons: { icon: "/images/castracao/favicon.webp" }, openGraph: { title: OFFER.meta.title, description: OFFER.meta.description, type: "website", locale: "pt_BR", siteName: OFFER.meta.title } }

export default function CastracaoLayout({ children }: { children: React.ReactNode }) {
  const { palette: p } = OFFER
  return (
    <>
      <Script id="meta-pixel-castracao" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1758020792034838');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1758020792034838&ev=PageView&noscript=1"
        />
      </noscript>
      <Script id="utmify-pixel-id-castracao" strategy="afterInteractive">
        {`window.pixelId = "6a624b4788257c8aabea2620";`}
      </Script>
      <Script
        id="utmify-pixel-castracao"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
      />
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
