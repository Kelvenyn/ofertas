# Padronização LP

Plano de padronização das 15 landing pages de oferta deste projeto.

Base: auditoria completa de 19/09/2026, com refino visual revisado em 20/09/2026 (medições reais em 15 ofertas × 7 viewports, contraste, performance, CSS/config/assets).
Regra central: **a página é sempre a mesma estrutura; o que muda por oferta é copy (dentro de limites), 10 paletas candidatas, imagens, links/tracking, slug e a orientação do entregável.**

---

## 0. Status da execução (atualizado em 20/09/2026)

**Plano concluído e publicado na produção.** As oito fases foram implementadas: contrato único, limites de copy, hero e CTA na dobra, paletas contrastadas, orientação das imagens, seções configuráveis, painel administrativo e migração das 15 ofertas.

| Frente | Resultado |
|---|---|
| Layout | Shell único para as 15 ofertas; CTA do hero na primeira dobra; dois trilhos full-bleed em sentidos opostos; imagens demonstrativas com 100vw no celular e 420–480px no desktop, sempre sem corte. O texto de apoio usa quebra balanceada em todas as ofertas. |
| Copy e seções | Limites passam a bloquear publicação quando excedidos; todas as ofertas têm 5 FAQs; depoimentos limitados a 7; seções podem ser ligadas e desligadas. |
| Cores | Dez candidatas por oferta; contraste WCAG AA validado; CTA, bullets e urgência seguem tokens fixos. Marquee tem gradiente sutil dos tons `brandDeep` para `brandInk` e texto branco com contraste validado. |
| Painel | `/painel` com sessão administrativa, mini dashboard, preview ao vivo, edição de oferta, copy guiada, cores, imagens WebP, checkouts, Cashflow e seções; dados operacionais persistidos no Blob privado da Vercel. |
| Segurança de publicação | Ofertas têm status `draft`, `active` ou `inactive`. Rascunhos e inativas respondem 404 até a ativação; checkout válido em cada plano é exigido para ativar. |
| Entrada do domínio | `universoeduk.com` é o domínio principal e sua raiz redireciona para `/painel`; `www.universoeduk.com` recebe um redirecionamento permanente para o domínio principal. Domínios de preview mantêm a rota de oferta padrão. |
| Mídia | Assets públicos em WebP com nomes canônicos; redução de 274,73 MiB para 67,04 MiB nos WebPs das ofertas (−75,6%). PNGs de origem da Alicate ficam fora do deploy e não são usados pela página. |
| Limpeza | Removidos ícones PNG, assets redundantes, nomes antigos de imagens, CSS morto, rotas administrativas antigas e arquivos `.gitkeep` vazios. `/admin/*` redireciona para `/painel`. |
| QA final | 25/25 testes, validação das 15 ofertas, 10 paletas por oferta e 525 WebPs, lint, typecheck e build passaram. Chrome: 105/105 medições em 320, 360, 375, 390, 430, 1366 e 1920px, sem corte, overflow ou hífens visíveis; imagens respondem `image/webp`. Navegação local mediana 524ms / p95 845ms; TTFB mediano 47ms; transferência inicial p95 805 KiB; página completa mediana 2.630 KiB / p95 4.430 KiB. Painel: 13/13 verificações funcionais em 320, 390, 768 e 1366px. QA visual passou para trilhos, depoimentos, CTA, animações, bullets, gradiente e texto de apoio balanceado. Produção após o refino: raiz redireciona a `/painel`, `www` ao domínio principal, painel solicita login, 15/15 ofertas respondem 200, slug inexistente responde 404 e o gradiente/texto branco estão na página; imagem otimizada responde `image/webp`. |

### Ajustes globais adicionais (20/09/2026)

- O painel tem controles independentes de tipografia e imagens P/M/G, responsivos e globais às 15 ofertas. A prévia muda antes de salvar; as configurações ficam em um Blob privado separado dos dados operacionais das ofertas.
- A hero prioriza o CTA e deixa a imagem flexível encolher quando o conteúdo aumenta. A edição de preço de ancoragem por checkout recalcula o percentual automaticamente e arredonda o resultado; quando o valor atual não é menor, nenhum selo de desconto aparece.
- QA complementar: 27/27 testes, 15 ofertas em 135 medições responsivas, incluindo fonte e imagens G em 320×568 e 360×640; 16 verificações do painel, incluindo prévia de escalas e recálculo do desconto; apenas respostas `image/webp`. Sem corte de texto, overflow ou CTA fora da primeira dobra nos casos medidos.

