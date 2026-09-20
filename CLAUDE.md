@AGENTS.md

# Ofertas low-ticket

Aplicação Next.js com 15 landing pages em português, componentes compartilhados e conteúdo por oferta em `src/config/offers/<slug>/offer.ts`.

## Rotas publicadas

| Rota | Checkout |
|---|---|
| `/alicate` | Hotmart |
| `/box` | Hotmart |
| `/calha` | Hotmart |
| `/castracao` | Cakto |
| `/confissao` | Cakto |
| `/croqui` | Cakto |
| `/felinos` | Hotmart |
| `/higienizacao` | Hotmart |
| `/jardim` | Cakto |
| `/laboral` | Cakto |
| `/lavanderia` | Hotmart |
| `/lembrancinhas` | Cakto |
| `/porcelanato` | Hotmart |
| `/psicopedagogia` | Hotmart |
| `/tilapia` | Hotmart |

`universoeduk.com` é o domínio principal e sua raiz redireciona para `/painel`; `www.universoeduk.com` redireciona permanentemente para o domínio principal. Em URLs técnicas e previews, `/` continua usando `homepageOffer` do catálogo. Novas ofertas importadas começam em `draft`; só ficam públicas após checkout válido, validação e QA visual.

## Fonte de conteúdo e catálogo

`OfferConfig` em `src/types/offer.ts` é o contrato das seções, copy, cores, orientação e links. Cada oferta guarda sua configuração inicial em `offer.ts`. O catálogo versionado (`src/config/offers/catalog.json`) contém label, favicon e Cashflow opcional. O painel persiste as alterações operacionais completas no Blob privado da Vercel.

As páginas usam `OfferPage` e componentes de seção compartilhados; conteúdo específico não deve ser codificado nos componentes. A composição de `sections` pode habilitar ou desabilitar blocos. O primeiro CTA permanece totalmente visível na primeira dobra. Trilhos demonstrativos são full-bleed, usam imagens sem corte, até 92vw no mobile e 360–420px no desktop.

## Painel e cores

`/painel` exige sessão administrativa por `ADMIN_EMAIL`/`ADMIN_PASSWORD`. O atalho `/<slug>/paleta` e as APIs do painel usam a mesma sessão; não existe PIN separado. Rotas antigas `/admin/*` redirecionam para `/painel`.

Cada oferta apresenta cinco paletas candidatas validadas para contraste WCAG AA. CTA e bullets permanecem verdes, urgência permanece vermelha. O editor administra copy, imagens, orientação, checkout, Cashflow e seções; preview e edição de copy são atualizados ao vivo.

## Mídia e tracking

`public/` contém apenas assets WebP com nomes canônicos. Originais locais ficam em `.local-assets/`, fora da área servida, do Git e do deploy. O painel converte PNG/JPG enviados para WebP antes do upload ao Blob.

Cashflow é opcional e só carrega o script oficial quando IDs estão configurados. Preserve os atributos de compatibilidade do script em `OfferRouteLayout`. Nunca adicionar pixel Meta, GTM ou Utmify diretamente às páginas.

## Estrutura

- `src/components/OfferPage.tsx`: composição compartilhada.
- `src/components/OfferRouteLayout.tsx`: tema, metadados, gate de rascunho e Cashflow.
- `src/app/painel/`: painel autenticado e preview.
- `src/config/offers/catalog.json`: configuração operacional base das rotas.
- `src/types/offer.ts`: contrato `OfferConfig`.
- `src/app/globals.css`: CSS global com Tailwind v4.
- `docs/PADRONIZACAO-LP.md`: limites de copy, critérios visuais e contrato detalhado; leia antes de mudar copy, layout ou seções.

## Regras de produto

1. Checkouts públicos devem apontar para Cakto ou Hotmart e estar ativos.
2. Manter tracking somente pelo script configurado da Cashflow.
3. Manter copy variável em `offer.ts`/Blob e componentes de seção reutilizáveis.
4. Importar novas ofertas pelo skill `$nova-oferta`; validar checkout, contrato e visual antes de remover `draft`.
5. Remover uma imagem somente depois de confirmar que não é referenciada por uma oferta ativa.
