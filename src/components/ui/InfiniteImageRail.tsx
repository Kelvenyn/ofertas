"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { KitImage } from "@/types/offer"

const DRAG_MULTIPLIER = 1.8
const SCROLL_SPEED = 0.3

interface InfiniteImageRailProps {
  images: KitImage[]
  orientation: "portrait" | "landscape"
  direction?: "forward" | "reverse"
  heading?: string
  subtitle?: string
}

export function InfiniteImageRail({ images, orientation, direction = "forward", heading, subtitle }: InfiniteImageRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef(0)
  const isDragging = useRef(false)
  const dragStart = useRef(0)
  const dragOffset = useRef(0)
  const autoPlay = useRef(true)
  const initialized = useRef(direction === "forward")
  const isVisible = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [ready, setReady] = useState(false)

  const orderedImages = useMemo(() => direction === "reverse" ? [...images].reverse() : images, [direction, images])
  const repeatedImages = useMemo(() => [...orderedImages, ...orderedImages, ...orderedImages], [orderedImages])

  const getSetWidth = useCallback(() => {
    if (!trackRef.current || !trackRef.current.children.length) return 0
    const count = trackRef.current.children.length / 3
    let width = 0
    for (let index = 0; index < count; index += 1) width += (trackRef.current.children[index] as HTMLElement).offsetWidth
    const gap = Number.parseFloat(getComputedStyle(trackRef.current).columnGap) || 0
    return width + Math.max(0, count - 1) * gap
  }, [])

  const animate = useCallback(function loop() {
    const track = trackRef.current
    if (!track || !isVisible.current || document.hidden) {
      rafRef.current = 0
      return
    }
    const setWidth = getSetWidth()

    if (setWidth > 0 && !initialized.current) {
      offsetRef.current = -setWidth
      initialized.current = true
      setReady(true)
    }

    if (setWidth > 0 && autoPlay.current && !isDragging.current && isVisible.current && !document.hidden) {
      offsetRef.current += direction === "reverse" ? SCROLL_SPEED : -SCROLL_SPEED
    }

    if (setWidth > 0) {
      if (offsetRef.current >= 0) offsetRef.current -= setWidth
      if (offsetRef.current <= -setWidth - 1) offsetRef.current += setWidth
    }
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    rafRef.current = requestAnimationFrame(loop)
  }, [direction, getSetWidth])

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting
      if (entry.isIntersecting && rafRef.current === 0 && !document.hidden) {
        rafRef.current = requestAnimationFrame(animate)
      } else if (!entry.isIntersecting && rafRef.current !== 0) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }, { rootMargin: "160px 0px", threshold: 0 })
    observer.observe(element)

    const onVisibilityChange = () => {
      if (document.hidden && rafRef.current !== 0) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      } else if (!document.hidden && isVisible.current && rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (rafRef.current !== 0) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  useEffect(() => {
    const firstImage = trackRef.current?.querySelector<HTMLImageElement>(".kc-card-img")
    if (firstImage?.complete && firstImage.naturalWidth > 0) setReady(true)
  }, [images, direction])

  if (images.length === 0) return null

  function pauseAndResume() {
    autoPlay.current = false
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => { autoPlay.current = true }, 2500)
  }

  function startDrag(clientX: number) {
    isDragging.current = true
    dragStart.current = clientX
    dragOffset.current = offsetRef.current
    pauseAndResume()
  }

  function moveDrag(clientX: number) {
    if (isDragging.current) offsetRef.current = dragOffset.current + (clientX - dragStart.current) * DRAG_MULTIPLIER
  }

  function endDrag() {
    isDragging.current = false
    pauseAndResume()
  }

  return (
    <div className={`kc-section${direction === "reverse" ? " kc-section-rev" : ""}`} ref={sectionRef} aria-labelledby={heading ? "kit-title" : undefined}>
      {heading && <div className="kc-inner"><h2 className="kc-title" id="kit-title">{heading}</h2>{subtitle && <p className="kc-subtitle">{subtitle}</p>}</div>}
      <div
        className="kc-carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Prévia dos materiais"
        tabIndex={0}
        onMouseDown={(event) => { event.preventDefault(); startDrag(event.clientX) }}
        onMouseMove={(event) => moveDrag(event.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={() => { if (isDragging.current) endDrag() }}
        onTouchStart={(event) => startDrag(event.touches[0].clientX)}
        onTouchMove={(event) => moveDrag(event.touches[0].clientX)}
        onTouchEnd={endDrag}
        onKeyDown={(event) => {
          const directionMultiplier = direction === "reverse" ? -1 : 1
          if (event.key === "ArrowLeft") { offsetRef.current += 300 * directionMultiplier; pauseAndResume() }
          if (event.key === "ArrowRight") { offsetRef.current -= 300 * directionMultiplier; pauseAndResume() }
        }}
      >
        <div ref={trackRef} className="kc-track" style={{ opacity: ready ? 1 : 0, transition: "opacity 400ms ease" }}>
          {repeatedImages.map((image, index) => (
            <div
              className={`kc-card${orientation === "portrait" ? " kc-card-portrait" : " kc-card-landscape"}`}
              key={`${image.src}-${index}`}
              style={{ aspectRatio: orientation === "portrait" ? "3 / 4" : "3 / 2" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={orientation === "portrait" ? 300 : 280}
                height={orientation === "portrait" ? 400 : 210}
                className="kc-card-img"
                data-kc-src={image.src}
                sizes="(max-width: 570px) 100vw, (max-width: 1312px) 420px, (max-width: 1499px) 32vw, 480px"
                loading={index === 0 ? "eager" : "lazy"}
                quality={75}
                onLoad={() => { if (index === 0) setReady(true) }}
                onError={() => { if (index === 0) setReady(true) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
