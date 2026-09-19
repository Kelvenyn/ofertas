# Ofertas — Landing Pages Universo Eduk

Projeto Next.js com **15 landing pages de venda low-ticket**, cada uma em sua própria rota,
compartilhando shell de seções, catálogo, temas e tracking opcional da Cashflow. Ver `CLAUDE.md`
para a documentação completa e `AGENTS.md`/`PRODUCT.md`/`DESIGN.md` para convenções de edição e
sistema de design.

## Ofertas ativas

| Rota | Produto |
|---|---|
| `/alicate` | Manual prático de alicate amperímetro |
| `/box` | Guia passo a passo de box com tijolos e blocos de vidro |
| `/calha` | Guia prático de calhas e rufos |
| `/psicopedagogia` | Mapa de Perfil Infantil para psicopedagogas iniciantes |
| `/laboral` | Dinâmicas prontas de ginástica laboral |
| `/castracao` | Mapa visual de preparação para castração (veterinária) |
| `/confissao` | Guia visual da confissão católica |
| `/croqui` | Bases de croqui para desenho de moda |
| `/felinos` | Mapa dos comportamentos felinos |
| `/higienizacao` | Manual de higienização de estofados |
| `/jardim` | Projetos de jardins verticais |
| `/lavanderia` | Projetos de áreas de serviço pequenas |
| `/lembrancinhas` | Lembrancinhas cristãs para encontros — **também é o destino de `/`** |
| `/tilapia` | Projetos visuais de criadouros de tilápia |
| `/porcelanato` | Guia visual do porcelanato |

As ofertas usam checkout Cakto ou Hotmart. Quando configurado no catálogo, o layout compartilhado
carrega o script fornecido pela Cashflow; ofertas sem essa configuração continuam públicas e são
marcadas como `tracking pendente` no painel.

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
src/app/<oferta>/                    Adapters mínimos para o shell e editor protegido de paleta
src/components/OfferPage.tsx         Composição única das seções
src/components/OfferRouteLayout.tsx  Metadata, status, tema e Cashflow
src/config/offers/<oferta>/offer.ts  Conteúdo, imagens, preços e checkout da oferta
src/config/offers/catalog.json       Status, preset, favicon e Cashflow por oferta
src/config/offers/palettes.ts        Dez presets globais acessíveis
src/types/offer.ts                   Contrato TypeScript OfferConfig, compartilhado por todas
src/components/sections/             Blocos de seção reutilizáveis entre ofertas
src/components/ui/                   Componentes visuais compartilhados (botões, cards, etc.)
src/app/globals.css                  Estilos globais e estilos das seções
public/images/<oferta>/              Assets de cada oferta
```

`paletteKey: null` no catálogo preserva exatamente a paleta de `offer.ts`. Uma chave seleciona um
dos dez presets globais; verde de CTA/bullets e vermelho de urgência são tokens semânticos fixos.
Use `/admin/ofertas` e `/<slug>/paleta` para administrar status e paletas. O acesso exige as variáveis privadas `ADMIN_EMAIL` e `ADMIN_PASSWORD`; os ajustes salvos ficam no Blob privado da Vercel e entram em vigor sem um novo commit.

## Como criar uma oferta nova

Use o skill local `$nova-oferta` com a pasta-fonte e o slug. Ele lê `PV.txt`, inventaria os assets,
roda o importador determinístico, cria a entrada como `draft` e orienta a adaptação da copy ao
contrato atual. O comando mecânico também pode ser inspecionado antes de gravar:

```bash
node scripts/import-offer.mjs --source <pasta> --slug <slug> --dry-run
node scripts/import-offer.mjs --source <pasta> --slug <slug>
node scripts/validate-offers.mjs
```

Só promova a oferta para `active` depois de configurar checkouts reais, concluir lint, typecheck,
build e validar a página em desktop e mobile. O importador preserva a pasta-fonte e recusa
sobrescrever um slug existente.

## Cuidados de edição

- Toda copy variável de uma oferta vive em `offer.ts`, nunca hardcoded num componente de seção.
- Antes de remover imagens de `public/images/<oferta>/`, confirme que não são referenciadas em
  `offer.ts`.
- Nunca embarcar pixel Meta, GTM ou Utmify direto numa página; tracking é somente pelo script
  Cashflow configurado no catálogo.
- Quando uma mudança afetar layout, valide desktop e mobile.
