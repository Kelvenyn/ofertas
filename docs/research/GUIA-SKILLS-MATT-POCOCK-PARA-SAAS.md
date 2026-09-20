# Guia didático: skills do Matt Pocock para construir SaaS

Este guia escolhe cinco skills do catálogo [mattpocock/skills](https://github.com/mattpocock/skills) para formar um fluxo de trabalho útil em projetos SaaS. A seleção cobre entendimento, planejamento, implementação, diagnóstico e revisão. A ideia do autor é que as skills sejam pequenas e combináveis, e que você escolha as que resolvem problemas reais do seu fluxo em vez de instalar tudo. [README do projeto](https://github.com/mattpocock/skills#readme)

## O que é uma skill

Uma skill é um conjunto de instruções especializado que orienta o agente em uma tarefa recorrente. Algumas você chama pelo nome, como `/grill-with-docs` ou `/to-spec`; outras podem ser acionadas pelo agente quando a descrição combina com o trabalho, como `tdd` e `diagnosing-bugs`. O README separa esses dois tipos como *user-invoked* e *model-invoked*. [Referência do projeto](https://github.com/mattpocock/skills#reference)

Pense nela como um procedimento reutilizável, não como um produto que faz o trabalho sozinho. Você ainda decide o que construir e avalia o resultado. A skill ajuda a conversa e a execução a seguirem um método consistente.

## As cinco escolhidas

### 1. `grill-with-docs` — esclarecer a mudança e registrar o contexto

Use quando a ideia ainda tem decisões em aberto: uma nova área do SaaS, uma mudança de cobrança, permissões, onboarding, integração ou comportamento de uma entidade. Ela combina uma entrevista de esclarecimento com a construção do vocabulário do projeto e o registro de decisões em `CONTEXT.md` e ADRs. O autor a descreve como a versão de `grill-me` voltada a trabalho de engenharia com documentação duradoura. [Descrição no README](https://github.com/mattpocock/skills#reference)

**Exemplo de pedido:** “Quero adicionar planos por organização. Use `/grill-with-docs` para esclarecer os papéis, limites, mudança de plano, cancelamento e o que acontece com os dados, e registre as decisões estáveis no contexto do projeto.”

**Quando escolher `grill-me`:** para explorar uma ideia ou decisão sem necessariamente mexer no código nem criar documentação do domínio. Para uma mudança concreta de SaaS, `grill-with-docs` conecta melhor a conversa ao projeto.

### 2. `to-spec` — transformar a conversa em uma especificação

Use depois que a intenção e as decisões principais já estiverem claras. A skill sintetiza o que foi discutido numa especificação com problema, solução, histórias de usuário, decisões de implementação e teste, e itens fora de escopo. Ela não entrevista novamente; antes de publicar, identifica pontos de teste (“seams”) e pede alinhamento. O fluxo descrito pelo projeto publica a especificação no issue tracker e pressupõe que o rastreador esteja configurado. [Instruções da skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md)

**Exemplo de pedido:** “Com base nas decisões desta conversa, use `/to-spec` para preparar a especificação da cobrança por organização. Deixe claros os estados da assinatura, as regras de acesso e os cenários de teste.”

**Quando não usar:** se as decisões ainda estão nebulosas, volte ao `grill-with-docs`; uma especificação só organiza as decisões existentes, não substitui descobri-las.

### 3. `tdd` — implementar em fatias pequenas com feedback

Use para uma funcionalidade ou correção cujo comportamento possa ser verificado por uma interface pública. O ciclo é **red → green**: escreva um teste que falha para um comportamento real, implemente o mínimo para fazê-lo passar e siga para a próxima fatia. A skill recomenda combinar previamente as fronteiras de teste e evitar testes presos a detalhes internos, mocks excessivos ou grandes lotes de testes escritos antes da implementação. [Instruções da skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md)

**Exemplo de pedido:** “Implemente a regra de acesso do plano por organização com TDD. Primeiro proponha o ponto público de teste e cubra uma fatia vertical: membro sem permissão recebe a resposta esperada.”

**Bom encaixe em SaaS:** autorização, transições de assinatura, validação de API, limites de uso, webhooks e fluxos de onboarding. Para alterações puramente visuais ou sem um comportamento testável definido, não force TDD; peça uma verificação adequada ao caso.

### 4. `diagnosing-bugs` — encontrar a causa de uma falha antes de alterar código

Use quando há um bug difícil de reproduzir, regressão ou problema de desempenho. A skill começa construindo um ciclo de feedback que reproduz o sintoma, reduz o caso ao menor exemplo útil, formula hipóteses verificáveis, instrumenta pontos específicos e então corrige e protege o comportamento com um teste de regressão. [Instruções da skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md)

**Exemplo de pedido:** “A cobrança duplica quando o webhook é reenviado. Use `diagnosing-bugs`: reproduza o caso com um payload controlado, identifique a menor sequência que duplica a cobrança e valide a correção contra esse cenário.”

**Por que importa em SaaS:** falhas em concorrência, repetição de webhooks, isolamento entre organizações e consistência de dados costumam ter várias causas plausíveis. Reproduzir o sintoma evita corrigir uma hipótese errada.

### 5. `code-review` — conferir padrão do projeto e aderência à especificação

Use quando há um diff ou uma branch pronta para revisão. A revisão tem dois eixos: **padrões** do repositório e **aderência** à especificação. A skill pede um ponto de comparação explícito (por exemplo, `main` ou um commit), procura a origem da especificação e relata cada eixo separadamente. [Instruções da skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md)

**Exemplo de pedido:** “Revise as mudanças desta branch contra `main` usando `/code-review`. Confira separadamente se os padrões do projeto foram seguidos e se todos os requisitos da especificação foram atendidos.”

**Ponto de atenção:** o fluxo publicado no repositório pressupõe um issue tracker configurado e usa subagentes para os dois eixos. Se você trabalha sem tracker, pode pedir uma revisão direta do diff e fornecer o documento de requisitos; o objetivo da revisão continua válido, embora essa integração da skill possa exigir configuração.

## Como as skills se conectam

```text
Ideia ainda aberta
       │
       ▼
grill-with-docs ──► contexto do domínio + decisões registradas
       │
       ▼
to-spec ──────────► requisitos e critérios de aceite
       │
       ▼
tdd ──────────────► comportamento implementado em fatias verificáveis
       │
       ▼
code-review ──────► conferência da implementação contra padrões e requisitos

Bug difícil ─────► diagnosing-bugs ─► reprodução, causa, correção e regressão
```

Um exemplo completo: esclarecer como o cancelamento de plano afeta acesso e dados (`grill-with-docs`), escrever as regras e casos de aceite (`to-spec`), implementar uma transição por vez com testes (`tdd`) e revisar o diff antes de integrar (`code-review`). Se um caso falhar em produção ou no ambiente de staging, `diagnosing-bugs` organiza a investigação.

## Instalação seletiva no Codex

O README do repositório indica este instalador para Codex e outros agentes:

```bash
npx skills@latest add mattpocock/skills
```

Durante a instalação, selecione apenas as skills que pretende usar e inclua `setup-matt-pocock-skills`, recomendada pelo próprio projeto. Essa configuração pergunta pelo issue tracker, vocabulário de triagem e local onde salvar documentos. Depois, rode `/setup-matt-pocock-skills` uma vez no repositório. [Instalação e configuração](https://github.com/mattpocock/skills#installation-30-second-setup)

Para este conjunto, selecione:

- `setup-matt-pocock-skills` — configuração necessária para fluxos ligados ao tracker e à documentação.
- `grill-with-docs`
- `to-spec`
- `tdd`
- `diagnosing-bugs`
- `code-review`

Assim são seis entradas no instalador contando a configuração, mas cinco skills de trabalho. Se quiser começar mais leve, use `grill-with-docs`, `tdd` e `diagnosing-bugs` primeiro; acrescente `to-spec` e `code-review` quando o fluxo com especificações e tracker estiver configurado.

## Rotina prática para o seu SaaS

1. **Mudança com regras de negócio novas:** comece por `/grill-with-docs`.
2. **Decisões fechadas e trabalho maior que uma alteração pequena:** peça `/to-spec`.
3. **Implementação com comportamento observável:** use `tdd` e trabalhe uma fatia por vez.
4. **Falha ou lentidão sem causa clara:** use `diagnosing-bugs` antes de escolher a correção.
5. **Antes de integrar uma mudança relevante:** peça `/code-review` contra a branch base e a especificação.

Não precisa rodar as cinco em todo pedido. Para uma correção pequena e óbvia, implemente e confira o comportamento. Para uma decisão de produto, use a entrevista. Para uma regressão, investigue. O fluxo completo paga o custo em mudanças com regras, dados ou vários módulos envolvidos.

## Fontes

- [Repositório e catálogo oficial das skills](https://github.com/mattpocock/skills)
- [README: instalação, rationale e catálogo](https://github.com/mattpocock/skills#readme)
- [to-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md)
- [tdd/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md)
- [diagnosing-bugs/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md)
- [code-review/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md)
