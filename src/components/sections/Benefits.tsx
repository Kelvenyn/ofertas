import { ShinyButton } from "@/components/ui/ShinyButton"
import { DynamicIcon } from "@/components/icons"
import { OFFER } from "@/config/offer"

export function Benefits() {
  const benefits = OFFER.benefits
  return (
    <section className="ben-section" aria-labelledby="benefits-title">
      <div className="ben-inner">
        <h2 className="ben-title" id="benefits-title">Benefícios do material</h2>

        <div className="ben-list">
          {benefits.map((b, i) => (
            <div className="ben-item" key={i}>
              <div className="ben-item-icon"><DynamicIcon name={b.icon} size={28} /></div>
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
