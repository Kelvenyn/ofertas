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
      <Script id="trackhub-autogrant" strategy="beforeInteractive">
        {`
document.cookie = "trck_consent=granted; path=/; max-age=31536000; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
try { localStorage.setItem("trck_consent", "granted"); } catch {}
`}
      </Script>
      <Script
        async
        src="https://hub.universoeduk.com/tracker.js"
        data-checkout-hosts="ggcheckout.app"
        strategy="afterInteractive"
      />

      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        async
        defer
      />
      <Script id="utmify-pixel-init" strategy="afterInteractive">
        {`
window.pixelId = "6a42e043af23a1372722f211";
var a = document.createElement("script");
a.setAttribute("async", "");
a.setAttribute("defer", "");
a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
document.head.appendChild(a);
`}
      </Script>

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
