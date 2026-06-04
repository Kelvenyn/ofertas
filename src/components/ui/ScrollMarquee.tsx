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
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    let pos = 0
    let raf: number
    let lastTime = 0

    const speed = 80

    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      const dt = (time - lastTime) / 1000
      lastTime = time

      const dir = reverse ? 1 : -1
      pos += speed * dt * dir

      const contentWidth = content.scrollWidth / 2
      if (!reverse && pos <= -contentWidth) pos += contentWidth
      if (reverse && pos >= 0) pos -= contentWidth

      content.style.transform = `translateX(${pos}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [reverse])

  const content = (
    <span className="scroll-marquee-text">{text}</span>
  )

  return (
    <div
      ref={containerRef}
      className={`scroll-marquee ${className}`}
      style={{ height, background: gradient }}
    >
      <div ref={contentRef} className="scroll-marquee-content">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