Cashflow continua opcional; ofertas sem IDs configurados não carregam o script e geram aviso informativo no validador. Tracking permanece restrito ao script oficial da Cashflow.

---
## 1. Princípios

1. **CTA comprador sempre visível na primeira dobra** — em qualquer celular, tablet, notebook ou desktop.
2. **Uma estrutura, zero código por oferta** — nenhuma classe `.xxx-offer`, nenhum ajuste de CSS por oferta.
3. **Todo conteúdo variável vem de um contrato único** (`OfferConfig`), sem campos que não são renderizados.
4. **Tudo que pode variar tem limite**: a copy tem faixas de caracteres que garantem o layout nas telas pequenas.
5. **O painel é a ferramenta do dia a dia**: cor, orientação, checkout, tracking, copy e imagens — com preview ao vivo.

---

## 2. Ordem fixa das seções

```
Barra de contagem (fixa, vidro) → Hero → Prova social → Contador → Kit (demonstrativo) →
Benefícios → Urgência → Tudo o que você recebe → Bônus → Planos (#oferta) →
Garantia → Como é o acesso → FAQ → Rodapé (+ aviso de atualização)
```

- Toda seção pode ser **ligada/desligada** pelo painel (sem exceção).
- `KitCardsReversed` (segundo trilho com as mesmas imagens) fica ligado por padrão e pode ser desligado no painel.
- Nenhuma seção renderiza conteúdo que não esteja no contrato.

---

## 3. Hero (topo)

### 3.1 Ordem obrigatória

| # | Elemento | Função |
|---|---|---|
| 1 | Pill | dizer **para quem é** (2 a 4 palavras, caixa alta) |
| 2 | Headline | **o que é + para quem** (2 linhas) |
| 3 | Subline | **benefício em 1 frase** |
| 4 | Imagem | prova visual do produto (`plano-completo.webp`) |
| 5 | Texto de apoio | contexto/objeção ("sem precisar improvisar") |
| 6 | **Botão CTA** | ação (link para `#oferta`) — **fim da primeira dobra** |
| 7 | 4 bullets | **o que vou conseguir fazer** |
| 8 | Marquee | atributos e entregáveis separados por `•` |

### 3.2 Comportamento responsivo da imagem (validado)

A dobra (`.vi-fold`) tem altura fixa (`100svh` menos 60px do padding que a barra fixa
aplica no `<html>`, menos padding do hero, menos 18px de respiro). A imagem é absoluta
contida na área flex: **estica quando sobra espaço e encolhe quando falta** (até o
mínimo). O CTA fica inteiro dentro da primeira dobra; os bullets vêm logo depois.

Medição final (15 ofertas × 7 viewports, motor de layout real via CDP):
**CTA inteiro na primeira dobra em 105/105 medições**, pior folga 30px
(`alicate` 360×640). Inclui 320×568 e 1366×768. Método e scripts em §0.

### 3.3 Limites de copy do hero

| Campo | Limite | Exemplo (psicopedagogia) |
|---|---|---|
| Pill | ≤ 30 caracteres, 1 linha, caixa alta | "MAPA DE PERFIL INFANTIL" (23) ✓ |
| Headline | ≤ 70 caracteres, 2 linhas | "Mapa de Perfil Infantil para psicopedagogas iniciantes" (57) ✓ |
| Subline | ≤ 70 caracteres, 1 linha | "Identifique, escolha e conduza com mais segurança" (50) ✓ |
| Apoio | ≤ 160 caracteres, 2-3 linhas | atual (141) ✓ |
| Bullets | **4 itens**, ≤ 34 caracteres cada | atuais (20 a 27) ✓ |
| Botão | ≤ 34 caracteres, sempre 1 linha; no celular ocupa no máximo 80vw | "QUERO O MAPA DE PERFIL" (24) |
| Marquee | 4 a 6 itens, ≤ 70 caracteres no total | atual (68) ✓ |

Observações:
- O campo `audience` desaparece como bloco próprio: seu conteúdo vira o **Texto de apoio** (antes do CTA) ou é absorvido pela Subline.
- `titleLine3` deixa de existir como linha do `<h1>` e vira o campo **Subline**.
- O botão do hero continua apontando para `#oferta`.

