@AGENTS.md

# CLAUDE.md — Páginas de Oferta (`ofertas`)

15 landing pages de venda low-ticket, cada uma em sua própria rota, compartilhando shell de seções, catálogo operacional, temas e tracking opcional da Cashflow.

Idioma padrão das respostas e notas de trabalho: português do Brasil.

## Ofertas

| Rota | Config | Checkout | Status |
|---|---|---|---|
| `/alicate` | `src/config/offers/alicate/offer.ts` | Hotmart | ativa |
| `/box` | `src/config/offers/box/offer.ts` | Hotmart | ativa |
| `/calha` | `src/config/offers/calha/offer.ts` | Hotmart | ativa |
| `/castracao` | `src/config/offers/castracao/offer.ts` | Cakto | ativa |
| `/confissao` | `src/config/offers/confissao/offer.ts` | Cakto | ativa |
| `/croqui` | `src/config/offers/croqui/offer.ts` | Cakto | ativa |
| `/felinos` | `src/config/offers/felinos/offer.ts` | Hotmart | ativa |
| `/higienizacao` | `src/config/offers/higienizacao/offer.ts` | Hotmart | ativa |
| `/jardim` | `src/config/offers/jardim/offer.ts` | Cakto | ativa |
| `/laboral` | `src/config/offers/laboral/offer.ts` | Cakto | ativa |
| `/lavanderia` | `src/config/offers/lavanderia/offer.ts` | Hotmart | ativa |
| `/lembrancinhas` | `src/config/offers/lembrancinhas/offer.ts` | Cakto | ativa — **destino da raiz (`/`)** |
| `/porcelanato` | `src/config/offers/porcelanato/offer.ts` | Hotmart | ativa |
| `/psicopedagogia` | `src/config/offers/psicopedagogia/offer.ts` | Hotmart | ativa |
| `/tilapia` | `src/config/offers/tilapia/offer.ts` | Hotmart | ativa |

`/` usa `homepageOffer` do catálogo, hoje `lembrancinhas`; não é um diretório público das ofertas. Em produção, rotas `draft` e `archived` respondem 404. Política de privacidade e termos de uso são as páginas genéricas da raiz (`/politica-de-privacidade`, `/termos-de-uso`); não crie cópias dentro de cada oferta.

## Composição das páginas

Todas as ofertas renderizam pelo shell `OfferPage` na mesma ordem fixa:

```text
CountdownBar → VendaImediata (hero) → SocialProof → CounterPainPoints →
KitCards → KitCardsReversed → Benefits → Urgencia → TudoQueVoceRecebe →
Bonuses → OfferPricing → Guarantee → ComoEAcesso → FAQ → Footer
```

Ordem do hero (§3.1 do plano): Pill → Headline → Subline → Imagem → CTA (`#oferta`, último da dobra) → Apoio → 4 Bullets → Marquee. Contrato em `src/types/offer.ts` (Fase 2); limites de copy na §6 do plano, verificados como avisos por `npm run offer:validate`.

## Pontos de atenção conhecidos

- Imagens de "kit"/carrossel (`kitCards`) e de bônus seguem o `orientation` da oferta (`"portrait"` ou `"landscape"` em `offer.ts`, validado como erro pelo `offer:validate`). Não existem mais flags por bloco: retrato força 3/4, paisagem usa placeholder 3/2 e refina para a proporção natural ao carregar.
- As imagens de "Plano Completo"/"Plano Básico" (usadas no hero, em `TudoQueVoceRecebe` e em `OfferPricing`) são sempre quadradas (1080×1080). A imagem do hero é absoluta contida na área flex da dobra (`.vi-fold`, altura fixa `100svh` com descontos) — não dimensione via `width`/`height` no componente.

## Catálogo, paletas e tracking

`src/config/offers/catalog.json` é a configuração-base versionada: `status` (`draft`, `active` ou `archived`), preset de paleta (`paletteKey`), classe legada (`className`, em remoção na Fase 8), favicon e configuração Cashflow opcional. O painel publicado grava somente os overrides de status e paleta no Blob privado da Vercel. Ausência de Cashflow não bloqueia a página, mas aparece como `tracking pendente` no painel e no `offer:validate`.

`OfferRouteLayout` carrega `https://cashflow.mentoriaprocesso.com/t/p.js` com `afterInteractive` somente quando `cashflow` estiver configurado no catálogo. Preserve `data-offer`, `data-nowprocket`, `data-no-minify`, `data-no-optimize` e `data-cfasync`. Nunca embarque pixel Meta, GTM ou Utmify diretamente.

Há dez presets globais em `src/config/offers/palettes.ts`; CTA e bullets permanecem verdes e elementos de urgência permanecem vermelhos. Uma oferta com `paletteKey: null` preserva a paleta de `offer.ts`. Em qualquer ambiente, `/admin/ofertas` e `/<slug>/paleta` exigem sessão administrativa (`ADMIN_EMAIL`/`ADMIN_PASSWORD` na Vercel) e PIN de confirmação para salvar — hoje hardcoded como `"1010"` (`PaletteEditor.tsx`, API `admin/offers/[slug]`, `AdminOffersClient.tsx`); a Fase 4 troca por `PALETTE_PIN` de ambiente. O PIN previne cliques acidentais, não substitui a autenticação.

## Stack

Next.js ^16.2.7 (App Router) · React 19.2.4 · TypeScript · Tailwind v4 (CSS-first, sem `tailwind.config` clássico) · `lenis` (smooth scroll) · `lucide-react`. Sem framer-motion/gsap — animação é CSS + lenis.

## Como Rodar / Verificar

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Estrutura Relevante

```text
src/app/<oferta>/                    # adapters mínimos para o shell compartilhado e editor protegido
src/config/offers/<oferta>/offer.ts  # conteúdo/cores/copy/checkout da oferta
src/config/offers/catalog.json       # status, preset, favicon e Cashflow
src/types/offer.ts                   # contrato OfferConfig
src/components/OfferPage.tsx         # composição única das seções
src/components/OfferRouteLayout.tsx  # metadata, status, tema e Cashflow
src/components/sections/             # blocos de seção reutilizáveis entre ofertas
docs/research/                       # material de pesquisa/benchmark visual (não é doc do projeto)
```

## Regras de Produto

1. Checkout: usar Cakto ou Hotmart. Nunca apontar `ctaHref` para ggCheckout; mantenha um URL real do provedor configurado para a oferta.
2. Tracking: somente Cashflow configurada no catálogo. Nunca pixel/GTM/Utmify embarcado numa página de oferta.
3. Conteúdo de oferta fica em `offer.ts`, nunca hardcoded num componente de seção.
4. Novas ofertas começam `draft`. Antes de ativar, confirmar checkouts Cakto/Hotmart reais, executar `node scripts/validate-offers.mjs`, lint, typecheck, build e QA desktop/mobile. Ofertas sem checkout devem declarar `ctaDisabled: true` em todos os planos.
5. Para importar uma pasta com `PV.txt` e imagens, usar o skill `$nova-oferta`; ele preserva a pasta-fonte e delega conversão/scaffold ao importador determinístico.
