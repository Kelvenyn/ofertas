interface DonutChartProps {
  num: string
  index: number
  total?: number
}

export function DonutChart({ num, index, total = 4 }: DonutChartProps) {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const progress = ((index + 1) / total) * circumference

  return (
    <div className="cea-donut">
      <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--cta-muted)"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="url(#cea-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform="rotate(-90 32 32)"
        />
        <defs>
          <linearGradient id="cea-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--cta-light, #22C978)" />
            <stop offset="100%" stopColor="var(--cta)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="cea-donut-num">{num}</span>
    </div>
  )
}
