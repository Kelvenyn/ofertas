"use client"

import { useState } from "react"

const faqs = [
  { q: "Como recebo o material?", a: "Após a confirmação do pagamento, você receberá o acesso por e-mail e WhatsApp com instruções para baixar todo o material." },
  { q: "As atividades são indicadas para qual idade?", a: "De 3 a 12 anos, organizadas por faixa etária (3-5, 5-7, 7-10, 10-12 anos) para facilitar a escolha." },
  { q: "Posso usar no consultório e também enviar para casa?", a: "Sim! As atividades são licenciadas para uso profissional. Você pode aplicar nas sessões e enviar atividades complementares para casa." },
  { q: "Quanto tempo tenho de acesso?", a: "O acesso ao Kit Completo é vitalício com atualizações gratuitas. O Kit Essencial tem acesso por 1 ano." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do seu dinheiro." },
  { q: "O material vem em PDF?", a: "Sim, todo o material está em formato PDF de alta qualidade, pronto para baixar, imprimir e aplicar." },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-12">
          Perguntas Frequentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-4 flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-[#0B7FE8] text-sm md:text-base">
                  {faq.q}
                </span>
                <span className={`text-[#0B7FE8] transition-transform ${openIndex === i ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-[#425466] text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
