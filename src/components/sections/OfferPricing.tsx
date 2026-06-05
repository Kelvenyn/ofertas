import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

export function OfferPricing() {
  const { pill, heading1, heading2, image, imageAlt, plans, trustBadges } = OFFER.pricing
  return (
    <section className="offer-pei-section" id="oferta">
      <div className="offer-pei-container">

        <div className="offer-pei-head">
          <div className="offer-pei-pill">{pill}</div>

          <h2>
            <span className="offer-main-line">{heading1}</span>
            <span>{heading2}</span>
          </h2>

          <div className="offer-product-preview">
            <img
              src={image}
              alt={imageAlt}
              width={320}
              height={400}
            />
          </div>

          <p>
            Escolha o <strong>Plano Básico</strong> para acessar as atividades principais ou aproveite o
            <strong> Plano Completo</strong> para liberar uma versão mais robusta, com bônus extras,
            fichas de apoio e recursos para organizar melhor seus atendimentos.
          </p>
        </div>

        <div className="offer-pei-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`offer-card ${plan.featured ? 'premium-plan' : 'basic-plan'}`}>
              {plan.badgeText && <div className="offer-badge">{plan.badgeText}</div>}
              <div className="offer-card-top">
                <div className={`plan-label ${plan.featured ? 'premium-label' : 'basic-label'}`}>{plan.label}</div>
                <h3>{plan.title}</h3>
                <div className="offer-plan-img">
                  <img src={plan.image} alt={plan.imageAlt} width={200} height={250} />
                </div>
              </div>

              <div className="offer-price-block">
                <div className="offer-old-price">{plan.oldPrice}</div>
                <div className="offer-price">{plan.price}</div>
                <div className="offer-installments">{plan.installments}</div>
              </div>

              {plan.extraNote && (
                <div className="premium-extra-note">{plan.extraNote}</div>
              )}

              <ul className="offer-list">
                {plan.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                {plan.mutedItems?.map((item, i) => (
                  <li key={`m-${i}`} className="muted">{item}</li>
                ))}
              </ul>

              <ShinyButton href={plan.ctaHref} className={`offer-btn ${plan.featured ? 'premium-btn' : 'basic-btn'}`} showArrow={false}>
                {plan.ctaText}
              </ShinyButton>
            </div>
          ))}
        </div>

        <div className="offer-bottom-info">
          {trustBadges.map((badge, i) => <span key={i}>{badge}</span>)}
        </div>

      </div>
    </section>
  )
}
