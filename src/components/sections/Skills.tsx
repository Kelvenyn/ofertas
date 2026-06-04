const skills = [
  {
    emoji: "🧠",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/1f9e0.svg",
    title: "Jogos de Atenção e Concentração",
    desc: "Atividades lúdicas para estimular foco, controle inibitório e atenção sustentada de forma divertida.",
    colorClass: "azul",
  },
  {
    emoji: "🔍",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/1f50d.svg",
    title: "Memória Visual e Auditiva",
    desc: "Exercícios preparados para desenvolver retenção, associação e memória de curto prazo nas crianças.",
    colorClass: "verde",
  },
  {
    emoji: "✏️",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/270f.svg",
    title: "Consciência Fonológica e Escrita",
    desc: "Materiais para trabalhar leitura, escrita, percepção sonora e desenvolvimento da alfabetização.",
    colorClass: "azul-claro",
  },
  {
    emoji: "🧩",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/1f9e9.svg",
    title: "Sequência Lógica e Raciocínio",
    desc: "Atividades prontas para estimular organização mental, resolução de problemas e pensamento lógico.",
    colorClass: "azul-escuro",
  },
  {
    emoji: "🎨",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/1f3a8.svg",
    title: "Atividades Lúdicas Imprimíveis",
    desc: "Recursos visuais e coloridos que deixam os atendimentos mais leves, interativos e envolventes.",
    colorClass: "verde-profundo",
  },
  {
    emoji: "📋",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/1f4cb.svg",
    title: "Fichas de Aplicação",
    desc: "Materiais organizados para aplicar rapidamente sem precisar criar atividades do zero.",
    colorClass: "azul",
  },
  {
    emoji: "🏡",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/1f3e1.svg",
    title: "Atividades para Casa",
    desc: "Exercícios simples e práticos para reforçar o desenvolvimento da criança fora do atendimento.",
    colorClass: "azul-claro",
  },
  {
    emoji: "⭐",
    emojiSrc: "https://s.w.org/images/core/emoji/17.0.2/svg/2b50.svg",
    title: "Registro de Evolução Psicopedagógica",
    desc: "Ferramentas prontas para acompanhar progresso, organizar observações e facilitar relatórios.",
    colorClass: "destaque",
    seloExtra: true,
  },
]

export function Skills() {
  return (
    <div className="org-anos-wrap">
      <div className="org-anos-inner">
        <div className="org-anos-kicker">Atividades organizadas por habilidade</div>

        <h2 className="org-anos-title">
          <span className="org-title-main">+250 atividades prontas</span>
          <span className="org-title-mid">para atendimentos</span>
          <span className="org-title-highlight">psicopedagógicos infantis</span>
        </h2>

        <div className="org-anos-line"></div>

        <p className="org-anos-sub">
          Encontre rapidamente o recurso ideal para trabalhar atenção, memória, linguagem, escrita,
          raciocínio lógico e outras habilidades importantes durante a sessão.
        </p>

        <div className="org-anos-lista">
          {skills.map((skill, i) => (
            <div className={`org-ano-item ${skill.colorClass}`} key={i}>
              <div className={`org-ano-selo${skill.seloExtra ? " extra" : ""}`}>
                <img
                  draggable="false"
                  role="img"
                  className="emoji"
                  alt={skill.emoji}
                  src={skill.emojiSrc}
                  width={23}
                  height={23}
                />
              </div>
              <div className="org-ano-conteudo">
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
