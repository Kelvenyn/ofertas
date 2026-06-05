import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

export function Urgencia() {
  const { pill, title, highlight, body, ctaText, trust } = OFFER.urgency
  return (
    <section className="urg-section">
      <div className="urg-inner">
        <div className="urg-card">
          <div className="urg-glow" />

          <div className="urg-pill">
            <span className="urg-pill-icon">&#9889;</span>
            {pill}
          </div>

          <h2 className="urg-title">
            {title.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i === arr.length - 1 && <span className="urg-highlight"> {highlight}</span>}<br /></span>
            ))}
            de verdade?
          </h2>

          <div className="urg-dots">
            <span className="urg-dot" />
            <span className="urg-dot urg-dot-active" />
            <span className="urg-dot" />
          </div>

          <p className="urg-text">
            {body.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>

          <div className="urg-cta-wrap">
            <ShinyButton href="#oferta" className="urg-cta-btn">
              {ctaText}
            </ShinyButton>
          </div>

          <div className="urg-trust">
            {trust.map((t, i) => (
              <span key={i}>
                {i > 0 && <span className="urg-trust-sep">&bull;</span>}
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
