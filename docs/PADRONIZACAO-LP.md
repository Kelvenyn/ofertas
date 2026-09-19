# Padronização LP

Plano de padronização das 15 landing pages de oferta deste projeto.

Base: auditoria completa de 19/09/2026 (medições reais em 15 ofertas × 7 viewports, contraste, performance, CSS/config/assets).
Regra central: **a página é sempre a mesma estrutura; o que muda por oferta é copy (dentro de limites), 5 cores, imagens, links/tracking e a orientação do entregável.**

---

## 0. Status da execução (atualizado em 19/09/2026)

### ✅ Fase 1 — Limpeza (concluída e commitada)

| Item | Resultado |
|---|---|
| CSS morto | **372 linhas / ~8,8 KB removidos** de `src/app/globals.css` (68,1 → 59,3 KB). Saíram: `.idv-*`, `.bio-professora*`, `.footer-mission*`, `.tqvr-pill`, `.offer-badge`, `.benefits-highlight`, `.sp-story-gradient-bar`, `.bon-new-timer-icon` e todo o ramo `.sp-problem-*` |
| Campos mortos | Removidos do contrato e das 15 ofertas: `timerLabel`, `socialProofCaption`, `marqueeGradient` (hero e garantia), `testimonials[].gradient`, `questions`/`conclusion`, `urgency.pill`, `deliverables.pill`, `deliverables.titleHighlight`, `touchHint`, `backHint`, `badgeText`, `steps[].num`, `missionText`, `privacyLabel`, `termsLabel`. Ajustes em `SocialProof.tsx` (ramo das perguntas) e `VendaImediata.tsx` |
| Assets órfãos | **35 imagens (~24 MB)** removidas (sobras de castracao, croqui, felinos, jardim, laboral, psicopedagogia e `calha/Demonstrativo.webp`) + pastas vazias `public/seo/` e `public/videos/` |
| Páginas legais | As 4 duplicatas (`psicopedagogia/*` e `tilapia/*`) foram **apagadas**; os rodapés das duas ofertas agora apontam para `/politica-de-privacidade` e `/termos-de-uso` |
| `alicate/PNG` | **Mantido** de propósito: são os PNGs de origem (96,7 MB) e já estão fora do git/deploy por `.gitignore`/`.vercelignore` |
| Portão de qualidade | `typecheck` ✅ · `test` 9/9 ✅ · `lint` ✅ · `build` ✅ (30 rotas geradas) |
| Regressão visual | Screenshot da primeira dobra idêntico ao estado anterior (zero mudança visual) |

**Arquivos alterados na Fase 1:** commit `1f5ad08` (`refactor: limpa css morto, campos nao renderizados e assets orfaos`). Plano publicado nos commits `f459251` (documento) e `ff064c3` (ponteiro no `AGENTS.md`).

### ✅ Fase 2 — Contrato novo (concluída e commitada em `920721d`)

| Item | Resultado |
|---|---|
| `OfferConfig` novo | `src/types/offer.ts` conforme o Anexo A: hero `headline`/`subline`/`support` (+`bullets` obrigatório), `orientation`, `sections`, `paletteCandidates`, `kitCards.heading`, `bonusSection` sem `pill`; removidos `titleLine1/2/3`, `audience`, `subtitle`, `subtitlePosition`, `imageWidth`/`imageHeight`, `displayAspect`, `cardImageAspect`, `heading1/2`, `bonusSection.pill` |
| 15 ofertas migradas | Remapeamento mecânico (sem reescrever copy): `titleLine1/2`→`headline` (`\n`), `titleLine3`/`audience`→`subline`, `subtitle`→`support`; bullets cortados para 4 onde passava (box, lavanderia, tilapia, psicopedagogia); `orientation` por oferta (landscape: box, calha, castracao, felinos, laboral, lavanderia, psicopedagogia, tilapia; portrait: demais) |
| Componentes | `VendaImediata` (headline/subline/support, imagem 1080²), `KitCards`/`KitCardsReversed` + `InfiniteImageRail` (governados por `orientation`), `Bonuses` (sem pill) + `FlipCard` (retrato via `orientation`), `Benefits` (sem dimensões configuráveis) |
| Validador de copy | `npm run offer:validate` agora checa os limites da §6 (com resolução de spreads) e os campos removidos; violações de copy saem como **avisos** até a Fase 8 (hoje: ~200 avisos esperados); campos removidos e `orientation` ausente são **erro** |
| Portão de qualidade | `typecheck` ✅ · `test` 9/9 ✅ · `lint` ✅ · `offer:validate` ✅ (0 erros) · `build` ✅ (26 rotas) |

