"use client"

import { useState } from "react"

const faqItems = [
  {
    q: "Como recebo o material após a compra?",
    a: "Após a confirmação do pagamento, você recebe o link de acesso no e-mail cadastrado e também no WhatsApp. Basta clicar e fazer o download.",
  },
  {
    q: "O material é indicado para qual faixa etária?",
    a: "As atividades são voltadas para crianças em fase de alfabetização e desenvolvimento infantil, aproximadamente dos 4 aos 12 anos, podendo ser adaptadas conforme a necessidade.",
  },
  {
    q: "Posso imprimir as atividades quantas vezes quiser?",
    a: "Sim! Ao adquirir o material, você tem acesso vitalício e pode imprimir quantas vezes precisar para usar com seus pacientes.",
  },
  {
    q: "O material atende diferentes habilidades?",
    a: "Sim. As atividades são organizadas por habilidade (atenção, memória, leitura, escrita, raciocínio lógico, etc.), facilitando a escolha do recurso ideal para cada momento.",
  },
  {
    q: "E se eu não gostar do material?",
    a: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="faq-acc-wrap">
      <div className="faq-acc-inner">
        <h2 className="faq-acc-title">Perguntas Frequentes</h2>

        <div className="faq-acc-list">
          {faqItems.map((item, i) => (
            <div
              className={`faq-acc-item${openIndex === i ? " open" : ""}`}
              key={i}
            >
              <button
                className="faq-acc-btn"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-acc-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <div className="faq-acc-panel">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
