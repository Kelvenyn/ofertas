import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

const LAYOUTS = ["default", "highlight", "wide", "compact"]

export function Benefits() {
  const benefits = OFFER.benefits
  return (
    <section className="ben-section" aria-labelledby="benefits-title">
      <div className="ben-inner">
        <h2 className="ben-title" id="benefits-title">Benefícios do material</h2>

        <div className="ben-list">
          {benefits.map((b, i) => {
            const layout = LAYOUTS[i % LAYOUTS.length]
            return (
              <div className={`ben-item ben-item-${layout}`} key={i}>
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
