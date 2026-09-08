import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/lavanderia/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = { title: OFFER.meta.title, description: OFFER.meta.description, icons: { icon: "/images/lavanderia/favicon.webp" }, openGraph: { title: OFFER.meta.title, description: OFFER.meta.description, type: "website", locale: "pt_BR", siteName: OFFER.meta.title } }

export default function LavanderiaLayout({ children }: { children: React.ReactNode }) {
  const { palette: p } = OFFER
  return <>
    <Script
      id="cashflow-tracker-lavanderia"
      src="https://cashflow.mentoriaprocesso.com/t/p.js?w=743002a9-8ace-4256-b34d-5cfb2461eacc&o=858b9d0c-d3f7-4e71-a0b6-288817b6d656"
      data-offer="858b9d0c-d3f7-4e71-a0b6-288817b6d656"
      data-nowprocket
      data-no-minify="1"
      data-no-optimize="1"
      data-cfasync="false"
      async
      strategy="afterInteractive"
    />
    <div id="offer-root" style={{ "--brand": p.brand, "--brand-deep": p.brandDeep, "--brand-ink": p.brandInk, "--brand-dark": p.brandDark, "--brand-light": p.brandLight, "--brand-subtle": p.brandSubtle, "--cta": p.cta, "--cta-deep": p.ctaDeep, "--cta-darkest": p.ctaDarkest, "--accent": p.accent, "--yellow": p.yellow, "--bg": p.bg, "--bg-alt": p.bgAlt } as React.CSSProperties}><OfferProvider offer={OFFER}>{children}</OfferProvider></div>
  </>
}
