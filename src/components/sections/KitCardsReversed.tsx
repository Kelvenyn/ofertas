"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { OFFER } from "@/config/offer"

const DRAG_MULTIPLIER = 1.8
const SCROLL_SPEED = 0.6

export function KitCardsReversed() {
  const { heading1, heading2, images } = OFFER.kitCards
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number>(0)
  const isDragging = useRef(false)
  const dragStart = useRef(0)
  const dragOffset = useRef(0)
  const autoPlay = useRef(true)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [loaded, setLoaded] = useState(false)

  const reversedImages = useMemo(() => [...images].reverse(), [images])
  const allImages = useMemo(() => [...reversedImages, ...reversedImages, ...reversedImages], [reversedImages])

  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const animate = useCallback(function rafLoop() {
    if (!trackRef.current) return
    if (autoPlay.current && !isDragging.current && isVisibleRef.current && !document.hidden) {
      offsetRef.current += SCROLL_SPEED
    }

    const track = trackRef.current
    const singleSetWidth = track.scrollWidth / 3

    if (offsetRef.current >= singleSetWidth) {
      offsetRef.current -= singleSetWidth
    }
    if (offsetRef.current < 0) {
      offsetRef.current += singleSetWidth
    }

    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    rafRef.current = requestAnimationFrame(rafLoop)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  const handleDragStart = useCallback((clientX: number) => {
    isDragging.current = true
    dragStart.current = clientX
    dragOffset.current = offsetRef.current
    autoPlay.current = false
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }, [])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging.current) return
    const delta = (clientX - dragStart.current) * DRAG_MULTIPLIER
    offsetRef.current = dragOffset.current + delta
  }, [])

  const handleDragEnd = useCallback(() => {
    isDragging.current = false
    resumeTimer.current = setTimeout(() => {
      autoPlay.current = true
    }, 2000)
  }, [])

  if (!images || images.length === 0) return null

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); handleDragStart(e.clientX) }
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX)
  const onMouseUp = () => handleDragEnd()
  const onMouseLeave = () => { if (isDragging.current) handleDragEnd() }
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX)
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX)
  const onTouchEnd = () => handleDragEnd()

  return (
    <div className="kc-section" aria-labelledby="kit-title-rev" ref={sectionRef}>
      <div
        className="kc-carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Kit de materiais"
        tabIndex={0}
        style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            autoPlay.current = false
            offsetRef.current -= 300
            if (resumeTimer.current) clearTimeout(resumeTimer.current)
            resumeTimer.current = setTimeout(() => { autoPlay.current = true }, 3000)
          } else if (e.key === "ArrowRight") {
            autoPlay.current = false
            offsetRef.current += 300
            if (resumeTimer.current) clearTimeout(resumeTimer.current)
            resumeTimer.current = setTimeout(() => { autoPlay.current = true }, 3000)
          }
        }}
      >
        <div
          ref={trackRef}
          className="kc-track"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 400ms ease" }}
        >
          {allImages.map((img, i) => (
            <div className="kc-card" key={i}>
              <Image
                src={img.src}
                alt={img.alt}
                width={280}
                height={400}
                className="kc-card-img"
                loading={i === 0 ? "eager" : "lazy"}
                onLoad={() => { if (i === 0) setLoaded(true) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