### ✅ Fase 3 — Hero novo (concluída e commitada em `86f4659` + `f903032`)

| Item | Resultado |
|---|---|
| Ordem | `VendaImediata.tsx`: `.vi-fold` (Pill → Headline → Subline `<p>` fora do `h1` → Imagem → CTA `#oferta`) + Apoio → 4 Bullets → Marquee |
| Dobra fixa | `.vi-fold` com altura fixa (`100svh` menos 60px do padding-top que a barra fixa aplica no `<html>`, menos padding do hero, menos 18px de respiro); imagem absoluta contida na área flex — estica com folga, encolhe com falta (teto 60vh); CTA termina ~18px acima da dobra. `font-size/line-height: 0` no fold (quebras JSX viravam itens flex anônimos de ~24px); `.vi-cta-btn` com fonte/linha explícitas (16px/1.5, 15px ≤640px) |
| Compactação mobile | Hero 16px topo, dobra desconta 60px (barra) + 16px + 18px; pill mb 10, título mb 8, linha1 mín 26px, linha2 mín 21px, linha3/subline mín 16px + mb 16 (overrides `*-offer` mantidos até a Fase 8 por especificidade maior) |
| CSS morto | Removidos `.vi-audience`, `.vi-sub-before-image`, `.vi-social-proof-caption` |
| Trilhos do kit | Espaçamento enxuto e por orientação: seção 28/12px, trilho `gap` 12px, cards retrato `clamp(200px,56vw,300px)` 3/4 e paisagem com placeholder 3/2 imediato (proporção natural após carregar; salto reduzido de ~170px para ~9px). Direções opostas já via `direction="reverse"` no `KitCardsReversed` |
| CTA na dobra | **105/105 medições** (15 ofertas × 7 viewports, motor de layout real via CDP com hosts externos bloqueados; pior folga 30px). Recaptura confirma estabilidade |
| Portão de qualidade | `typecheck` ✅ · `test` 9/9 ✅ · `lint` ✅ · `offer:validate` ✅ (0 erros) · `build` ✅ (26 rotas) |

> Nota de método: o load via CDP trava neste sandbox em recurso externo (servidor responde o corpo em ~60ms; renderer não completa o load). A medição final usou CDP com `Network.setBlockedURLs` (fontes + tracker) — motor de layout real, `getBoundingClientRect` do `.vi-cta-btn` vs. `innerHeight`, e geometria dos trilhos (`.kc-section`, `.kc-card`). Scripts em `C:\Users\maryk\AppData\Local\Temp\opencode\` (`measure-cdp.mjs`, `shots-only.cjs`, `analyze-fold.cjs`, `png-tools.cjs` — fora do git, podem não sobreviver entre sessões).
> Observação: títulos estouram a largura em telas pequenas (ex.: psicopedagogia/lavanderia em 390px) — pré-existente, tratado na Fase 8 (copy dentro dos limites + revisão dos clamps).

### 🟡 Fase 4 — Paletas (parcial, NÃO commitada)

| Item | Estado |
|---|---|
| `src/lib/color.ts` (untracked) | Pronto: `parseHex`/`rgbToHex`/`rgbToHsl`/`hslToRgb`/`hexToHsl`/`hslToHex`/`shiftHue`/`withLightness`, `relativeLuminance`/`contrastRatio`, `validatePaletteContrast` (6 pares reais: branco sobre brand/brandDeep/ctaDeep/ctaDarkest, brandInk sobre bg/brandSubtle), `mulberry32`, `repairPaletteContrast`, `generatePaletteCandidates` (variações de matiz + aleatórias com seed, CTA herdado da base, só retorna aprovadas). Sem testes próprios; nada o importa ainda |
| Falta (para o Codex) | Popular `paletteCandidates` (5 por oferta) — o campo já existe no contrato; o painel lê do Blob com o código como padrão (decidir onde vivem as candidatas); UI de escolha + "Gerar novas paletas" (hoje o `PaletteEditor` só lista os 10 presets e salva 1 `paletteKey`); trocar o PIN `"1010"` hardcoded (`PaletteEditor.tsx:31,33,90`, `api/admin/offers/[slug]/route.ts:18`, `AdminOffersClient.tsx:43,44`) por `PALETTE_PIN`; estender o teste de contraste às candidatas (critério §11.3). Atenção: paletas inline de `offer.ts` nunca passaram por contraste (ex.: psicopedagogia reprova "branco sobre brand" 2.77:1) — o teste atual só cobre os 10 presets |

### ✅ Fase 3 — Hero novo (concluída)

| Item | Resultado |
|---|---|
| Ordem nova | `VendaImediata.tsx`: Pill → Headline → Subline (`<p>`, fora do `h1`) → Imagem → CTA (`#oferta`) → Apoio → 4 Bullets → Marquee |
| Imagem | Preenche a dobra: absoluta contida na área flex (esticа com folga, encolhe com falta; teto 60vh); CTA termina ~18px acima da dobra |
| Compactação mobile (≤480px) | Hero 16px topo, dobra desconta 60px (barra) + 16px + 18px; pill mb 10, título mb 8, linha1 mín 26px, linha2 mín 21px, linha3/subline mín 16px + mb 16 (overrides `*-offer` mantidos até a Fase 8 por especificidade maior) |
| CSS morto | Removidos `.vi-audience`, `.vi-sub-before-image`, `.vi-social-proof-caption` (campos já fora do contrato) |
| Trilhos do kit | Espaçamento enxuto e por orientação: seção 28/12px, trilho `gap` 12px, cards retrato `clamp(200px,56vw,300px)` 3/4 e paisagem com placeholder 3/2 imediato (proporção natural após carregar; salto de layout reduzido de ~170px para ~9px) |
| CTA na dobra | **105/105 medições** (15 ofertas × 7 viewports, motor de layout real via CDP com hosts externos bloqueados; pior folga 30px). Recaptura confirma estabilidade |
| Portão de qualidade | `typecheck` ✅ · `test` 9/9 ✅ · `lint` ✅ · `offer:validate` ✅ (0 erros) · `build` ✅ (26 rotas) |

