import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/laboral/offer"
import { PaletteSwitcher } from "@/components/dev/PaletteSwitcher"
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
      <Script id="meta-pixel-laboral" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1346866647637524');
fbq('track', 'PageView');
`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1346866647637524&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <Script
        id="utmify-utms-laboral"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-subids
        strategy="afterInteractive"
      />
      <Script id="utmify-pixel-init-laboral" strategy="afterInteractive">
        {`window.pixelId = "6a5965f393dcaa95d693af7a";`}
      </Script>
      <Script
        id="utmify-pixel-laboral"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
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
      <PaletteSwitcher />
    </>
  )
}