---

## 4. Paletas

### 4.1 O que a paleta muda

Fundo da página, fundos alternados, headlines e sublines, títulos e textos de seção, cards e bordas, pills, gradiente do marquee, número e barra de animação do contador, selos e ícones.

### 4.2 O que **não** muda (fixo em todas as ofertas)

- **Botão de CTA**: verde atual (`#12883E` → `#11863D` → `#0E6B31`).
- **Bullets**: texto verde + ícone de check branco.
- **Efeito de vidro (glass)** da barra de contagem no topo.
- **Urgência**: vermelho reservado para tempo/escassez.

### 4.3 Dez paletas candidatas por oferta

- Cada oferta tem **10 paletas candidatas** salvas; 1 fica ativa.
- O painel permite: ver as 10 ao vivo, **"Gerar novas paletas"** (variações da cor atual + aleatórias) e salvar a escolhida.
- Toda paleta gerada passa por **validação automática de contraste** (WCAG AA nos pares reais: brand sobre brandSubtle, textos sobre fundo, branco sobre CTA) antes de ser oferecida.
- A escolha é lida do Blob (override) com o código como padrão.

---

## 5. Orientação do entregável

- Um único campo por oferta: **`portrait`** (retrato) ou **`landscape`** (paisagem).
- Afeta **apenas**: cards da seção demonstrativa (kit) e cards de bônus.
- Escolhido pelo usuário no painel, com preview imediato.
- O hero e as imagens de plano continuam **quadrados** em todas as ofertas.

---

## 6. Limites de copy — todos os blocos

Legenda: ✓ = exemplo atual já dentro do limite · ⚠ = exemplo atual precisa de ajuste.

### Hero — ver §3.3

### Prova social

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 48 caracteres, 1-2 linhas | "Psicopedagogas de todo o Brasil já usam e aprovam" (49) ⚠ |
| Depoimentos | **até 7** (todos os configurados) | 7 ✓ |
| Legendas/alt | ≤ 40 caracteres | "Depoimento sobre atendimento infantil" |

### Contador

| Campo | Limite | Exemplo |
|---|---|---|
| Prefixo | ≤ 8 caracteres | "+ de" ✓ |
| Número | inteiro, 1-3 dígitos | 15 ✓ |
| Rótulo | ≤ 44 caracteres, até 2 linhas (`\n` permitido) | "Perfis Infantis organizados para suas sessões" (44) ✓ |

### Kit (demonstrativo)

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 48 caracteres | "Veja como é o mapa que você vai usar nas sessões" (49) ⚠ |
| Quantidade | 10 a 18 imagens | 10 ✓ |

### Benefícios

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 48 caracteres | "Para conduzir com mais segurança" (33) ✓ |
| Card — título | ≤ 32 caracteres, 1 linha | "Praticidade" (11), "Direcionamento" (14) ✓ |
| Card — descrição | ≤ 100 caracteres, até 3 linhas | atuais (79 a 93) ✓ |
| Quantidade de cards | 4 | 4 ✓ |

### Urgência

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 60 caracteres | "Já ficou pensando: "O que vamos entregar dessa vez?"" (52) ✓ / maior atual (103) ⚠ |
| Corpo | ≤ 140 caracteres, até 3 linhas | 125 ✓ |
| Selos de confiança | 1 a 3 itens, ≤ 30 caracteres cada | 1 ✓ |

### Tudo o que você recebe

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 48 caracteres | "Tudo o que você vai receber" (27) ✓ |
| Bullets | 6 a 10 itens, ≤ 60 caracteres cada | 7 itens (27 a 54) ✓ |

### Bônus

| Campo | Limite | Exemplo |
|---|---|---|
| Título (lead + destaque) | ≤ 48 caracteres no total | "4 BÔNUS EXCLUSIVOS" (18) ✓ |
| Subtítulo | ≤ 140 caracteres | 99 ✓ |
| Card — título | ≤ 2 linhas | títulos atuais ✓ |
| Card — descrição | ≤ 120 caracteres, até 3 linhas | atuais (114 a 135) ⚠ |
| Quantidade | até 6 | 6 ✓ |

### Planos (#oferta)

