"use client"

import Image from "next/image"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { AnimatedBullets } from "@/components/ui/AnimatedBullets"
import { useOffer } from "@/context/offer-context"

function calcDiscount(oldStr: string, priceStr: string): number {
  const clean = (value: string) => parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."))
  const old = clean(oldStr)
  const current = clean(priceStr)
  if (!old || !current) return 0
  return Math.round((1 - current / old) * 100)
}

export function OfferPricing() {
  const offer = useOffer()
  const { titleLead, titleHighlight, plans } = offer.pricing

  return (
    <section className="offer-pei-section" id="oferta" aria-labelledby="pricing-title">
      <div className="offer-pei-container">
        <div className="offer-pei-head">
          <h2 className="offer-pei-head-title" id="pricing-title">
            <span className="offer-pei-head-line">{titleLead}</span>
            <span className="offer-pei-head-accent">{titleHighlight}</span>
          </h2>
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
                  {plan.extraNote && (
                    <p style={{
                      margin: "0 0 10px",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "var(--cta-deep)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}>
                      {plan.extraNote}
                    </p>
                  )}
                  <div className="offer-plan-img">
                    <Image src={plan.image} alt={plan.imageAlt} width={300} height={375} />
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

                {plan.mutedItems && plan.mutedItems.length > 0 && (
                  <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {plan.mutedItems.map((item, i) => (
                      <li key={i} style={{ fontSize: 13.5, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14 }}>✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

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
