import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

const CARD_COLORS = ["#0B7FE8", "#22C978", "#FF8A5B", "#8B5CF6"]

export function Benefits() {
  const benefits = OFFER.benefits
  return (
    <section className="ben-section" aria-labelledby="benefits-title">
      <div className="ben-inner">
        <h2 className="ben-title" id="benefits-title">Benefícios do material</h2>

        <div className="ben-list">
          {benefits.map((b, i) => {
            const color = CARD_COLORS[i % CARD_COLORS.length]
            const isAlt = i % 2 === 1
            return (
              <div
                className={`ben-item ${isAlt ? "ben-item-alt" : ""}`}
                key={i}
                style={{ "--card-accent": color } as React.CSSProperties}
              >
                <div className="ben-item-icon" role="img" aria-label={b.title}>
                  <span className="ben-emoji">{b.icon}</span>
                </div>
                <div className="ben-item-content">
                  <h3 className="ben-item-title">{b.title}</h3>
                  <p className="ben-item-desc">{b.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="ben-cta-wrap">
          <ShinyButton href="#oferta">
            QUERO ACESSAR O KIT AGORA
          </ShinyButton>
        </div>
      </div>
    </section>
  )
}
