import { DonutChart } from "@/components/ui/DonutChart"
import { OFFER } from "@/config/offer"

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
