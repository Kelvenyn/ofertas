import Link from "next/link"

export function Footer() {
  return (
    <footer
      className="py-12 text-white text-center"
      style={{
        background: "linear-gradient(#0B7FE8 0%, #065CB6 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-nunito text-2xl font-bold">NeuroAtividades Kids</p>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
          <span>🔒</span>
          <span>Compra 100% Segura</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
          <Link href="#" className="hover:text-white transition-colors">
            Política de Privacidade
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:text-white transition-colors">
            Termos de Uso
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/60">
          © 2026 NeuroAtividades Kids. Todos os direitos reservados.
        </p>
        <p className="mt-1 text-xs text-white/50">
          CNPJ: XX.XXX.XXX/XXXX-XX
        </p>
      </div>
    </footer>
  )
}
