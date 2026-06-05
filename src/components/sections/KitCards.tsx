"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { OFFER } from "@/config/offer"

export function KitCards() {
  const { heading1, images } = OFFER.kitCards
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? "running" : "paused"
      },
      { threshold: 0 }
    )
    obs.observe(wrap)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="bloco-categoria-interpretacao">
      <div className="bloco-categoria-inner">
        <div className="cat-topo-interpretacao">
          <div className="cat-titulo-interpretacao">
            <span className="cat-heading-principal">{heading1}</span>
          </div>
        </div>

        <div className="esteira-interpretacao-wrap" ref={wrapRef}>
          <div className="esteira-interpretacao">
            <div className="esteira-interpretacao-track" ref={trackRef}>
              {[...images, ...images].map((img, i) => (
                <div className="esteira-interpretacao-img" key={i}>
                  <Image src={img.src} alt={img.alt} width={200} height={280} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
