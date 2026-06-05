import { ShinyButton } from "@/components/ui/ShinyButton"

export function Urgencia() {
  return (
    <section className="urg-section">
      <div className="urg-inner">
        <div className="urg-card">
          <div className="urg-pill">
            <span>&#9889;</span> OPORTUNIDADE ÚNICA
          </div>

          <h2 className="urg-title">
            O que você está<br />
            esperando para<br />
            ter <span className="urg-highlight">atendimentos profissionais</span><br />
            de verdade?
          </h2>

          <p className="urg-text">
            Em poucos minutos você já consegue<br />
            abrir o material e começar a<br />
            aplicar com seus pacientes.
          </p>

          <ShinyButton href="#oferta" className="urg-cta-btn">
            Comece agora
          </ShinyButton>

          <div className="urg-trust">
            <span>&#128274; ACESSO IMEDIATO</span>
            <span>&#128274; ACESSO VITALÍCIO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
