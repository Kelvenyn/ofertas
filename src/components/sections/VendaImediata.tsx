"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"
import { useCountdownTimer } from "@/hooks/useCountdownTimer"
import { OFFER } from "@/config/offer"

export function VendaImediata() {
  const { pill, titleLine1, titleLine2, titleLine3, image, imageAlt, imageWidth, imageHeight, subtitle, ctaText, timerLabel, marqueeText, marqueeGradient } = OFFER.hero
  const { h, m, s } = useCountdownTimer()
  const [flipping, setFlipping] = useState<boolean[]>([false, false, false])
  const prevPartsRef = useRef<string[]>(["", "", ""])
  const [isFixed, setIsFixed] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const timerParts = [
    `${String(h).padStart(2,"0")}h`,
    `${String(m).padStart(2,"0")}m`,
    `${String(s).padStart(2,"0")}s`,
  ]

  useEffect(() => {
    const prevParts = prevPartsRef.current
    const newFlipping = timerParts.map((p, i) => p !== prevParts[i])
    prevPartsRef.current = timerParts
    if (newFlipping.some(Boolean)) {
      setFlipping(newFlipping)
      const t = setTimeout(() => setFlipping([false, false, false]), 150)
      return () => clearTimeout(t)
    }
  })

  useEffect(() => {
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const hero = heroRef.current
        if (!hero) { ticking = false; return }
        const heroBottom = hero.offsetTop + hero.offsetHeight
        const scrollY = window.scrollY

        setIsFixed(scrollY > 60)
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className={`vi-top-bar${isFixed ? " fixed" : ""}`}>
        <div className="vi-top-bar-inner">
          <div className="vi-top-bar-label">
            <span className="vi-top-bar-icon" aria-hidden="true">&#127873;</span>
            <span className="vi-top-bar-text">{timerLabel}</span>
          </div>
          <div className="vi-top-bar-timer" aria-live="polite" aria-atomic="true">
            {timerParts.map((part, i) => (
              <span key={i} className={`vi-timer-segment${flipping[i] ? " flip" : ""}`}>
                {part}
                {i < 2 && <span className="vi-timer-sep">:</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="vi-hero" ref={heroRef}>
        <div className="vi-hero-inner">
          <div className="vi-pill">{pill}</div>

          <h1 className="vi-title">
            <span className="vi-title-line1">{titleLine1}</span>
            <span className="vi-title-line2">{titleLine2}</span>
            <span className="vi-title-line3">{titleLine3}</span>
          </h1>

          <div className="vi-image">
            <Image
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              priority
            />
          </div>

          <p className="vi-sub">
            {subtitle}
          </p>

          <ShinyButton href="#oferta" className="vi-cta-btn">
            {ctaText}
          </ShinyButton>

          <ScrollMarquee
            text={marqueeText}
            gradient={marqueeGradient}
            className="vi-marquee"
          />
        </div>
      </section>
    </>
  )
}
