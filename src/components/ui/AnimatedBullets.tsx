"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface AnimatedBulletsProps {
  items: string[]
  icons?: string[]
  className?: string
}

const ITEM_DELAY = 180
const CHECK_DELAY = 600

function AnimatedCheck({ checked }: { checked: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle
        cx="20" cy="20" r="18"
        fill={checked ? "var(--cta, #22c55e)" : "var(--cta-muted, rgba(34,197,94,0.15))"}
        style={{ transition: "fill 0.5s ease" }}
      />
      <polyline
        points="12,20 18,26 28,14"
        fill="none"
        stroke="var(--surface, #ffffff)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="22"
        strokeDashoffset={checked ? 0 : 22}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  )
}

export function AnimatedBullets({ items, icons, className = "" }: AnimatedBulletsProps) {
  const [animated, setAnimated] = useState<boolean[]>(Array(items.length).fill(false))
  const containerRef = useRef<HTMLDivElement>(null)
  const activatedRef = useRef(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const [prefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  )

  const startSequence = useCallback(() => {
    if (activatedRef.current) return
    activatedRef.current = true

    if (prefersReducedMotion) {
      setAnimated(Array(items.length).fill(true))
      return
    }

    for (let i = 0; i < items.length; i++) {
      const t = setTimeout(() => {
        setAnimated(prev => { const n = [...prev]; n[i] = true; return n })
      }, i * ITEM_DELAY)
      timersRef.current.push(t)
    }
  }, [items.length, prefersReducedMotion])

  useEffect(() => {
    if (!containerRef.current) return
    const timers = timersRef.current
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        startSequence()
        obs.disconnect()
      }
    }, { threshold: 0.25 })
    obs.observe(containerRef.current)
    return () => {
      obs.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [startSequence])

  return (
    <div ref={containerRef} className={`ab-list ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="ab-item"
          style={{
            opacity: animated[i] ? 1 : 0,
            transform: animated[i] ? "translateX(0)" : "translateX(-12px)",
            transition: "opacity 500ms ease-out, transform 500ms ease-out",
            transitionDelay: animated[i] ? `${i * 60}ms` : "0ms",
          }}
        >
          {icons?.[i] ? (
            <span className="ab-icon">{icons[i]}</span>
          ) : (
            <AnimatedCheck checked={animated[i]} />
          )}
          <span className="ab-text">{item}</span>
        </div>
      ))}
    </div>
  )
}
