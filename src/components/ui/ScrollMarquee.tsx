"use client"

import { useEffect, useRef, useCallback } from "react"

interface ScrollMarqueeProps {
  text: string
  gradient?: string
  speed?: number
  reverse?: boolean
  className?: string
}

export function ScrollMarquee({
  text,
  gradient = "linear-gradient(90deg, #0B7FE8 0%, #1D4ED8 50%, #082F63 100%)",
  speed = 0.5,
  reverse = false,
  className = "",
}: ScrollMarqueeProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const velRef = useRef(0)
  const displayVelRef = useRef(speed)
  const lastScrollRef = useRef(0)
  const hoveredRef = useRef(false)
  const rafRef = useRef<number>(0)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animate = useCallback(() => {
    const bar = barRef.current
    const block = blockRef.current
    if (!bar || !block) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    const blockW = block.scrollWidth / 2
    const effectiveBase = hoveredRef.current ? 0 : speed
    const target = effectiveBase + velRef.current
    displayVelRef.current = lerp(displayVelRef.current, target, 0.08)
    velRef.current *= 0.95

    posRef.current -= displayVelRef.current * (reverse ? -1 : 1)

    if (posRef.current <= -blockW) posRef.current += blockW
    if (posRef.current > 0) posRef.current -= blockW

    bar.style.transform = `translateX(${posRef.current}px)`
    rafRef.current = requestAnimationFrame(animate)
  }, [speed, reverse])

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollRef.current
      lastScrollRef.current = scrollY
      velRef.current = Math.max(-4, Math.min(4, delta * 0.08))
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  const rendered = `${text} \u2022 `

  return (
    <div
      className={`scroll-marquee ${className}`}
      style={{ background: gradient }}
      onMouseEnter={() => { hoveredRef.current = true }}
      onMouseLeave={() => { hoveredRef.current = false }}
    >
      <div className="scroll-marquee-fade scroll-marquee-fade-l" style={{ background: gradient }} />
      <div className="scroll-marquee-fade scroll-marquee-fade-r" style={{ background: gradient }} />
      <div ref={barRef} className="scroll-marquee-track">
        <div ref={blockRef} className="scroll-marquee-block">
          {rendered}{rendered}
        </div>
        <div className="scroll-marquee-block">
          {rendered}{rendered}
        </div>
      </div>
    </div>
  )
}
