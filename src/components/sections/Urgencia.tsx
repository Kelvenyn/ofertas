"use client"

import { ShinyButton } from "@/components/ui/ShinyButton"
import { useCountdownTimer } from "@/hooks/useCountdownTimer"
import { OFFER } from "@/config/offer"

export function Urgencia() {
  const { title, highlight, body, ctaText, trust } = OFFER.urgency
  const titleLines = title.split('\n')
  const time = useCountdownTimer()

  return (
    <section className="urg-section" aria-labelledby="urgency-title">
      <div className="urg-inner">
        <div className="urg-card">

          <div className="urg-timer-row" role="timer" aria-live="polite" aria-label="Tempo restante">
            <div className="urg-timer-unit">
              <span className="urg-timer-val">{String(time.h).padStart(2, "0")}</span>
              <span className="urg-timer-label">Horas</span>
            </div>
            <span className="urg-timer-colon">:</span>
            <div className="urg-timer-unit">
              <span className="urg-timer-val">{String(time.m).padStart(2, "0")}</span>
              <span className="urg-timer-label">Minutos</span>
            </div>
            <span className="urg-timer-colon">:</span>
            <div className="urg-timer-unit">
              <span className="urg-timer-val">{String(time.s).padStart(2, "0")}</span>
              <span className="urg-timer-label">Segundos</span>
            </div>
          </div>

          <div className="urg-card-body">
            <h2 className="urg-title" id="urgency-title">
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
