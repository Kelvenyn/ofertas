import type { ReactNode } from "react"
import Link from "next/link"

type LegalPageProps = { title: string; children: ReactNode }

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main style={{ background: "#FFFDF9", minHeight: "100vh", padding: "56px 16px 80px" }}>
      <article style={{ maxWidth: 760, margin: "0 auto", fontFamily: "var(--font-manrope), sans-serif", color: "#312E2A" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", color: "#7F1D1D", fontWeight: 700, fontSize: 14, marginBottom: 32, textDecoration: "none" }}>
          ← Voltar às ofertas
        </Link>
        <h1 style={{ fontFamily: "var(--font-nunito), sans-serif", fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 900, color: "#3B0715", margin: "0 0 8px", lineHeight: 1.1 }}>
          {title}
        </h1>
        <p style={{ color: "#78716C", margin: "0 0 40px", fontSize: 14 }}>Última atualização: 4 de agosto de 2026</p>
        {children}
      </article>
    </main>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "var(--font-nunito), sans-serif", fontSize: 21, fontWeight: 900, color: "#7F1D1D", margin: "0 0 12px" }}>{title}</h2>
      <div style={{ color: "#57534E", fontSize: 15.5, lineHeight: 1.75 }}>{children}</div>
    </section>
  )
}
