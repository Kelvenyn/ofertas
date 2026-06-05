import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}

export function IconBrain({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <path d="M9.5 2C7 2 5 4 5 6.5c0 .8.2 1.5.5 2.1C4 9.3 3 10.8 3 12.5 3 15 4.8 17 7 17.4V19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1.6c2.2-.4 4-2.4 4-4.9 0-1.7-1-3.2-2.5-3.9.3-.6.5-1.3.5-2.1C19 4 17 2 14.5 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 10c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-2Z" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M12 13v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </Icon>
  )
}

export function IconSearch({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </Icon>
  )
}

export function IconPencil({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <path d="M12 20h9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 5l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </Icon>
  )
}

export function IconPuzzle({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <path d="M19.5 12h-1a1.5 1.5 0 0 1 0-3h1V5a2 2 0 0 0-2-2h-3.5v1a1.5 1.5 0 0 1-3 0V3H7a2 2 0 0 0-2 2v3.5h1a1.5 1.5 0 0 1 0 3H5V16a2 2 0 0 0 2 2h3.5v-1a1.5 1.5 0 0 1 3 0v1H17a2 2 0 0 0 2-2v-4Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    </Icon>
  )
}

export function IconTarget({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.75"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </Icon>
  )
}

export function IconGamepad({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <rect x="2" y="7" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M7 11v4M5 13h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <circle cx="16" cy="11.5" r="1" fill="currentColor"/>
      <circle cx="19" cy="13.5" r="1" fill="currentColor"/>
      <path d="M8 4h8l1 3H7L8 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    </Icon>
  )
}

export function IconLightning({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <path d="M13 2 4.09 12.96A.5.5 0 0 0 4.5 13.75H11l-2 8.25L19.91 11.04A.5.5 0 0 0 19.5 10.25H13L13 2Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  )
}

export function IconChart({ size, ...props }: IconProps) {
  return (
    <Icon size={size} {...props}>
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M7 20V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M12 20V6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M17 20v-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <circle cx="7" cy="9" r="1.25" fill="currentColor"/>
      <circle cx="12" cy="5" r="1.25" fill="currentColor"/>
      <circle cx="17" cy="15" r="1.25" fill="currentColor"/>
    </Icon>
  )
}

export const ICON_MAP = {
  brain: IconBrain,
  search: IconSearch,
  pencil: IconPencil,
  puzzle: IconPuzzle,
  target: IconTarget,
  gamepad: IconGamepad,
  lightning: IconLightning,
  chart: IconChart,
} as const

export type IconName = keyof typeof ICON_MAP

export function DynamicIcon({ name, size, className }: { name: IconName; size?: number; className?: string }) {
  const Component = ICON_MAP[name]
  return <Component size={size} className={className} />
}
