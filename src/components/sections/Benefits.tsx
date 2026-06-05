import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

export function Benefits() {
  const benefits = OFFER.benefits
  return (
    <section className="ben-section">
      <div className="ben-inner">
        <h2 className="ben-title">Benefícios do material</h2>

        <div className="ben-grid">
          {benefits.map((b, i) => (
            <div className="ben-card" key={i}>
              <div className="ben-card-icon">{b.icon}</div>
              <h3 className="ben-card-title">{b.title}</h3>
              <p className="ben-card-desc">{b.desc}</p>
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
