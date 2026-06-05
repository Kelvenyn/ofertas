"use client"

import { useState, useCallback, useEffect } from "react"
import { OFFER } from "@/config/offer"

interface FlipCardProps {
  front: string
  back: string
  title: string
  desc: string
  price: string
  index: number
}

function FlipCard({ front, back, title, desc, price, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = back
  }, [back])

  const handleClick = useCallback(() => {
    setFlipped(f => !f)
  }, [])

  const bonusNumber = index + 1

  return (
    <div className="bon-new-card">
      <div
        className="bon-new-image-wrapper"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick() } }}
        aria-label={`${flipped ? "Ocultar conteúdo de" : "Ver conteúdo de"} ${title}`}
      >
        {!frontLoaded && <div className="bon-flip-skeleton" />}

        <div
          className="bon-new-perspective"
          style={{ opacity: frontLoaded ? 1 : 0 }}
        >
          <div
            className="bon-new-inner"
            style={{
              transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div className="bon-new-face bon-new-front">
              <img
                src={front}
                alt={title}
                className="bon-new-img"
                loading="lazy"
                onLoad={() => setFrontLoaded(true)}
              />
              <div className="bon-new-stripe">
                <span className="bon-new-stripe-text">🎁 BÔNUS #{bonusNumber}</span>
              </div>
              {!flipped && (
                <div className="bon-new-hand">
                  <span className="bon-new-hand-emoji">☝🏽</span>
                </div>
              )}
            </div>

            {/* Back */}
            <div className="bon-new-face bon-new-back">
              <img
                src={back}
                alt={`${title} - conteúdo`}
                className="bon-new-img"
                loading="lazy"
              />
              <div className="bon-new-back-hint">
                &#8634; Toque para voltar
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="bon-new-touch-hint">
        <em>Toque na imagem acima para ver o conteúdo.</em>
      </p>

      <div className="bon-new-info">
        <span className="bon-new-pill-title">{title}</span>
        <p className="bon-new-desc">{desc}</p>
        <span className="bon-new-price">{price}</span>

        <div className="bon-new-timer">
          <span className="bon-new-timer-icon">&#9203;</span>
          <span className="bon-new-timer-text">OFERTA EXPIRA COM O CRONÔMETRO</span>
        </div>

        <div className="bon-new-pill-free">
          🎁 GRÁTIS
        </div>
      </div>
    </div>
  )
}

export function Bonuses() {
  const bonuses = OFFER.bonuses
  return (
    <section className="bon-section" aria-labelledby="bonuses-title">
      <div className="bon-inner">
        <div className="bon-headline-pill">
          <span className="bon-headline-dot" />
          EXTRA INCLUÍDO
        </div>

        <h2 className="bon-title" id="bonuses-title">
          6 BÔNUS <span className="bon-title-green">EXCLUSIVOS</span>
        </h2>

        <div className="bon-divider" />

        <p className="bon-sub">
          Ao adquirir hoje, você também recebe <strong>6 materiais complementares</strong> para deixar seus atendimentos psicopedagógicos mais organizados, práticos e completos.
        </p>

        <div className="bon-grid">
          {bonuses.map((b, i) => (
            <FlipCard key={i} index={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  )
}
