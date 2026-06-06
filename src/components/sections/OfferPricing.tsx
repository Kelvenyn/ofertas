import Image from "next/image"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { AnimatedBullets } from "@/components/ui/AnimatedBullets"
import { OFFER } from "@/config/offer"

function calcDiscount(oldStr: string, priceStr: string): number {
  const clean = (s: string) => parseFloat(s.replace(/[^\d,]/g, "").replace(",", "."))
  const old = clean(oldStr)
  const curr = clean(priceStr)
  if (!old || !curr) return 0
  return Math.round((1 - curr / old) * 100)
}

export function OfferPricing() {
  const { pill, plans } = OFFER.pricing
  return (
    <section className="offer-pei-section" id="oferta" aria-labelledby="pricing-title">
      <div className="offer-pei-container">

        <div className="offer-pei-head">
          <div className="offer-pei-pill" id="pricing-title">{pill}</div>
        </div>

        <div className="offer-pei-grid">
          {plans.map((plan) => {
            const discount = calcDiscount(plan.oldPrice, plan.price)
            return (
              <div key={plan.id} className={`offer-card ${plan.featured ? "premium-plan" : "basic-plan"}`}>
                {plan.badgeText && <div className="offer-badge">{plan.badgeText}</div>}
                <div className="offer-card-top">
                  {plan.label && (
                    <div className={`plan-label ${plan.featured ? "premium-label" : "basic-label"}`}>
                      {plan.label}
                    </div>
                  )}
                  <h3>{plan.title}</h3>
                  <div className="offer-plan-img">
                    <Image src={plan.image} alt={plan.imageAlt} width={200} height={250} />
                  </div>
                </div>

                <div className="offer-price-block">
                  <div className="offer-old-price-row">
                    <span className="offer-old-price">{plan.oldPrice}</span>
                    {discount > 0 && (
                      <span className="offer-discount-badge">-{discount}%</span>
                    )}
                  </div>
                  <div className="offer-price">{plan.price}</div>
                  <div className="offer-installments">{plan.installments}</div>
                </div>

                <AnimatedBullets items={plan.items} className="offer-list" />

                <ShinyButton
                  href={plan.ctaHref}
                  className={`offer-btn ${plan.featured ? "premium-btn" : "basic-btn"}`}
                  showArrow={false}
                >
                  {plan.ctaText}
                </ShinyButton>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
