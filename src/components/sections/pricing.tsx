import Link from "next/link"

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-16 text-white"
      style={{
        background: "linear-gradient(#082F63 0%, #0B7FE8 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold text-center sm:text-3xl md:text-4xl">
          Invista no seu Atendimento
        </h2>
        <p className="mt-3 text-center text-base text-white/70 sm:text-lg">
          Comece hoje a ter sessões mais produtivas
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:max-w-4xl md:mx-auto">
          <div className="relative flex flex-col rounded-2xl bg-white p-8 text-dark-blue shadow-lg">
            <h3 className="font-nunito text-xl font-bold">Kit Essencial</h3>
            <div className="mt-4">
              <span className="font-nunito text-4xl font-extrabold text-dark-blue">
                R$ 47
              </span>
              <span className="text-sm text-text-gray">,00</span>
            </div>
            <p className="mt-1 text-xs text-text-gray">ou 12x de R$ 4,70</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-cta">✓</span> +150 atividades
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-cta">✓</span> 2 bônus
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-cta">✓</span> 1 ano de acesso
              </li>
            </ul>

            <Link
              href="#"
              className="mt-8 inline-block w-full rounded-xl py-4 text-center text-base font-bold text-white shadow-lg transition-all hover:scale-105"
              style={{
                background: "linear-gradient(#22C978 0%, #00B368 100%)",
              }}
            >
              QUERO MEU ACESSO
            </Link>
          </div>

          <div
            className="relative flex flex-col rounded-2xl bg-white p-8 text-dark-blue shadow-xl"
            style={{
              border: "2px solid #FFD166",
              transform: "scale(1.02)",
            }}
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-coral px-4 py-1 text-xs font-bold text-white">
              MAIS VENDIDO
            </span>

            <h3 className="font-nunito text-xl font-bold">Kit Completo</h3>
            <div className="mt-4">
              <span className="font-nunito text-4xl font-extrabold text-dark-blue">
                R$ 67
              </span>
              <span className="text-sm text-text-gray">,00</span>
            </div>
            <p className="mt-1 text-xs text-text-gray">ou 12x de R$ 6,70</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-cta">✓</span> +250 atividades
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-cta">✓</span> Todos os 4 bônus
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-cta">✓</span> Acesso vitalício
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-cta">✓</span> Atualizações gratuitas
              </li>
            </ul>

            <Link
              href="#"
              className="mt-8 inline-block w-full rounded-xl py-4 text-center text-base font-bold text-white shadow-lg transition-all hover:scale-105"
              style={{
                background: "linear-gradient(#22C978 0%, #00B368 100%)",
              }}
            >
              QUERO MEU ACESSO
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
