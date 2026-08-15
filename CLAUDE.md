@AGENTS.md

# CLAUDE.md — Páginas de Oferta (`ofertas`)

7 landing pages de venda low-ticket, cada uma em sua própria rota, compartilhando componentes de seção e a mesma infraestrutura de tracking (um painel externo, o "Hub").

Idioma padrão das respostas e notas de trabalho: português do Brasil.

## Ofertas

| Rota | Config | Página | Checkout | Status |
|---|---|---|---|---|
| `/psicopedagogia` | `src/config/offers/psicopedagogia/offer.ts` | própria | Cakto | ativa |
| `/laboral` | `src/config/offers/laboral/offer.ts` (herda de psicopedagogia) | reexporta psicopedagogia | Cakto | ativa |
| `/castracao` | `src/config/offers/castracao/offer.ts` (herda de laboral) | própria | Cakto | ativa |
| `/confissao` | `src/config/offers/confissao/offer.ts` (herda de laboral) | reexporta psicopedagogia | Cakto | ativa |
| `/croqui` | `src/config/offers/croqui/offer.ts` (herda de laboral) | própria | Cakto | ativa |
| `/jardim` | `src/config/offers/jardim/offer.ts` (herda de psicopedagogia) | própria | Cakto | ativa |
| `/lembrancinhas` | `src/config/offers/lembrancinhas/offer.ts` (independente) | própria | Cakto | ativa — **é o destino do redirect da raiz (`/`)** |

`/` (raiz) faz `redirect("/lembrancinhas")` — ou seja, todo o tráfego que bate na raiz do domínio cai nessa oferta; não é um hub navegável, e não há link cruzado entre ofertas. Todas as 7 ofertas têm checkout Cakto real configurado (nenhum `ctaHref` placeholder). Política de privacidade e termos de uso são só as páginas genéricas da raiz (`/politica-de-privacidade`, `/termos-de-uso`) — o `footer.privacyUrl`/`termsUrl` de todas as 7 ofertas aponta para elas. Não crie página de política/termos dentro de `src/app/<oferta>/`: já existiram versões desatualizadas ali (citavam produto e tracking antigos) e foram removidas em favor da página única da raiz.

## Composição das páginas

Todas as 7 ofertas renderizam as seções na mesma ordem fixa (definida em cada `page.tsx`):

```text
CountdownBar → VendaImediata (hero) → SocialProof → CounterPainPoints →
KitCards → KitCardsReversed → Benefits → Urgencia → TudoQueVoceRecebe →
Bonuses → OfferPricing → Guarantee → ComoEAcesso → FAQ → Footer
```

## Pontos de atenção conhecidos

- Imagens de "kit"/carrossel (`kitCards`) e de bônus (`bonusSection`) podem ser retrato ou paisagem — o contrato já prevê isso via `kitCards.displayAspect` e `bonusSection.cardImageAspect` (`src/types/offer.ts`). Ao adicionar imagens novas ou uma oferta nova, sempre declarar essas duas flags de acordo com a orientação real do arquivo — deixá-las no padrão quando o material é retrato causa um salto de layout no carrossel assim que a imagem carrega.
- As imagens de "Plano Completo"/"Plano Básico" (usadas no hero, em `TudoQueVoceRecebe` e em `OfferPricing`) são sempre quadradas em todas as 7 ofertas hoje. `hero.imageWidth`/`imageHeight` em cada `offer.ts` deve bater com a proporção real do arquivo — um valor de proporção diferente da imagem real causa reflow visível assim que ela carrega (o CSS usa `height: auto`).

## Tracking

Cada `layout.tsx` de oferta carrega `<Script src="https://hub.universoeduk.com/tracker.js" strategy="afterInteractive" />` — esse script, servido por outro repositório (o Hub), inicializa Meta Pixel + CAPI com dedup por `event_id` e decide os pixels ativos via `/api/config`. **Nunca embarcar pixel Meta, GTM ou Utmify direto numa página** — duplica PageView/ViewContent e quebra a atribuição. `ggCheckout`, `Hotmart` e `Utmify` foram removidos deliberadamente do projeto inteiro (2026-07-31) — não reintroduzir sem necessidade real de negócio.

`src/lib/trackhub.ts` (`trackEvent`) dispara eventos customizados client-side via `window.trackhub.track(...)`, com retry de até 3s aguardando o script do Hub carregar (ele é assíncrono e pode não estar pronto no primeiro render).

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
src/app/<oferta>/layout.tsx          # metadata + carregamento do tracker.js do Hub
src/app/<oferta>/page.tsx            # composição das seções (laboral e confissao reexportam psicopedagogia)
src/config/offers/<oferta>/offer.ts  # conteúdo/cores/copy/checkout da oferta
src/types/offer.ts                   # contrato OfferConfig
src/lib/trackhub.ts                  # trackEvent(), ponte com o tracker.js do Hub
src/components/sections/             # blocos de seção reutilizáveis entre ofertas
docs/research/                       # material de pesquisa/benchmark visual (não é doc do projeto)
```

## Regras de Produto

1. Checkout: só Cakto. Nunca apontar `ctaHref` para ggCheckout ou Hotmart.
2. Tracking: só via `tracker.js` do Hub. Nunca pixel/GTM/Utmify embarcado numa página de oferta.
3. Conteúdo de oferta fica em `offer.ts`, nunca hardcoded num componente de seção.
4. Antes de publicar uma oferta nova, confirmar que todo `ctaHref` aponta para um checkout Cakto real, não placeholder (`"#"`).
