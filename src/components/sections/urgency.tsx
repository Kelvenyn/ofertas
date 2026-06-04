"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Urgency() {
  const [time, setTime] = useState({ hours: 11, minutes: 59, seconds: 59 })

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
    <section
      id="urgency"
      className="py-16 text-white text-center"
      style={{
        background: "linear-gradient(#DC2626 0%, #FF8A5B 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold sm:text-3xl md:text-4xl">
          ⚠️ Condição Especial Disponível SOMENTE HOJE!
        </h2>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="animate-pulse rounded-xl bg-white/20 px-6 py-3">
            <span className="font-nunito text-4xl font-extrabold sm:text-5xl">
              {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
            </span>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg">
          O preço promocional pode ser alterado a qualquer momento. Garanta seu
          acesso agora!
        </p>

        <Link
          href="#pricing"
          className="mt-8 inline-block rounded-xl bg-white px-10 py-4 text-base font-bold text-red-600 shadow-lg transition-all hover:scale-105 sm:text-lg"
        >
          GARANTIR MEU ACESSO AGORA
        </Link>
      </div>
    </section>
  )
}
