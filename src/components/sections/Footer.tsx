export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0B7FE8] to-[#065CB6] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="font-nunito font-bold text-xl mb-2">NeuroAtividades Kids</div>
        <p className="text-sm text-white/70 mb-4">
          © 2026 NeuroAtividades Kids. Todos os direitos reservados.
        </p>
        <div className="flex justify-center gap-4 text-sm text-white/60 mb-4">
          <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
        <p className="text-xs text-white/50">
          🔒 Compra 100% Segura • CNPJ: XX.XXX.XXX/XXXX-XX
        </p>
      </div>
    </footer>
  )
}
