"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { OFFER } from "@/config/offer"

const mod = (n: number, m: number) => ((n % m) + m) % m
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const CONFIGS = [
  { scale: 1, rotateY: 0, tX: 0, tZ: 0, opacity: 1 },
  { scale: 0.7, rotateY: 48, tX: 90, tZ: -250, opacity: 0.45 },
  { scale: 0.5, rotateY: 62, tX: 140, tZ: -420, opacity: 0.1 },
]

function getInterpolatedStyle(offset: number): React.CSSProperties {
  const absOffset = Math.abs(offset)
  if (absOffset > 2.5) return { visibility: "hidden", position: "absolute" as const }

  const sign = offset >= 0 ? 1 : -1
  const idx = Math.min(Math.floor(absOffset), 1)
  const frac = absOffset - idx
  const from = CONFIGS[idx]
  const to = CONFIGS[Math.min(idx + 1, 2)]

  const scale = lerp(from.scale, to.scale, frac)
  const rotateY = lerp(from.rotateY, to.rotateY, frac) * -sign
  const tX = lerp(from.tX, to.tX, frac) * sign
  const tZ = lerp(from.tZ, to.tZ, frac)
  const opacity = lerp(from.opacity, to.opacity, frac)
  const z = Math.round(lerp(10, 1, absOffset / 2))

  return {
    position: "absolute",
    transform: `translateX(${tX}%) translateZ(${tZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: z,
    willChange: absOffset < 1.5 ? "transform, opacity" : "auto",
  }
}

export function SocialProof() {
  const slides = OFFER.socialProof.testimonials
  const COUNT = slides.length

  const posRef = useRef(0)
  const [, forceRender] = useState(0)
  const rerender = useCallback(() => forceRender((n) => n + 1), [])

  const [isInteracting, setIsInteracting] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const animRef = useRef<number | null>(null)
  const targetRef = useRef<number | null>(null)
  const velocityRef = useRef(0)

  const dragRef = useRef<{ startX: number; startPos: number; cardWidth: number } | null>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0.3 }
    )
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  const stopAnimation = useCallback(() => {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
  }, [])

  const springToNearest = useCallback(() => {
    stopAnimation()
    const target = targetRef.current ?? Math.round(posRef.current)
    targetRef.current = target

    let lastTime = performance.now()
    const stiffness = 300
    const damping = 26

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.032)
      lastTime = now

      const displacement = posRef.current - target
      const springForce = -stiffness * displacement
      const dampingForce = -damping * velocityRef.current
      velocityRef.current += (springForce + dampingForce) * dt
      posRef.current += velocityRef.current * dt

      if (Math.abs(displacement) < 0.001 && Math.abs(velocityRef.current) < 0.01) {
        posRef.current = target
        velocityRef.current = 0
        targetRef.current = null
        animRef.current = null
        rerender()
        return
      }

      rerender()
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
  }, [stopAnimation, rerender])

  useEffect(() => {
    if (isInteracting || prefersReducedMotion) return

    let lastTime = performance.now()
    let id: number
    let paused = false

    const autoTick = (now: number) => {
      const dt = (now - lastTime) / 1000
      lastTime = now

      if (isVisibleRef.current && targetRef.current === null && !paused) {
        posRef.current += dt * 0.15
        rerender()
      }
      id = requestAnimationFrame(autoTick)
    }

    id = requestAnimationFrame(autoTick)

    const handleVisibility = () => {
      if (document.hidden) {
        paused = true
      } else {
        paused = false
        lastTime = performance.now()
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [isInteracting, prefersReducedMotion, rerender])

  const goTo = useCallback((direction: number) => {
    stopAnimation()
    velocityRef.current = 0
    targetRef.current = Math.round(posRef.current) + direction
    springToNearest()
  }, [stopAnimation, springToNearest])

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    stopAnimation()
    targetRef.current = null
    velocityRef.current = 0

    const cardWidth = el.offsetWidth * 0.45 || 300
    dragRef.current = { startX: e.clientX, startPos: posRef.current, cardWidth }
    setIsInteracting(true)
    el.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return
    const delta = e.clientX - dragRef.current.startX
    const posDelta = -(delta / dragRef.current.cardWidth)
    posRef.current = dragRef.current.startPos + posDelta
    rerender()
  }

  const handlePointerUp = () => {
    if (dragRef.current) {
      dragRef.current = null
      springToNearest()
      setTimeout(() => setIsInteracting(false), 800)
    }
  }

  const handleCardClick = (visualOffset: number) => {
    if (Math.abs(visualOffset) > 0.5 && !dragRef.current) {
      stopAnimation()
      velocityRef.current = 0
      targetRef.current = posRef.current + visualOffset
      springToNearest()
    }
  }

  const handleDotClick = (i: number) => {
    stopAnimation()
    velocityRef.current = 0
    const current = mod(Math.round(posRef.current), COUNT)
    let diff = i - current
    if (diff > COUNT / 2) diff -= COUNT
    if (diff < -COUNT / 2) diff += COUNT
    targetRef.current = Math.round(posRef.current) + diff
    setIsInteracting(true)
    springToNearest()
    setTimeout(() => setIsInteracting(false), 800)
  }

  const currentPos = posRef.current
  const centerIndex = Math.round(currentPos)
  const visibleCards = [-2, -1, 0, 1, 2].map((o) => {
    const slideIndex = mod(centerIndex + o, COUNT)
    const visualOffset = (centerIndex + o) - currentPos
    return { slideIndex, visualOffset }
  })

  const activeSlide = mod(Math.round(currentPos), COUNT)

  return (
    <section className="sp-section" aria-labelledby="social-proof-title">
      <div className="sp-inner">
        <h2 className="sp-title" id="social-proof-title">O que estão dizendo</h2>
        <div className="sp-rating-row" aria-label="Avaliação média: 4.9 de 5 estrelas">
          <span className="sp-stars" aria-hidden="true">⭐⭐⭐⭐⭐</span>
          <span className="sp-rating-text">4.9/5 — mais de 250 avaliações</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="sp-carousel"
        role="region"
        aria-label="Carrossel de depoimentos"
      >
        <div
          ref={trackRef}
          className="sp-carousel-track"
          tabIndex={0}
          role="group"
          aria-roledescription="carrossel de depoimentos"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") { e.preventDefault(); setIsInteracting(true); goTo(-1); setTimeout(() => setIsInteracting(false), 800) }
            if (e.key === "ArrowRight") { e.preventDefault(); setIsInteracting(true); goTo(1); setTimeout(() => setIsInteracting(false), 800) }
          }}
        >
          <button
            className="sp-arrow sp-arrow-left"
            onClick={(e) => { e.stopPropagation(); setIsInteracting(true); goTo(-1); setTimeout(() => setIsInteracting(false), 800) }}
            aria-label="Slide anterior"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <button
            className="sp-arrow sp-arrow-right"
            onClick={(e) => { e.stopPropagation(); setIsInteracting(true); goTo(1); setTimeout(() => setIsInteracting(false), 800) }}
            aria-label="Próximo slide"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          <div className="sp-carousel-inner">
            {visibleCards.map(({ slideIndex, visualOffset }) => {
              const slide = slides[slideIndex]
              const isCenter = Math.abs(visualOffset) < 0.5

              return (
                <div
                  key={`${slideIndex}-${Math.round(visualOffset * 10)}`}
                  className="sp-story-card"
                  style={{
                    ...getInterpolatedStyle(visualOffset),
                    cursor: isCenter ? (dragRef.current ? "grabbing" : "grab") : "pointer",
                  }}
                  onClick={() => handleCardClick(visualOffset)}
                  aria-hidden={!isCenter}
                >
                  <div
                    className="sp-story-gradient-bar"
                    style={{ background: slide.gradient }}
                  />
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={360}
                    height={640}
                    className="sp-story-img"
                    draggable={false}
                    loading={Math.abs(visualOffset) <= 1 ? "eager" : "lazy"}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="sp-dots" role="group" aria-label="Navegação de slides">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`sp-dot${i === activeSlide ? " sp-dot-active" : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
