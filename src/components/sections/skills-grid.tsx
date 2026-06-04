export function SkillsGrid() {
  const skills = [
    { icon: "🧠", name: "Atenção e Foco" },
    { icon: "🔍", name: "Percepção Visual" },
    { icon: "✏️", name: "Coordenação Motora" },
    { icon: "🧩", name: "Raciocínio Lógico" },
    { icon: "🎨", name: "Criatividade" },
    { icon: "📋", name: "Leitura e Escrita" },
    { icon: "🏡", name: "Atividades para Casa" },
    { icon: "⭐", name: "Todas as Habilidades" },
  ]

  return (
    <section id="skills" className="bg-[#F3F8FF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold text-dark-blue text-center sm:text-3xl md:text-4xl">
          Atividades Organizadas por Habilidade
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-6 text-center shadow-md transition-transform hover:scale-105"
            >
              <span className="text-4xl">{skill.icon}</span>
              <h3 className="mt-4 font-nunito text-lg font-bold text-dark-blue">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
