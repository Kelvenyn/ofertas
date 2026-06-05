"use client"

import { useRef } from "react"
import { OFFER } from "@/config/offer"

export function SocialProof() {
  const testimonials = OFFER.socialProof.testimonials
  const trackRef = useRef<HTMLDivElement>(null)

  const pause = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused" }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running" }

  return (
    <section className="sp-section">
      <div className="sp-inner">
        <h2 className="sp-title">O que estão dizendo</h2>
      </div>

      <div className="sp-marquee-wrap" onMouseEnter={pause} onMouseLeave={resume}>
        <div className="sp-marquee-track" ref={trackRef}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="sp-card">
              <div className="sp-card-top" style={{ background: t.gradient }} />
              <img
                src={t.src}
                alt={t.alt}
                className="sp-card-img"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
