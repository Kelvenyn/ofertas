"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import type { BonusSection } from "@/types/offer"

interface FlipCardProps {
  front: string
  back: string
  title: string
  desc: string
  price: string
  index: number
  labels: BonusSection
}

export function FlipCard({ front, back, title, desc, price, index, labels }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)
  const [showPulse, setShowPulse] = useState(false)
  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.src = back
  }, [back])

  useEffect(() => {
    if (!flipped) {
      setShowPulse(false)
      setShowBadge(false)
      const pulseTimer = setTimeout(() => {
        setShowPulse(true)
        setShowBadge(true)
      }, 3000)
      return () => clearTimeout(pulseTimer)
    } else {
      setShowBadge(false)
    }
  }, [flipped])

  const handleClick = useCallback(() => {
    setFlipped((current) => !current)
    setShowPulse(false)
    setShowBadge(false)
  }, [])

  const bonusNumber = index + 1

  return (
    <div className="bon-new-card">
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
            <div className={`bon-new-face bon-new-front ${showPulse ? 'bon-card-pulse' : ''}`}>
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
                <span className="bon-new-stripe-text">
                  <span aria-hidden="true">🎁</span> {labels.cardLabel} #{bonusNumber}
                </span>
              </div>
              {!flipped && (
                <div className="bon-new-hand">
                  <span className="bon-new-hand-emoji" aria-hidden="true">☝🏽</span>
                </div>
              )}
              {showBadge && !flipped && (
                <div className="bon-click-badge">TOQUE PARA VER</div>
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
              <div className="bon-new-back-hint">
                <span aria-hidden="true">&#8634;</span> {labels.backHint}
              </div>
              {flipped && (
                <div className="bon-flip-indicator">←</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="bon-new-touch-hint">
        <em>{labels.touchHint}</em>
      </p>

      <div className="bon-new-info">
        <span className="bon-new-pill-title">{title}</span>
        <p className="bon-new-desc">{desc}</p>
        <span className="bon-new-price">{price}</span>

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
