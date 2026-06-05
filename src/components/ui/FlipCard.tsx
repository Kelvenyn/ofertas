"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"

interface FlipCardProps {
  front: string
  back: string
  title: string
  desc: string
  price: string
  index: number
}

export function FlipCard({ front, back, title, desc, price, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
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
              <Image
                src={front}
                alt={title}
                width={400}
                height={300}
                className="bon-new-img"
                loading="lazy"
                onLoad={() => setFrontLoaded(true)}
              />
              <div className="bon-new-stripe">
                <span className="bon-new-stripe-text"><span aria-hidden="true">🎁</span> BÔNUS #{bonusNumber}</span>
              </div>
              {!flipped && (
                <div className="bon-new-hand">
                  <span className="bon-new-hand-emoji" aria-hidden="true">☝🏽</span>
                </div>
              )}
            </div>

            {/* Back */}
            <div className="bon-new-face bon-new-back">
              <Image
                src={back}
                alt={`${title} - conteúdo`}
                width={400}
                height={300}
                className="bon-new-img"
                loading="lazy"
              />
              <div className="bon-new-back-hint">
                <span aria-hidden="true">&#8634;</span> Toque para voltar
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
          <span className="bon-new-timer-icon" aria-hidden="true">&#9203;</span>
          <span className="bon-new-timer-text">OFERTA EXPIRA COM O CRONÔMETRO</span>
        </div>

        <div className="bon-new-pill-free">
          <span aria-hidden="true">🎁</span> GRÁTIS
        </div>
      </div>
    </div>
  )
}
