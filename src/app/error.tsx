"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  void error
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
      padding: "2rem",
      textAlign: "center",
      fontFamily: "system-ui, sans-serif",
    }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Algo deu errado
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Tente recarregar a página ou volte mais tarde.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          background: "#7C3AED",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Tentar novamente
      </button>
    </div>
  )
}
