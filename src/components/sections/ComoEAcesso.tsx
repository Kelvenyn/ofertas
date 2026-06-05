import { OFFER } from "@/config/offer"

function DonutChart({ num, index }: { num: string; index: number }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const progress = ((index + 1) / 4) * circumference

  return (
    <div className="cea-donut">
      <svg viewBox="0 0 72 72" width="72" height="72">
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="5"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="url(#donut-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform="rotate(-90 36 36)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient id="donut-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#FF8A5B" />
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
    <section className="cea-section">
      <div className="cea-inner">
        <h2 className="cea-title">{title}</h2>

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