> Nota de método: o load via CDP trava neste sandbox em recurso externo (servidor responde o corpo em ~60ms; renderer não completa o load). A medição final usou CDP com `Network.setBlockedURLs` (fontes + tracker) — motor de layout real, `getBoundingClientRect` do `.vi-cta-btn` vs. `innerHeight`, e geometria dos trilhos (`.kc-section`, `.kc-card`). Scripts em `C:\Users\maryk\AppData\Local\Temp\opencode\` (`measure-cdp.mjs`, `shots-only.cjs`, `analyze-fold.cjs`, `png-tools.cjs`).
> Observação: títulos estouram a largura em telas pequenas (ex.: psicopedagogia/lavanderia em 390px) — pré-existente (CSS do título inalterado nesta fase), tratado na Fase 8 (copy dentro dos limites + revisão dos clamps).

### ⏳ O que falta (Fases 4-resto a 8 — guia para o Codex)

| Fase | O que fazer | Estado atual / pontos de atenção |
|---|---|---|
| 4-resto | Popular `paletteCandidates` (5/oferta), UI de escolha + "Gerar novas paletas", `PALETTE_PIN`, contraste das candidatas | Base pronta em `src/lib/color.ts` (não commitado). CTA/bullets/glass **não mudam** com a paleta (§4.2). `PaletteEditor` atual só salva 1 `paletteKey` |
| 5-resto | Trilhos full-bleed 100vw + fade lateral + cards 78vw + ajuste no painel | Já pronto: `orientation` governa kit+bônus, direções opostas (`direction="reverse"`), espaçamento enxuto, placeholder por orientação. Falta: largura total, máscara de fade, cards maiores. Cards hoje: 240px mobile (`clamp(240px,42vw,360px)`), retrato `clamp(200px,56vw,300px)` |
| 6 | `sections` ligando/desligando tudo no `OfferPage`, FAQ exatamente 5, depoimentos até 7 | Tipo `SectionId` existe mas `OfferPage.tsx` ignora `sections`. `FAQ.tsx:10` corta com `slice(0, 5)`. `SocialProof` renderiza todos os configurados — impor teto 7 |
| 7 | Painel `/painel` (login env, lista, preview, abas Cores/Imagens/Oferta/Copy/Seções, upload em massa PNG→WebP, "Gerar prompt"/"Colar copy") | Existe só `/admin/*` + `/<slug>/paleta` (PIN `"1010"` hardcoded em 3 arquivos). Estender `operational-catalog.ts` (hoje só `status`+`paletteKey`) para copy/orientação/checkout/tracking |
| 8 | Migrar copy para os limites (~200 avisos hoje no `offer:validate`), imagens nos nomes padrão (§8.1), remover `*-offer` do CSS (57 ocorrências) + `className` do catálogo (11 em uso), apagar `status`/draft + `/admin` + APIs | Só remover o admin **depois** do painel funcionar. `catalog.json` perde `status`/`className`. Título mobile estourado sai com a copy nos limites |

### ⚠️ Armadilhas aprendidas nesta sessão (importante para não repetir)

1. **Fim de linha:** o projeto usa **LF**. Ferramentas/agentes que gravam CRLF fazem o arquivo inteiro aparecer como alterado no `git diff`. Antes de commitar, conferir com `git diff --numstat` (números próximos do real) e normalizar para LF se necessário.
2. **Diff cirúrgico nos `offer.ts`:** editar linha a linha; nunca "formatar" o arquivo — vários são one-liners propositais.
3. **Medição da primeira dobra:** foi feita com Chrome headless + CDP (Emulation.setDeviceMetricsOverride), CSS injetado em runtime e medição de `getBoundingClientRect` do `.vi-cta-btn` (top/bottom vs. `innerHeight`). Os scripts ficaram em `C:\Users\maryk\AppData\Local\Temp\opencode\` (podem não sobreviver entre sessões — o método está descrito aqui).
4. **Não confiar em altura fixa:** a auditoria provou que espaçamento/imagem sozinhos não colocam o CTA na dobra; a ordem dos blocos é o que resolve.

### Comandos do projeto

```bash
npm run dev            # http://localhost:3000
npm run typecheck
npm run lint
npm test               # 9 testes
npm run offer:validate # valida catálogo/checkout/paletas
npm run build
npm run check          # tudo acima em sequência
```

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
- `KitCardsReversed` (segundo trilho com as mesmas imagens) sai do fluxo padrão e vira opção "segundo trilho" desligada por padrão.
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
| 5 | **Botão CTA** | ação (link para `#oferta`) — **fim da primeira dobra** |
| 6 | Texto de apoio | contexto/objeção ("sem precisar improvisar") |
| 7 | 4 bullets | **o que vou conseguir fazer** |
| 8 | Marquee | atributos e entregáveis separados por `•` |

### 3.2 Comportamento responsivo da imagem (validado)

A dobra (`.vi-fold`) tem altura fixa (`100svh` menos 60px do padding que a barra fixa
aplica no `<html>`, menos padding do hero, menos 18px de respiro). A imagem é absoluta
contida na área flex: **esticа quando sobra espaço e encolhe quando falta** (até o
mínimo), e o CTA termina sempre ~18px acima da dobra — último elemento da tela.

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
| Botão | ≤ 17 caracteres, sempre 1 linha | "QUERO O MAPA" (13) |
| Marquee | 4 a 6 itens, ≤ 70 caracteres no total | atual (68) ✓ |

Observações:
- O campo `audience` desaparece como bloco próprio: seu conteúdo vira o **Texto de apoio** (depois do CTA) ou é absorvido pela Subline.
- `titleLine3` deixa de existir como linha do `<h1>` e vira o campo **Subline**.
- O botão do hero continua apontando para `#oferta`.

---

## 4. Paletas

### 4.1 O que a paleta muda

Fundo da página, fundos alternados, headlines e sublines, títulos e textos de seção, cards e bordas, pills, gradiente do marquee, número e barra de animação do contador, selos e ícones.

### 4.2 O que **não** muda (fixo em todas as ofertas)

- **Botão de CTA**: verde atual (`#16A34A` → `#11863D` → `#0E6B31`).
- **Bullets**: texto verde + ícone de check branco.
- **Efeito de vidro (glass)** da barra de contagem no topo.
- **Urgência**: vermelho reservado para tempo/escassez.

### 4.3 Cinco paletas candidatas por oferta

- Cada oferta tem **5 paletas candidatas** salvas; 1 fica ativa.
- O painel permite: ver as 5 ao vivo, **"Gerar novas paletas"** (variações da cor atual + aleatórias) e salvar a escolhida.
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
| Botão final | ≤ 17 caracteres (opcional) | ✓ |

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
- **Tamanho**: cards maiores que hoje (hoje: 240px de largura no celular). Proposta: **78vw no celular** (≈304px numa tela de 390px) e **360–420px no desktop**, com a altura seguindo a orientação do entregável — ajustável no painel.
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
- O atalho `/<slug>/paleta` continua existindo, protegido **apenas pelo PIN** — que sai do código e passa a vir de variável de ambiente (`PALETTE_PIN`), sem aparecer na página em nenhum texto.
- Sem status de rascunho/ativa: as 15 ofertas estão sempre publicadas.

### 9.2 Telas

1. **Lista de ofertas** — as 15, com miniatura, cor atual e botão "Abrir".
2. **Oferta (com preview ao lado, celular/desktop, atualizando ao vivo):**
   - **Cores** — 5 paletas candidatas, "Gerar novas paletas" (variações da atual + aleatórias), validação de contraste automática.
   - **Imagens** — orientação (retrato/paisagem) + upload em massa por nome (PNG→WebP).
   - **Oferta** — links de checkout (Básico/Completo) e ID/script da Cashflow.
   - **Copy** — campos por elemento com contador e limite (ver §6), botão **"Gerar prompt"** (monta o texto pronto para colar no ChatGPT/Claude com as regras e limites) e **"Colar copy"** (cola o bloco formatado `PILL: ... / HEADLINE: ...` e preenche todos os campos de uma vez).
   - **Seções** — ligar/desligar qualquer seção da página.
3. **Salvar** — grava no Blob (o código continua sendo o padrão) e publica na hora. Botão "Restaurar do código" desfaz.

### 9.3 O que sai

- `/admin`, `/admin/ofertas`, `/admin/login` e as APIs de admin.
- Campo `status` (draft/active/archived), gate de 404 em produção e a lógica de publicação.
- Painel atual de paleta com PIN fixo e exibido na tela.

---

## 10. Descarte autorizado

- CSS morto: `.idv-*`, `.bio-professora*`, `.footer-mission*`, `.tqvr-pill`, `.offer-badge`, `.benefits-highlight`, `.sp-story-gradient-bar`, `.bon-new-timer-icon`, `.sp-problem-*` e todos os blocos `*-offer`.
- Campos nunca renderizados: `timerLabel`, `urgency.pill`, `deliverables.pill`, `badgeText`, `missionText`, `privacyLabel`, `termsLabel`, `touchHint`, `backHint`, `steps[].num`, `marqueeGradient`, `testimonials[].gradient`, `socialProofCaption`, `subtitlePosition`, `questions`, `audience`, `titleLine3`.
- Imagens órfãs de todas as pastas (35 arquivos, ~24 MB) e as pastas vazias `public/seo/` e `public/videos/`.
- 4 páginas legais duplicadas (`psicopedagogia/*` e `tilapia/*`) — todas passam a apontar para as da raiz.
- `public/images/alicate/PNG/`: **mantido**. São as exportações PNG de origem (96,7 MB) e já estão fora do git e do deploy por regra em `.gitignore`/`.vercelignore`. Não afetam o site; podem ser apagadas por você a qualquer momento.
- Dependência `@vercel/blob` permanece **apenas** para paleta/copy/orientação/checkout/tracking.

---

## 11. Critérios de aceite

1. **CTA na primeira dobra**: em 15 ofertas × 7 viewports (320×568, 360×640, 375×667, 390×844, 430×932, 1366×768, 1920×1080) o botão do hero fica 100% visível — verificado por medição automatizada.
2. **Limites de copy**: nenhuma oferta publica com campo acima do limite (verificação no `offer:validate`).
3. **Contraste**: toda paleta ativa passa WCAG AA nos pares reais (teste automatizado ampliado).
4. **Sem CSS por oferta**: nenhuma classe `*-offer` no CSS.
5. **Imagens**: toda oferta com os nomes padrão; nenhum arquivo órfão; nenhum PNG/JPG servido.
6. **Nenhum campo morto** no contrato.
7. **FAQ com exatamente 5 perguntas** e depoimentos com até 7 exibidos.
8. `npm run check` (test + validate + lint + typecheck + build) verde.

---

## 12. Roteiro de implementação

| Fase | Entrega |
|---|---|
| 1 | Limpeza: CSS morto, campos mortos, assets órfãos, páginas legais duplicadas, classes `*-offer` |
| 2 | Contrato novo (`OfferConfig` enxuto) + limites de copy + validador automático |
| 3 | Hero novo (ordem, limites, imagem adaptativa) + CTA na dobra validado por medição |
| 4 | Paletas: 5 candidatas + gerador + validação de contraste + tokens novos (mantendo CTA/bullets/glass) |
| 5 | Orientação do entregável (kit + bônus) e reescrita dos componentes de carrossel/bônus |
| 6 | Seções ligáveis/desligáveis + FAQ 5 + depoimentos até 7 |
| 7 | Painel `/painel` (login, preview, abas, upload em massa, gerar prompt/colar copy) + PIN fora do código |
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
CONTADOR_LABEL: ...
KIT_TITULO: ...
BENEFICIOS_TITULO: ...
BENEFICIO 1..4 (TITULO | DESCRICAO): ...
URGENCIA_TITULO: ...
URGENCIA_CORPO: ...
ENTREGAVEIS_TITULO: ...
ENTREGAVEIS_BULLET 1..10: ...
BONUS_TITULO: ...
BONUS_SUBTITULO: ...
BONUS 1..6 (TITULO | DESCRICAO): ...
PLANOS_TITULO: ...
PLANO 1..N ITEM 1..8: ...
GARANTIA_TITULO: ...
GARANTIA_CORPO: ...
ACESSO_TITULO: ...
ACESSO_PASSO 1..4 (TITULO | DESCRICAO): ...
FAQ 1..5 (PERGUNTA | RESPOSTA): ...
FOOTER_TITULO: ...
FOOTER_CORPO: ...
```

### 13.3 Colagem em massa ("Colar copy")

- O painel lê esse bloco, mostra **prévia campo por campo** com contador e limite, marca em vermelho o que estourou e só salva quando tudo estiver dentro do padrão (ou quando você confirmar exceções).

---

## 14. Execução (time de agentes)

- **Orquestrador**: DeepSeek V4.1 Flash (esta sessão) — mantém o contexto da auditoria, revisa cada entrega e faz a gestão das fases.
- **Agentes executores** (modelos por natureza da tarefa):
  - código/refatoração → Kimi K2.7 Code;
  - copy/limites de texto → GLM 5.3;
  - medição/QA e testes automatizados → Qwen 3.8 Max;
  - revisão crítica → DeepSeek V4 Pro.
- **Frentes paralelizáveis**: migração de copy das 15 ofertas (uma por agente), limpeza de assets por pasta, e o painel (que depende só do contrato).
- **Portões de qualidade por fase**: `npm run typecheck` + `npm test` + `npm run lint` + `npm run build`, mais a medição automatizada da primeira dobra a cada mudança de hero.
- Todas as fases terminam com o **doc atualizado** e um resumo do que mudou.

---

## 15. Pendências conhecidas

- Enviar os "elementos da oferta" (formato Obra 100k) de cada oferta que for reescrita — o gerador de prompt usa exatamente esse formato (§13.1).
- Definir o nome final do painel (`/painel` é a proposta) e a rota do atalho de paleta (`/<slug>/paleta` mantido).

---

## Anexo A — Contrato novo (Fase 2)

```ts
export interface OfferHero {
  pill: string            // ≤ 30 car., caixa alta
  headline: string        // ≤ 70 car.; "\n" força quebra de linha (não conta no limite)
  subline: string         // ≤ 70 car.
  image: string           // "plano-completo.webp"
  imageAlt: string
  support: string         // ≤ 160 car. (texto de apoio, depois do CTA)
  bullets: string[]       // exatamente 4, ≤ 34 car. cada
  ctaText: string         // ≤ 17 car.
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
  paletteCandidates?: OfferPalette[]        // 5 candidatas (Fase 4)
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
  | "socialProof" | "counter" | "kit" | "kitReversed" | "benefits" | "urgency"
  | "deliverables" | "bonuses" | "pricing" | "guarantee" | "access" | "faq" | "footer"
```

**Sai do contrato:** `titleLine1/2/3`, `audience`, `subtitle`, `subtitlePosition`, `socialProofCaption`, `timerLabel`, `marqueeGradient`, `testimonials[].gradient`, `questions`, `conclusion`, `urgency.pill`, `deliverables.pill`, `badgeText`, `touchHint`, `backHint`, `steps[].num`, `missionText`, `privacyLabel`, `termsLabel`, `kitCards.displayAspect`, `bonusSection.cardImageAspect`, `hero.imageWidth/imageHeight`, `deliverables.pill`, `footer.missionText`.

**Campos que permanecem quadrados:** `hero.image` e `pricing.plans[].image` (sempre 1080×1080).
