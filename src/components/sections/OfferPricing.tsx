import { ShinyButton } from "@/components/ui/ShinyButton"

export function OfferPricing() {
  return (
    <section className="offer-pei-section" id="oferta">
      <div className="offer-pei-container">

        <div className="offer-pei-head">
          <div className="offer-pei-pill">ESCOLHA SUA OPÇÃO</div>

          <h2>
            <span className="offer-main-line">Garanta seu</span>
            <span>NeuroAtividades Kids</span>
          </h2>

          <div className="offer-product-preview">
            <img
              src="/images/4943e9df-5a44-4443-b18d-b7084546bdad.webp"
              alt="NeuroAtividades Kids"
              width={320}
              height={400}
            />
          </div>

          <p>
            Escolha o <strong>Plano Básico</strong> para acessar as atividades principais ou aproveite o
            <strong> Plano Completo</strong> para liberar uma versão mais robusta, com bônus extras,
            fichas de apoio e recursos para organizar melhor seus atendimentos.
          </p>
        </div>

        <div className="offer-pei-grid">

          <div className="offer-card basic-plan">
            <div className="offer-card-top">
              <div className="plan-label basic-label">PARA COMEÇAR HOJE</div>
              <h3>Plano Básico</h3>
              <p>
                Para quem quer acessar as atividades principais e começar a aplicar recursos psicopedagógicos com mais praticidade.
              </p>
            </div>

            <div className="offer-price-block">
              <div className="offer-old-price">de R$ 47,00</div>
              <div className="offer-price">R$ 14,90</div>
              <div className="offer-installments">pagamento único • acesso imediato</div>
            </div>

            <ul className="offer-list">
              <li>+250 atividades psicopedagógicas prontas</li>
              <li>Materiais para atenção, memória, leitura, escrita e raciocínio lógico</li>
              <li>Atividades lúdicas e imprimíveis para atendimentos infantis</li>
              <li>Fichas de aplicação organizadas por habilidade</li>
              <li>Material pronto para baixar, imprimir e aplicar</li>
              <li>Acesso imediato após a compra</li>
              <li className="muted">Não inclui os bônus complementares</li>
              <li className="muted">Não inclui roteiro de sondagem inicial</li>
              <li className="muted">Não inclui registro de evolução psicopedagógica</li>
            </ul>

            <ShinyButton href="https://pay.hotmart.com/I105936984X?off=u2fg19a2&checkoutMode=10" className="offer-btn basic-btn" showArrow={false}>
              QUERO O PLANO BÁSICO
            </ShinyButton>
          </div>

          <div className="offer-card premium-plan">
            <div className="offer-badge">O MAIS ESCOLHIDO</div>

            <div className="offer-card-top">
              <div className="plan-label premium-label">TUDO DESBLOQUEADO</div>
              <h3>Plano Completo</h3>
              <p>
                Para quem quer o acesso mais completo, com atividades, fichas, bônus e recursos extras para conduzir atendimentos com mais organização.
              </p>
            </div>

            <div className="offer-price-block">
              <div className="offer-old-price">de R$ 97,00</div>
              <div className="offer-price">R$ 22,90</div>
              <div className="offer-installments">pagamento único • acesso imediato</div>
            </div>

            <div className="premium-extra-note">
              A opção mais completa para aplicar, estimular, registrar e acompanhar a evolução da criança com mais praticidade
            </div>

            <ul className="offer-list">
              <li><strong>+250 atividades psicopedagógicas prontas</strong></li>
              <li>Atividades para atenção, concentração e controle inibitório</li>
              <li>Recursos para memória visual e auditiva</li>
              <li>Materiais de consciência fonológica, leitura e escrita</li>
              <li>Atividades de sequência lógica e raciocínio</li>
              <li>Fichas de aplicação para atendimentos infantis</li>
              <li>Cartões de Reforço Positivo</li>
              <li>Roteiro de Sondagem Inicial</li>
              <li>Atividades para Enviar para Casa</li>
              <li>Registro de Evolução Psicopedagógica</li>
              <li>Acesso imediato após a compra</li>
            </ul>

            <ShinyButton href="https://pay.hotmart.com/I105936984X?off=fvch2t63&checkoutMode=10" className="offer-btn premium-btn" showArrow={false}>
              QUERO O PLANO COMPLETO
            </ShinyButton>
          </div>

        </div>

        <div className="offer-bottom-info">
          <span>🔒 Compra segura</span>
          <span>⚡ Acesso imediato no WhatsApp e e-mail</span>
          <span>📱 Use no celular ou computador</span>
        </div>

      </div>
    </section>
  )
}
