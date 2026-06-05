import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

export function Urgencia() {
  const { pill, title, highlight, body, ctaText, trust } = OFFER.urgency
  const titleLines = title.split('\n')

  return (
    <section className="urg-section">
      <div className="urg-inner">
        <div className="urg-card">

          <div className="urg-card-header">
            <div className="urg-header-orb" />
            <span className="urg-header-icon">⚡</span>
            <div className="urg-pill">{pill}</div>
          </div>

          <div className="urg-card-body">
            <h2 className="urg-title">
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i === titleLines.length - 1 && (
                    <> <span className="urg-highlight">{highlight}</span></>
                  )}
                  <br />
                </span>
              ))}
              de verdade?
            </h2>

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
      </div>
    </section>
  )
}
