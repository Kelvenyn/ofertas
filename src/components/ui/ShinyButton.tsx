"use client"

import React from "react"
import { ArrowRight } from "lucide-react"

interface ShinyButtonProps {
  children: React.ReactNode
  href?: string
  className?: string
  showArrow?: boolean
  compact?: boolean
}

export function ShinyButton({ children, href, className = "", showArrow = true, compact = false }: ShinyButtonProps) {
  const Tag = href ? "a" : "button"
  return (
    <Tag
      href={href}
      className={`shiny-cta group ${compact ? "shiny-cta-sm" : ""} ${className}`}
      {...(href ? { target: "_self" } : {})}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-base tracking-wide text-white w-full">
        {children}
        {showArrow && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </Tag>
  )
}
