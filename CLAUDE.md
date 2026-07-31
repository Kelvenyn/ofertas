@AGENTS.md

# CLAUDE.md — Páginas de Oferta (`ofertas`)

4 landing pages de venda low-ticket, cada uma em sua própria rota, compartilhando componentes de seção e a mesma infraestrutura de tracking (um painel externo, o "Hub").

Idioma padrão das respostas e notas de trabalho: português do Brasil.

## Ofertas

| Rota | Config | Checkout | Status |
|---|---|---|---|
| `/psicopedagogia` | `src/config/offers/psicopedagogia/offer.ts` | Cakto | ativa |
| `/laboral` | `src/config/offers/laboral/offer.ts` (herda de psicopedagogia) | Cakto | ativa |
| `/castracao` | `src/config/offers/castracao/offer.ts` (herda de laboral) | Cakto | ativa |
| `/lembrancinhas` | `src/config/offers/lembrancinhas/offer.ts` (independente) | **sem checkout** (`ctaHref: "#"`, placeholder) | inativa |

`/` (raiz) só faz `redirect("/lembrancinhas")` — não é um hub navegável, e não há link cruzado entre ofertas. Só `psicopedagogia` e `lembrancinhas` têm páginas de política de privacidade/termos de uso; `laboral` e `castracao` não têm.

Antes de reativar `lembrancinhas`: cadastrar o produto na Cakto e trocar os dois `ctaHref` de `"#"` para o link real (`https://pay.cakto.com.br/...`).

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
src/app/<oferta>/page.tsx            # composição das seções (laboral reexporta psicopedagogia)
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
4. Antes de reativar uma oferta inativa, confirmar que o `ctaHref` aponta para um checkout Cakto real, não placeholder.
