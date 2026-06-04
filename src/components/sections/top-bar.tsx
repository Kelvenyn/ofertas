"use client"

import { useEffect, useState } from "react"

export function TopBar() {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary-blue text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold tracking-wide">
      <span>
        ⚡ ATENÇÃO: Acesso promocional disponível HOJE! ⚡
      </span>
      <span className="inline-flex items-center gap-1 ml-3 bg-white/20 rounded-lg px-3 py-1 font-mono tabular-nums">
        <span className="text-yellow-300">{pad(time.hours)}</span>
        <span className="text-white/70">:</span>
        <span className="text-yellow-300">{pad(time.minutes)}</span>
        <span className="text-white/70">:</span>
        <span className="text-yellow-300">{pad(time.seconds)}</span>
      </span>
    </div>
  )
}
