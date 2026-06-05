import {
  Brain,
  Search,
  PenLine,
  Puzzle,
  Target,
  Gamepad2,
  Zap,
  BarChart3,
} from "lucide-react"
import type { LucideProps } from "lucide-react"

type IconProps = Omit<LucideProps, "ref"> & { size?: number }

export const ICON_MAP = {
  brain: Brain,
  search: Search,
  pencil: PenLine,
  puzzle: Puzzle,
  target: Target,
  gamepad: Gamepad2,
  lightning: Zap,
  chart: BarChart3,
} as const

export type IconName = keyof typeof ICON_MAP

export function DynamicIcon({ name, size = 24, className, ...props }: IconProps & { name: IconName }) {
  const Component = ICON_MAP[name]
  return (
    <Component
      size={size}
      className={className}
      strokeWidth={1.75}
      aria-hidden="true"
      focusable={false}
      {...props}
    />
  )
}
