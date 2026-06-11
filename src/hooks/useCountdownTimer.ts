"use client"

import { useEffect, useState } from "react"

export interface TimeLeft {
  h: number
  m: number
  s: number
}

const INITIAL_SECONDS = 2 * 3600 + 24 * 60 + 12 // 02:24:12

export function useCountdownTimer(): TimeLeft {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS)

  useEffect(() => {
    const iv = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0))
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  return {
    h: Math.floor(seconds / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: seconds % 60,
  }
}
