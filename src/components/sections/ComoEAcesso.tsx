import { CreditCard, Mail, Download, CheckCircle } from "lucide-react"
import { OFFER } from "@/config/offer"

const STEP_ICONS = [CreditCard, Mail, Download, CheckCircle]

export function ComoEAcesso() {
  const { title, steps } = OFFER.access
  return (
    <section className="cea-section" aria-labelledby="access-title">
      <div className="cea-inner">
        <h2 className="cea-title" id="access-title">{title}</h2>

        <div className="cea-grid">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <div className="cea-card" key={i}>
                <div className="cea-card-num">{step.num}</div>
                <div className="cea-card-icon">
                  <Icon size={32} strokeWidth={1.75} aria-hidden="true" />
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
