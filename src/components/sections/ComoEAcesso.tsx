import { OFFER } from "@/config/offer"

function DonutChart({ num, index }: { num: string; index: number }) {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const progress = ((index + 1) / 4) * circumference

  return (
    <div className="cea-donut">
      <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--cta-muted, rgba(34,201,120,0.12))"
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
            <stop offset="100%" stopColor="var(--cta, #00A85A)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="cea-donut-num">{num}</span>
    </div>
  )
}

export function ComoEAcesso() {
  const { title, steps } = OFFER.access
  return (
    <section className="cea-section" aria-labelledby="access-title">
      <div className="cea-inner">
        <h2 className="cea-title" id="access-title">{title}</h2>

        <div className="cea-steps">
          {steps.map((step, i) => (
            <div className="cea-step" key={i}>
              <DonutChart num={step.num} index={i} />
              <div className="cea-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
