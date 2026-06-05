"use client"

import { useEffect, useRef } from "react"

interface ScrollMarqueeProps {
  text?: string
  gradient?: string
  height?: number
  className?: string
  reverse?: boolean
}

export function ScrollMarquee({
  text = "MATERIAL EM ALTA QUALIDADE • ACESSO IMEDIATO • BÔNUS INCLUÍDOS • ",
  gradient = "linear-gradient(135deg, #fd5b00 0%, #ff8c1a 35%, #ffc107 65%, #ffd41e 100%)",
  height = 48,
  className = "",
  reverse = false,
}: ScrollMarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? "running" : "paused"
      },
      { threshold: 0 }
    )
    obs.observe(wrap)
    return () => obs.disconnect()
  }, [])

  const content = (
    <span className="scroll-marquee-text">{text}</span>
  )

  const pause = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused" }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running" }

  return (
    <div
      ref={wrapRef}
      className={`scroll-marquee ${className}`}
      style={{ height, background: gradient }}
      aria-hidden="true"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        ref={trackRef}
        className="scroll-marquee-content"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
