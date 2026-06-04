import { ShinyButton } from "@/components/ui/ShinyButton"

export function Urgencia() {
  return (
    <section className="urg-section">
      <div className="urg-inner">
        <div className="urg-card">
          <div className="urg-glow" />

          <div className="urg-pill">
            <span className="urg-pill-icon">&#9889;</span>
            OPORTUNIDADE ÚNICA
          </div>

          <h2 className="urg-title">
            O que você está<br />
            esperando para<br />
            ter <span className="urg-highlight">atendimentos profissionais</span><br />
            de verdade?
          </h2>

          <div className="urg-dots">
            <span className="urg-dot" />
            <span className="urg-dot urg-dot-active" />
            <span className="urg-dot" />
          </div>

          <p className="urg-text">
            Em poucos minutos você já consegue<br />
            abrir o material e começar a<br />
            aplicar com seus pacientes.
          </p>

          <div className="urg-cta-wrap">
            <ShinyButton href="#oferta" className="urg-cta-btn">
              Comece agora
            </ShinyButton>
          </div>

          <div className="urg-trust">
            <span>ACESSO IMEDIATO</span>
            <span className="urg-trust-sep">&bull;</span>
            <span>ACESSO VITALÍCIO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
