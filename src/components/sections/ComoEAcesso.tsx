import { OFFER } from "@/config/offer"

export function ComoEAcesso() {
  const { title, steps } = OFFER.access
  return (
    <section className="cea-section">
      <div className="cea-inner">
        <h2 className="cea-title">{title}</h2>

        <div className="cea-steps">
          {steps.map((step, i) => (
            <div className="cea-step" key={i}>
              <div className="cea-step-num">{step.num}</div>
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
