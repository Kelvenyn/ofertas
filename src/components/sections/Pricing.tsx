export function Pricing() {
  return (
    <section id="oferta" className="bg-gradient-to-b from-[#082F63] to-[#0B7FE8] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
          Garanta seu NeuroAtividades Kids
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Kit Essencial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="font-nunito font-bold text-xl text-[#123A6D] mb-2">Kit Essencial</h3>
            <div className="text-4xl font-nunito font-extrabold text-[#0B7FE8] mb-1">
              R$ 47
            </div>
            <p className="text-xs text-[#5B6B7B] mb-6">ou 12x de R$ 4,70</p>
            <ul className="text-left text-sm text-[#425466] space-y-3 mb-8">
              <li className="flex items-start gap-2"><span className="text-[#0BB869]">✓</span> +150 atividades psicopedagógicas</li>
              <li className="flex items-start gap-2"><span className="text-[#0BB869]">✓</span> 2 bônus exclusivos</li>
              <li className="flex items-start gap-2"><span className="text-[#0BB869]">✓</span> 1 ano de acesso</li>
            </ul>
            <a
              href="#"
              className="block w-full bg-gradient-to-b from-[#22C978] to-[#00B368] text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all"
            >
              QUERO O KIT ESSENCIAL
            </a>
          </div>

          {/* Kit Completo */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-[#FFD166] relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF8A5B] text-white text-xs font-bold px-4 py-1 rounded-full">
              MAIS VENDIDO
            </span>
            <h3 className="font-nunito font-bold text-xl text-[#123A6D] mb-2">Kit Completo</h3>
            <div className="text-4xl font-nunito font-extrabold text-[#0B7FE8] mb-1">
              R$ 67
            </div>
            <p className="text-xs text-[#5B6B7B] mb-6">ou 12x de R$ 6,70</p>
            <ul className="text-left text-sm text-[#425466] space-y-3 mb-8">
              <li className="flex items-start gap-2"><span className="text-[#0BB869]">✓</span> +250 atividades psicopedagógicas</li>
              <li className="flex items-start gap-2"><span className="text-[#0BB869]">✓</span> Todos os 4 bônus exclusivos</li>
              <li className="flex items-start gap-2"><span className="text-[#0BB869]">✓</span> Acesso vitalício</li>
              <li className="flex items-start gap-2"><span className="text-[#0BB869]">✓</span> Atualizações gratuitas</li>
            </ul>
            <a
              href="#"
              className="block w-full bg-gradient-to-b from-[#22C978] to-[#00B368] text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all"
            >
              QUERO O KIT COMPLETO
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
