import type { Metadata } from "next"
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
    <div id="offer-root" className="laboral-offer" style={{
      "--brand": p.brand, "--brand-deep": p.brandDeep, "--brand-ink": p.brandInk,
      "--brand-dark": p.brandDark, "--brand-light": p.brandLight, "--brand-subtle": p.brandSubtle,
      "--cta": p.cta, "--cta-deep": p.ctaDeep, "--cta-darkest": p.ctaDarkest,
      "--accent": p.accent, "--yellow": p.yellow, "--bg": p.bg, "--bg-alt": p.bgAlt,
    } as React.CSSProperties}>
      <OfferProvider offer={OFFER}>{children}</OfferProvider>
    </div>
  )
}
