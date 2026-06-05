"use client"

import { useEffect, useState } from "react"

export interface TimeLeft {
  h: number
  m: number
  s: number
}

function getTimeUntilMidnight(): TimeLeft {
  const now = new Date()
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  const diff = Math.max(0, end.getTime() - now.getTime())
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

export function useCountdownTimer(): TimeLeft {
  const [time, setTime] = useState<TimeLeft>({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const id = setTimeout(() => setTime(getTimeUntilMidnight()), 0)
    const iv = setInterval(() => setTime(getTimeUntilMidnight()), 1000)
    return () => {
      clearTimeout(id)
      clearInterval(iv)
    }
  }, [])

  return time
}
