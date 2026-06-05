import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

export function Benefits() {
  const benefits = OFFER.benefits
  return (
    <section className="ben-section">
      <div className="ben-inner">
        <h2 className="ben-title">Benefícios do material</h2>

        <div className="ben-list">
          {benefits.map((b, i) => (
            <div className="ben-item" key={i}>
              <div className="ben-item-icon">{b.icon}</div>
              <div className="ben-item-content">
                <h3 className="ben-item-title">{b.title}</h3>
                <p className="ben-item-desc">{b.desc}</p>
              </div>
            </div>
          ))}
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