| Campo | Limite | Exemplo |
|---|---|---|
| Título da seção | ≤ 48 caracteres | "APROVEITE ENQUANTO OS BÔNUS ESTÃO INCLUSOS!" (43) ✓ |
| Título do plano | ≤ 34 caracteres | "Plano Básico" / "Plano Completo" ✓ |
| Itens — Básico | **6 itens**, ≤ 60 caracteres cada | 7 itens ⚠ |
| Itens — Completo | **8 itens**, ≤ 60 caracteres cada | 10 itens ⚠ |
| Nota/rodapé | ≤ 160 caracteres | 31 / 148 ✓ |
| Oferta de plano único | quando existe só 1 plano, o card é o "Completo" (caso lembrancinhas) | — |

### Garantia

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 50 caracteres | atuais 18 a 50 ✓ |
| Corpo | **≤ 200 caracteres**, 2 a 3 linhas | 34 (curto) / 275 (longo) ⚠ |
| Selo | imagem padrão `garantia.webp` | ✓ |

### Como é o acesso

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 48 caracteres | "Como você vai receber seu material" (35) ✓ |
| Passos | **4 passos** — título ≤ 30 / descrição ≤ 90 | 18/16/19/15 e 43/31/28/29 ✓ |
| Botão final | ≤ 34 caracteres, uma linha (opcional) | ✓ |

### FAQ

| Campo | Limite | Exemplo |
|---|---|---|
| Título | ≤ 48 caracteres | "Perguntas Frequentes" (19) ✓ |
| Pergunta | ≤ 70 caracteres | atuais (28 a 43) ✓ |
| Resposta | ≤ 200 caracteres, até 4 linhas | atuais (69 a 184) ✓ |
| Quantidade | **exatamente 5** | 5 ✓ |

### Rodapé

| Campo | Limite | Exemplo |
|---|---|---|
| Aviso — título | ≤ 50 caracteres | "Material em constante atualização" (34) ✓ |
| Aviso — corpo | ≤ 160 caracteres | ✓ |
| Copyright | texto fixo (mesmo em todas) | — |

---

## 7. FAQ padrão — roteiro fixo de 5 temas

1. **O que eu recebo exatamente** (conteúdo + formato)
2. **Como e quando recebo o acesso** (e-mail, imediato, vitalício)
3. **É digital ou físico / preciso de algo especial** (imprimir? celular? PC?)
4. **Serve para o meu caso/perfil** (quebra da objeção principal da oferta)
5. **E se eu não gostar** (garantia de 30 dias)

Copy adaptada por oferta, dentro dos limites de §6.

---

## 8. Imagens

### 8.1 Nomenclatura padrão (upload em massa por nome)

| Nome do arquivo | Onde é usada |
|---|---|
| `plano-completo.webp` | **hero**, "Tudo o que você recebe" e card do Plano Completo |
| `plano-basico.webp` | card do Plano Básico |
| `demonstrativo-01.webp` … `demonstrativo-18.webp` | trilhos do kit (10 a 18) |
| `depoimento-01.webp` … `depoimento-07.webp` | carrossel de depoimentos (até 7) |
| `bonus-01-frente.webp` / `bonus-01-verso.webp` … `bonus-06-*` | cards de bônus |
| `garantia.webp` | selo da garantia |
| `favicon.webp` | ícone da aba |
| `beneficio.webp` (opcional) | imagem da seção de benefícios |

### 8.2 Trilhos do demonstrativo (kit)

- **Dois trilhos mantidos** (como hoje), um abaixo do outro.
- **Largura**: os trilhos ocupam 100% da viewport (full-bleed), com máscara de fade nas laterais — os cards aparecem e somem conforme se movem.
- **Tamanho**: cards com **100vw no celular** e `clamp(420px, 32vw, 480px)` no desktop, com a altura seguindo a orientação do entregável e `object-fit: contain` — ajustável no painel.
- **Direções opostas**: o primeiro trilho gira para a esquerda (A→Z) e o segundo para a direita (Z→A), sem repetir a mesma sequência na tela.
- Cards com `aspect-ratio` da orientação escolhida (§5) e sombra suave.

### 8.3 Upload

- O painel recebe uma pasta/arquivos e **substitui pelo nome** (sem renomear manualmente).
- **PNG/JPG enviados são convertidos automaticamente para WebP** (mesmo tamanho máximo, mesma qualidade atual).
- Imagens fora do padrão são ignoradas com aviso no painel.
- Dimensões de referência: quadradas 1080×1080 para planos; demonstrativo e bônus conforme a orientação (retrato até 1200×1600 / paisagem até 1600×1200); depoimentos 9:16 (360×640).

