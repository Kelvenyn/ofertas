// tracker.js (hub) carrega via next/script strategy="afterInteractive" (assíncrono) — no
// primeiro render, window.trackhub pode ainda não existir. trackEvent espera até 3s antes de
// desistir, em vez de deixar a chamada virar no-op silencioso (era o caso do ViewContent).
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  const attempt = (retriesLeft: number) => {
    if (window.trackhub) {
      void window.trackhub.track(eventName, params)
      return
    }
    if (retriesLeft <= 0) return
    setTimeout(() => attempt(retriesLeft - 1), 150)
  }
  attempt(20)
}
