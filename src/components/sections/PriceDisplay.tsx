export function PriceDisplay() {
  return (
    <div className="dc-wrap" style={{ paddingTop: 0 }}>
      <div className="dc-inner" style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(14px, 4vw, 18px)",
            lineHeight: 1,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "#DC2626",
            marginBottom: "10px",
          }}
        >
          SÓ HOJE
        </div>
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            color: "#5B6B7B",
            marginBottom: "4px",
          }}
        >
          Antes: <span style={{ textDecoration: "line-through" }}>R$47</span>
        </div>
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            color: "#425466",
            marginBottom: "4px",
          }}
        >
          Por apenas:
        </div>
        <div
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 12vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-.05em",
            color: "#0B7FE8",
            textShadow: "0 2px 0 rgba(5,55,125,.10), 0 8px 20px rgba(11,127,232,.12)",
            animation: "pulse 1.6s ease-in-out infinite",
          }}
        >
          R$ 14,90
        </div>
      </div>
    </div>
  )
}
