import React from "react"
import { ArrowRight } from "lucide-react"

interface ShinyButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  showArrow?: boolean
  compact?: boolean
}

const ShinyButton: React.FC<ShinyButtonProps> = ({ children, href, onClick, className = "", showArrow = true, compact = false }) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    if (!href?.startsWith("#")) return
    e.preventDefault()
    const target = document.getElementById(href.slice(1))
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={handleAnchorClick}
        className={`shiny-cta group ${compact ? "shiny-cta-sm" : ""} ${className}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-base tracking-wide text-white w-full">
          {children}
          {showArrow && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
        </span>
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`shiny-cta group ${compact ? "shiny-cta-sm" : ""} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-base tracking-wide text-white w-full">
        {children}
        {showArrow && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>
  )
}

export { ShinyButton }
