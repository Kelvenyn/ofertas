"use client"

import { useEffect, useState } from "react"

export function TopTimer() {
  const [time, setTime] = useState("")

  useEffect(() => {
    function update() {
      const agora = new Date()
      const fimDoDia = new Date()
      fimDoDia.setHours(23, 59, 59, 999)
      let diff = fimDoDia.getTime() - agora.getTime()

      if (diff <= 0) {
        setTime("00h 00m 00s")
        return
      }

      const horas = Math.floor(diff / (1000 * 60 * 60))
      diff -= horas * 1000 * 60 * 60
      const minutos = Math.floor(diff / (1000 * 60))
      diff -= minutos * 1000 * 60
      const segundos = Math.floor(diff / 1000)

      setTime(
        `${String(horas).padStart(2, "0")}h ${String(minutos).padStart(2, "0")}m ${String(segundos).padStart(2, "0")}s`
      )
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pk-top-timer" id="pkTopCountdownTimer">
      <div className="pk-top-timer-inner">
        <div className="pk-top-timer-label">
          <img
            draggable="false"
            role="img"
            className="emoji"
            alt="✨"
            src="https://s.w.org/images/core/emoji/17.0.2/svg/2728.svg"
            width={10}
            height={10}
            style={{ margin: "0 0.735px", width: 10.5, height: 10.5 }}
          />
          &nbsp;Acesso promocional disponível hoje
        </div>
        <div className="pk-top-timer-line">
          <span>Termina em</span>
          <strong>{time}</strong>
        </div>
      </div>
    </div>
  )
}
