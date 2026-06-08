"use client"

import { useEffect, useRef, useState } from "react"
import { OFFER } from "@/config/offer"

export function CounterPainPoints() {
  const { prefix, target, label } = OFFER.counter
  const [count, setCount] = useState(0)
  const [barWidth, setBarWidth] = useState("0%")
  const counterRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = counterRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animated.current) {
            animated.current = true
            const duration = 1800
            let start: number | null = null

            function animate(ts: number) {
              if (!start) start = ts
              const p = Math.min((ts - start) / duration, 1)
              const ease = 1 - Math.pow(1 - p, 3)
              const val = Math.floor(ease * target)

              setCount(val)
              setBarWidth(`${ease * 100}%`)

              if (p < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(target)
                setBarWidth("100%")
              }
            }

            requestAnimationFrame(animate)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.35 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <div className="dc-wrap" ref={counterRef} id="docs-counter" aria-labelledby="counter-label">
      <div className="dc-inner">
        <div className="dc-numberline">
          <span className="dc-prefix">{prefix}</span>
          <span className="dc-count" id="dc-count" aria-live="polite" aria-atomic="true">
            {count}
          </span>
          <span className="dc-label" id="counter-label">{label}</span>
        </div>

        <div className="dc-bar" role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={target}>
          <div className="dc-fill" style={{ width: barWidth }}></div>
        </div>
      </div>
    </div>
  )
}
