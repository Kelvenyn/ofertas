"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const idleInit = () => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      })

      let rafId: number
      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      cleanupRef.current = () => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
      }
    }

    const hasIdle = "requestIdleCallback" in window
    const id = hasIdle
      ? (window as Window & { requestIdleCallback(cb: () => void, opts: { timeout: number }): number }).requestIdleCallback(idleInit, { timeout: 2000 })
      : setTimeout(idleInit, 100)

    return () => {
      if (hasIdle) (window as Window & { cancelIdleCallback(id: number): void }).cancelIdleCallback(id as number)
      else clearTimeout(id as number)
      cleanupRef.current?.()
    }
  }, [])

  return <>{children}</>
}
