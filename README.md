# Ofertas — Landing Pages Universo Eduk

Projeto Next.js com **7 landing pages de venda low-ticket**, cada uma em sua própria rota,
compartilhando componentes de seção e a mesma infraestrutura de tracking (um painel externo,
o "Hub"). Ver `CLAUDE.md` para a documentação completa (lista de ofertas, regras de produto,
tracking) e `AGENTS.md`/`PRODUCT.md`/`DESIGN.md` para convenções de edição e sistema de design.

## Ofertas ativas

| Rota | Produto |
|---|---|
| `/psicopedagogia` | Mapa de Perfil Infantil para psicopedagogas iniciantes |
| `/laboral` | Dinâmicas prontas de ginástica laboral |
| `/castracao` | Mapa visual de preparação para castração (veterinária) |
| `/confissao` | Guia visual da confissão católica |
| `/croqui` | Bases de croqui para desenho de moda |
| `/jardim` | Projetos de jardins verticais |
| `/lembrancinhas` | Lembrancinhas cristãs para encontros — **também é o destino de `/`** |

Todas usam checkout Cakto e o mesmo script de tracking do Hub (`hub.universoeduk.com/tracker.js`).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 (CSS-first, sem `tailwind.config` clássico)
- `lenis` (smooth scroll)

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Estrutura principal

```text
src/app/<oferta>/layout.tsx          Metadata da oferta + carregamento do tracker.js do Hub
src/app/<oferta>/page.tsx            Composição das seções da oferta
src/config/offers/<oferta>/offer.ts  Conteúdo, paleta, imagens, preços e checkout da oferta
src/types/offer.ts                   Contrato TypeScript OfferConfig, compartilhado por todas
src/components/sections/             Blocos de seção reutilizáveis entre ofertas
src/components/ui/                   Componentes visuais compartilhados (botões, cards, etc.)
src/lib/trackhub.ts                  trackEvent(), ponte com o tracker.js do Hub
src/app/globals.css                  Estilos globais e estilos das seções
public/images/<oferta>/              Assets de cada oferta
```

Cada oferta define sua própria paleta de cor em `offer.ts` (`palette`), aplicada via CSS
custom properties no `layout.tsx` correspondente — não existe uma paleta única global.

## Como criar uma oferta nova

1. Duplique uma pasta existente próxima do novo produto em `src/config/offers/<nova-oferta>/offer.ts`
   (ofertas que herdam de outra, como `castracao` herda de `laboral`, reduzem bastante a
   quantidade de campos que precisam ser reescritos — ver exemplos no próprio repositório).
2. Preencha `meta`, `palette`, `hero`, `benefits`, `bonuses`, `pricing`, `guarantee`, `access`,
   `faq` e `footer` de acordo com o contrato `OfferConfig` em `src/types/offer.ts`.
3. Coloque as imagens em `public/images/<nova-oferta>/` e referencie como
   `/images/<nova-oferta>/arquivo.webp`.
4. Declare `kitCards.displayAspect` e `bonusSection.cardImageAspect` como `"portrait"` quando
   o material for retrato — o padrão assume paisagem.
5. Crie `src/app/<nova-oferta>/layout.tsx` (metadata + `<Script>` do tracker do Hub) e
   `src/app/<nova-oferta>/page.tsx` (composição das seções, mesma ordem usada nas outras ofertas).
6. Troque o `ctaHref` de cada plano em `pricing.plans` para o link real de checkout Cakto —
   nunca deixar placeholder (`"#"`) numa oferta publicada.
7. Rode `npm run typecheck` e `npm run build` antes de considerar pronto.

## Cuidados de edição

- Toda copy variável de uma oferta vive em `offer.ts`, nunca hardcoded num componente de seção.
- Antes de remover imagens de `public/images/<oferta>/`, confirme que não são referenciadas em
  `offer.ts`.
- Nunca embarcar pixel Meta, GTM ou Utmify direto numa página — o tracking é só via `tracker.js`
  do Hub (ver `CLAUDE.md`).
- Quando uma mudança afetar layout, valide desktop e mobile.
