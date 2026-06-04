export function CTAButton({ text = "QUERO ACESSAR O KIT AGORA" }: { text?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "0 16px" }}>
      <a href="#oferta" className="bonus-badge-link">
        <span className="bonus-badge">{text}</span>
      </a>
    </div>
  )
}
