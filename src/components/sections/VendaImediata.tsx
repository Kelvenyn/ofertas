"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"
import { OFFER } from "@/config/offer"

export function VendaImediata() {
  const { pill, titleLine1, titleLine2, titleLine3, image, imageAlt, imageWidth, imageHeight, subtitle, ctaText, timerLabel, marqueeText, marqueeGradient } = OFFER.hero
  const [time, setTime] = useState("")
  const [flipping, setFlipping] = useState<boolean[]>([false, false, false])
  const prevPartsRef = useRef<string[]>(["", "", ""])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFixed, setIsFixed] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function update() {
      const agora = new Date()
      const fim = new Date()
      fim.setHours(23, 59, 59, 999)
      let diff = fim.getTime() - agora.getTime()
      if (diff <= 0) { setTime("00h 00min 00s"); return }
      const h = Math.floor(diff / 3600000)
      diff -= h * 3600000
      const m = Math.floor(diff / 60000)
      diff -= m * 60000
      const s = Math.floor(diff / 1000)
      const newParts = [
        `${String(h).padStart(2,"0")}h`,
        `${String(m).padStart(2,"0")}min`,
        `${String(s).padStart(2,"0")}s`
      ]

      const prevParts = prevPartsRef.current
      const newFlipping = newParts.map((p, i) => p !== prevParts[i])
      setFlipping(newFlipping)
      prevPartsRef.current = newParts

      if (newFlipping.some(Boolean)) {
        setTimeout(() => setFlipping([false, false, false]), 150)
      }

      setTime(newParts.join(" "))
    }
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    function onScroll() {
      const hero = heroRef.current
      if (!hero) return
      const heroBottom = hero.offsetTop + hero.offsetHeight
      const scrollY = window.scrollY

      setIsFixed(scrollY > 60)

      const progress = Math.min(Math.max(scrollY / (heroBottom * 0.6), 0), 1)
      setScrollProgress(progress * 100)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const timerParts = time.split(" ")

  return (
    <>
      <div className={`vi-top-bar${isFixed ? " fixed" : ""}`}>
        <div className="vi-top-bar-inner">
          <div className="vi-top-bar-label">
            <span className="vi-top-bar-icon">&#127873;</span>
            <span className="vi-top-bar-text">{timerLabel}</span>
          </div>
          <div className="vi-top-bar-timer">
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
            <img
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
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