---

## 9. Painel `/painel`

### 9.1 Acesso

- **Login com e-mail + senha** (variáveis `ADMIN_EMAIL` / `ADMIN_PASSWORD` na Vercel).
- O atalho `/<slug>/paleta` continua existindo e exige a mesma sessão administrativa (`ADMIN_EMAIL`/`ADMIN_PASSWORD`) do painel; não há PIN separado.
- As 15 ofertas atuais começam `active`; novos imports entram como `draft` e só são liberados após checkout, validação e QA visual.

### 9.2 Telas

1. **Lista de ofertas** — as 15, com miniatura, cor atual e botão "Abrir".
2. **Oferta (com preview ao lado, celular/desktop, atualizando ao vivo):**
   - **Cores** — 10 paletas candidatas, "Gerar novas paletas" (variações da atual + aleatórias), validação de contraste automática e preview ao vivo.
   - **Imagens** — orientação (retrato/paisagem) + upload em massa por nome (PNG→WebP).
   - **Oferta** — slug editável; checkouts para um ou dois planos; Cashflow opcional por meio da tag completa em um único campo (o painel extrai e valida os IDs sem executar o código colado). A slug anterior responde 404, sem redirecionamento.
   - **Copy** — subabas para editar, gerar prompt e colar copy; navegação rápida por seção; estrutura vazia copiável; ao gerar prompt, o texto completo vai para a área de transferência.
   - **Publicação** — status com controle de um clique; ofertas `draft` ou `inactive` respondem a um 404 personalizado. Ativação depende de checkout válido em cada plano.
   - **Resumo** — mini dashboard com total de ofertas, ativas, checkouts válidos e configurações Cashflow.
   - **Seções** — ligar/desligar qualquer seção da página.
3. **Salvar** — grava a configuração validada no Blob. Apenas ofertas `active` ficam disponíveis ao público; uma alteração de slug remove a rota antiga sem redirecionamento.

### 9.3 O que sai

- Interfaces antigas de `/admin`; os caminhos `/admin/*` redirecionam para `/painel` e APIs antigas foram removidas.
- Chaves operacionais por slug mutável. O Blob usa identidade estável; imports futuros começam `draft` e permanecem indisponíveis ao público até a ativação.
- PIN fixo de paleta; acesso às rotas administrativas usa sessão autenticada.

---

## 10. Descarte autorizado

- CSS morto: `.idv-*`, `.bio-professora*`, `.footer-mission*`, `.tqvr-pill`, `.offer-badge`, `.benefits-highlight`, `.sp-story-gradient-bar`, `.bon-new-timer-icon`, `.sp-problem-*` e todos os blocos `*-offer`.
- Campos nunca renderizados: `timerLabel`, `urgency.pill`, `deliverables.pill`, `badgeText`, `missionText`, `privacyLabel`, `termsLabel`, `touchHint`, `backHint`, `steps[].num`, `marqueeGradient`, `testimonials[].gradient`, `socialProofCaption`, `subtitlePosition`, `questions`, `audience`, `titleLine3`.
- Imagens órfãs de todas as pastas (35 arquivos, ~24 MB) e as pastas vazias `public/seo/` e `public/videos/`.
- 4 páginas legais duplicadas (`psicopedagogia/*` e `tilapia/*`) — todas passam a apontar para as da raiz.
- `public/images/alicate/PNG/`: movido para `.local-assets/alicate/PNG/`, fora de `public`, do Git e do deploy. A página serve apenas as variantes WebP normalizadas.
- `@vercel/blob` persiste identidade e status por ID estável, slug, copy, paletas, orientação, favicon, assets enviados, checkouts e Cashflow.

---

## 11. Critérios de aceite

