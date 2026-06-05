import { CreditCard, Mail, Download, Sparkles } from "lucide-react"
import { OFFER } from "@/config/offer"

const STEP_ICONS = [CreditCard, Mail, Download, Sparkles]
const STEP_COLORS = ["#0B7FE8", "#22C978", "#FF8A5B", "#8B5CF6"]

export function ComoEAcesso() {
  const { title, steps } = OFFER.access
  return (
    <section className="cea-section" aria-labelledby="access-title">
      <div className="cea-inner">
        <h2 className="cea-title" id="access-title">{title}</h2>

        <div className="cea-grid">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i]
            const color = STEP_COLORS[i]
            return (
              <div className="cea-card" key={i} style={{ "--step-color": color } as React.CSSProperties}>
                <div className="cea-card-icon" style={{ background: `${color}18`, color }}>
                  <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="cea-card-title">{step.title}</h3>
                <p className="cea-card-desc">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
