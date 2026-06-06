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
  const [visible, setVisible] = useState<boolean[]>(Array(items.length).fill(false))
  const [checked, setChecked] = useState<boolean[]>(Array(items.length).fill(false))
  const containerRef = useRef<HTMLDivElement>(null)
  const activatedRef = useRef(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  const startSequence = useCallback(() => {
    if (activatedRef.current) return
    activatedRef.current = true

    if (prefersReducedMotion.current) {
      setVisible(Array(items.length).fill(true))
      setChecked(Array(items.length).fill(true))
      return
    }

    for (let i = 0; i < items.length; i++) {
      const showTime = i * ITEM_DELAY
      const checkTime = showTime + CHECK_DELAY

      const t1 = setTimeout(() => {
        setVisible(prev => { const n = [...prev]; n[i] = true; return n })
      }, showTime)

      const t2 = setTimeout(() => {
        setChecked(prev => { const n = [...prev]; n[i] = true; return n })
      }, checkTime)

      timersRef.current.push(t1, t2)
    }
  }, [items.length])

  useEffect(() => {
    if (!containerRef.current) return
    const timers = timersRef.current
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        startSequence()
        obs.disconnect()
      }
    }, { threshold: 0.3 })
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
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateX(0)" : "translateX(-12px)",
            transition: "opacity 400ms ease-out, transform 400ms ease-out",
          }}
        >
          {icons?.[i] ? (
            <span className="ab-icon">{icons[i]}</span>
          ) : (
            <AnimatedCheck checked={checked[i]} />
          )}
          <span className="ab-text">{item}</span>
        </div>
      ))}
    </div>
  )
}