1. **CTA na primeira dobra**: em 15 ofertas × 7 viewports (320×568, 360×640, 375×667, 390×844, 430×932, 1366×768, 1920×1080) o botão do hero fica 100% visível — verificado por medição automatizada.
2. **Limites de copy**: nenhuma oferta publica com campo acima do limite (verificação no `offer:validate`); CTA do hero de uma linha e limitado a 80vw no celular.
3. **Contraste**: toda paleta ativa passa WCAG AA nos pares reais (teste automatizado ampliado).
4. **Sem CSS por oferta**: nenhuma classe `*-offer` no CSS.
5. **Imagens**: todos os arquivos dentro de `public/` são WebP e usam nomes canônicos; imagens órfãs removidas e originais ficam fora de `public/`.
6. **Nenhum campo morto** no contrato.
7. **FAQ com exatamente 5 perguntas** e até 7 depoimentos; todos os cards permanecem montados durante autoplay.
8. Dois trilhos demonstrativos em direções opostas; imagens WebP, sem corte e ampliadas.
9. Rotas antigas de slugs alteradas e ofertas inativas respondem com 404 personalizado.
10. `npm run check` (test + validate + lint + typecheck + build), QA responsivo 15 × 7 viewports e QA de painel verdes.

---

## 12. Roteiro de implementação

| Fase | Entrega |
|---|---|
| 1 | Limpeza: CSS morto, campos mortos, assets órfãos, páginas legais duplicadas, classes `*-offer` |
| 2 | Contrato novo (`OfferConfig` enxuto) + limites de copy + validador automático |
| 3 | Hero novo (ordem, limites, imagem adaptativa) + CTA na dobra validado por medição |
| 4 | Paletas: 10 candidatas + gerador + validação de contraste + tokens novos (mantendo CTA/bullets/glass) |
| 5 | Orientação do entregável (kit + bônus) e reescrita dos componentes de carrossel/bônus |
| 6 | Seções ligáveis/desligáveis + FAQ 5 + depoimentos até 7 |
| 7 | Painel `/painel` (sessão administrativa, preview, abas, upload em massa, gerar prompt/colar copy) |
| 8 | Migração das 15 ofertas para o novo contrato + copy dentro dos limites + QA final |

---

## 13. Gerador de prompt de copy (painel)

### 13.1 Entrada (o que você cola no painel)

Você cola os **elementos da oferta** no formato do arquivo de concepção (ex.: "Obra 100k"):

```
- Nicho / Subnicho / Persona
- Formato
- Dor (+ dores secundárias)
- Desejo
- Pensamento interno
- Mecanismo
- Resultado final
- Promessa
- Composição do produto principal
- Bônus (lista)
- Preços (Básico / Completo)
```

### 13.2 Saída (o prompt que o painel gera)

O painel monta um prompt pronto para colar no ChatGPT/Claude com:

1. Os elementos acima.
2. O tom da marca (direto, urgente, sem clichê de IA).
3. **Todos os limites de copy da §6** e a função de cada elemento.
4. O formato de resposta obrigatório, para você colar de volta no painel sem editar nada:

```
PILL: ...
HEADLINE: ...
SUBLINE: ...
APOIO: ...
BULLET 1..4: ...
BOTAO: ...
MARQUEE: ...
PROVA_SOCIAL_TITULO: ...
CONTADOR_PREFIXO: ...
CONTADOR_LABEL: ...
KIT_TITULO: ...
BENEFICIOS_TITULO: ...
BENEFICIO 1..4 (TITULO | DESCRICAO): ...
BOTAO_BENEFICIOS: ...
URGENCIA_TITULO: ...
URGENCIA_CORPO: ...
BOTAO_URGENCIA: ...
ENTREGAVEIS_TITULO: ...
ENTREGAVEIS_BULLET 1..10: ...
BONUS_TITULO: ...
BONUS_SUBTITULO: ...
BONUS 1..6 (TITULO | DESCRICAO): ...
PLANOS_TITULO: ...
PLANOS_NOTA: ...
PLANO_TITULO 1..N: ...
PLANO 1..N ITEM 1..8: ...
GARANTIA_TITULO: ...
GARANTIA_CORPO: ...
ACESSO_TITULO: ...
ACESSO_PASSO 1..4 (TITULO | DESCRICAO): ...
BOTAO_ACESSO: ... (quando houver)
FAQ_TITULO: ...
FAQ 1..5 (PERGUNTA | RESPOSTA): ...
FOOTER_TITULO: ...
FOOTER_CORPO: ...
```

### 13.3 Colagem em massa ("Colar copy")

- O painel aplica o bloco diretamente ao rascunho, atualiza o preview e mostra os contadores e limites; não permite publicar enquanto houver campos fora do padrão.

---

## 14. Execução paralela

