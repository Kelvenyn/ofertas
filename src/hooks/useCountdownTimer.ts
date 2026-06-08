"use client"

import { useEffect, useState } from "react"

export interface TimeLeft {
  h: number
  m: number
  s: number
}

const getTimeUntilMidnight = () => {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  const diff = tomorrow.getTime() - now.getTime()
  return {
    h: Math.floor(diff / (1000 * 60 * 60)),
    m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

export function useCountdownTimer(): TimeLeft {
  const [time, setTime] = useState<TimeLeft>(getTimeUntilMidnight)

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
