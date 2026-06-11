"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import type { BonusSection } from "@/types/offer"

interface FlipCardProps {
  front: string
  back: string
  title: string
  titleBreak?: string
  desc: string
  price: string
  index: number
  labels: BonusSection
}

export function FlipCard({ front, back, title, titleBreak, desc, price, index, labels }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.src = back
  }, [back])

  const handleClick = useCallback(() => {
    setFlipped((current) => !current)
  }, [])

  const bonusNumber = index + 1

  return (
    <div className="bon-new-card">
      <div className="bon-new-badge">
        <span aria-hidden="true">🎁</span> {labels.cardLabel} #{bonusNumber}
      </div>
      <div
        className="bon-new-image-wrapper"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            handleClick()
          }
        }}
        aria-label={`${flipped ? "Ocultar conteúdo de" : "Ver conteúdo de"} ${title}`}
      >
        {!frontLoaded && <div className="bon-flip-skeleton" />}

        <div className="bon-new-perspective" style={{ opacity: frontLoaded ? 1 : 0 }}>
          <div
            className="bon-new-inner"
            style={{
              transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
            }}
          >
            <div className="bon-new-face bon-new-front">
              <Image
                src={front}
                alt={title}
                width={400}
                height={300}
                className="bon-new-img"
                loading="lazy"
                onLoad={() => setFrontLoaded(true)}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
              {!flipped && (
                <div className="bon-new-hand">
                  <span className="bon-new-hand-emoji" aria-hidden="true">☝🏽</span>
                  <span className="bon-new-hand-label">Toque para ver</span>
                </div>
              )}
            </div>

            <div className="bon-new-face bon-new-back">
              <Image
                src={back}
                alt={`${title} - conteúdo`}
                width={400}
                height={300}
                className="bon-new-img"
                loading="lazy"
              />
              {flipped && (
                <div className="bon-flip-indicator-center">
                  <span className="bon-flip-indicator-icon" aria-hidden="true">↩</span>
                  <span className="bon-flip-indicator-label">Voltar</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bon-new-info">
        <span className="bon-new-pill-title">{titleBreak || title}</span>
        <p className="bon-new-desc">{desc}</p>
        <span className="bon-new-price">
          <span className="bon-new-price-label">De </span><span className="bon-new-price-old">{price}</span>
        </span>

        <div className="bon-new-timer">
          <span className="bon-new-timer-icon" aria-hidden="true">&#9203;</span>
          <span className="bon-new-timer-text">{labels.timerText}</span>
        </div>

        <div className="bon-new-pill-free">
          <span aria-hidden="true">🎁</span> {labels.freeLabel}
        </div>
      </div>
    </div>
  )
}