As tarefas independentes de paleta/painel, conteúdo e imagens foram auditadas em paralelo. A integração final, a QA e a publicação foram centralizadas. `universoeduk.com` é o domínio principal e sua raiz direciona para `/painel`; `www.universoeduk.com` redireciona permanentemente para ele. Os previews continuam usando a rota padrão da oferta.

---

## 15. Pendências conhecidas

Não há pendências para a padronização. Cashflow é opcional e pode ser configurado posteriormente por oferta. A criação de futuras ofertas permanece sujeita ao fluxo `draft` → checkout válido → validação → QA visual → publicação.

---

## Anexo A — Contrato novo (Fase 2)

```ts
export interface OfferHero {
  pill: string            // ≤ 30 car., caixa alta
  headline: string        // ≤ 70 car.; "\n" força quebra de linha (não conta no limite)
  subline: string         // ≤ 70 car.
  image: string           // "plano-completo.webp"
  imageAlt: string
  support: string         // ≤ 160 car. (texto de apoio, antes do CTA)
  bullets: string[]       // exatamente 4, ≤ 34 car. cada
  ctaText: string         // ≤ 34 car.; sem quebra, até 80vw no celular
  marqueeText: string     // ≤ 70 car.
}

export interface PricingPlan {
  id: string
  label?: string
  title: string           // ≤ 34 car.
  image: string
  imageAlt: string
  featured: boolean
  extraNote?: string
  oldPrice: string
  price: string
  installments: string
  installmentsPosition?: "abovePrice" | "belowPrice"
  items: string[]         // 6 (básico) / 8 (completo), ≤ 60 car. cada
  mutedItems?: string[]
  ctaText: string
  ctaHref?: string
  ctaDisabled?: boolean
}

export interface OfferConfig {
  meta: { title: string; description: string }
  palette: OfferPalette
  paletteCandidates?: OfferPalette[]        // 10 candidatas
  orientation: "portrait" | "landscape"     // governa kit + bônus (Fase 5)
  sections?: Partial<Record<SectionId, boolean>>  // ligar/desligar (Fase 6)
  hero: OfferHero
  socialProof: { title: string; testimonials: { src: string; alt: string }[] }  // até 7
  counter: { prefix: string; target: number; label: string }
  kitCards: { heading: string; images: KitImage[] }   // 10 a 18; aspect vem da orientação
  benefits: { title: string; ctaText: string; items: BenefitItem[]; image?: string; imageAlt?: string }
  urgency: { title: string; highlight: string; body: string; ctaText: string; trust: string[]; timerMode?: "hoursMinutesSeconds" | "minutesSeconds" }
  deliverables: { title: string; image: string; imageAlt: string; bullets: string[] }  // 6 a 10
  bonusSection: { titleLead: string; titleHighlight: string; subtitle: string; cardLabel: string; timerText: string; freeLabel: string }
  bonuses: BonusItem[]      // até 6
  pricing: { titleLead: string; titleHighlight: string; plans: PricingPlan[]; note?: string; trustText?: string }
  guarantee: { icon?: string; iconAlt?: string; title: string; body: string; marqueeText: string; sealText?: string }
  access: { title: string; steps: { title: string; desc: string }[]; ctaText?: string }  // exatamente 4 passos
  faq: { title: string; items: { q: string; a: string }[] }                              // exatamente 5
  footer: { updateTitle: string; updateBody: string; copyright: string; privacyUrl: string; termsUrl: string; showUpdate?: boolean }
}

export type SectionId =
  | "countdown" | "hero" | "socialProof" | "counter" | "kit" | "kitReversed" | "benefits" | "urgency"
  | "deliverables" | "bonuses" | "pricing" | "guarantee" | "access" | "faq" | "footer"
```

**Sai do contrato:** `titleLine1/2/3`, `audience`, `subtitle`, `subtitlePosition`, `socialProofCaption`, `timerLabel`, `marqueeGradient`, `testimonials[].gradient`, `questions`, `conclusion`, `urgency.pill`, `deliverables.pill`, `badgeText`, `touchHint`, `backHint`, `steps[].num`, `missionText`, `privacyLabel`, `termsLabel`, `kitCards.displayAspect`, `bonusSection.cardImageAspect`, `hero.imageWidth/imageHeight`, `deliverables.pill`, `footer.missionText`.

**Campos que permanecem quadrados:** `hero.image` e `pricing.plans[].image` (sempre 1080×1080).
