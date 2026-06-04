const items = [
  "deseja ter atividades prontas sem precisar criar do zero para cada atendimento",
  "quer oferecer sessões mais lúdicas e envolventes para as crianças",
  "precisa de recursos organizados por habilidade para aplicar com mais rapidez",
  "busca praticidade no dia a dia clínico sem perder a qualidade do atendimento",
  "deseja acompanhar a evolução dos seus pacientes com fichas e registros prontos",
  "quer um material completo que funciona tanto no consultório quanto para envio para casa",
]

export function IdealParaVoce() {
  return (
    <div style={{ padding: "36px 16px 40px", background: "transparent" }}>
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 16px",
            borderRadius: "999px",
            background: "#EAF5FF",
            border: "1px solid rgba(11,127,232,.20)",
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: "12px",
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "#0B7FE8",
            marginBottom: "16px",
          }}
        >
          É PARA VOCÊ
        </div>

        <h2
          style={{
            margin: "0 0 8px",
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: "clamp(26px, 5.8vw, 38px)",
            lineHeight: 1.08,
            fontWeight: 900,
            letterSpacing: "-.05em",
            color: "#082F63",
          }}
        >
          Ideal para você que…
        </h2>

        <p
          style={{
            margin: "0 0 22px",
            fontSize: "16px",
            lineHeight: 1.7,
            fontWeight: 500,
            color: "#425466",
          }}
        >
          Este material foi pensado para psicopedagogos, terapeutas e educadores que atuam com
          crianças e buscam mais organização, praticidade e resultados nos atendimentos.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "16px 18px",
                borderRadius: "24px",
                background: "#FFFFFF",
                border: "1px solid rgba(11,127,232,.12)",
                boxShadow: "0 10px 24px rgba(11,127,232,.06)",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  minWidth: "24px",
                  borderRadius: "999px",
                  background: "#0B7FE8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 900,
                  marginTop: "1px",
                }}
              >
                ✓
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.55,
                  fontWeight: 500,
                  color: "#425466",
                }}
              >
                …{item}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
