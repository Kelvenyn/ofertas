"use client"

import { useState } from "react"

const faqs = [
  {
    q: "Como recebo o material?",
    a: "Após a confirmação do pagamento, você receberá o acesso por e-mail e WhatsApp.",
  },
  {
    q: "As atividades são indicadas para qual idade?",
    a: "De 3 a 12 anos, organizadas por faixa etária.",
  },
  {
    q: "Posso usar no consultório e também enviar para casa?",
    a: "Sim! As atividades são licenciadas para uso profissional.",
  },
  {
    q: "Quanto tempo tenho de acesso?",
    a: "O acesso é vitalício com atualizações gratuitas.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia incondicional. Devolvemos 100% do seu dinheiro.",
  },
  {
    q: "O material vem em PDF?",
    a: "Sim, tudo em PDF pronto para imprimir.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-body-bg py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold text-dark-blue text-center sm:text-3xl md:text-4xl">
          Perguntas Frequentes
        </h2>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-primary-blue sm:text-base">
                  {faq.q}
                </span>
                <span
                  className={`ml-4 flex-shrink-0 text-primary-blue transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === i && (
                <div className="border-t px-5 py-4">
                  <p className="text-sm leading-relaxed text-text-gray">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
