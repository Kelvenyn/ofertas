# Agent Notes

Projeto com 13 landing pages de venda low-ticket, cada uma em sua própria rota, compartilhando
componentes de seção, catálogo operacional, paletas e tracking opcional da Cashflow. Ler
`CLAUDE.md` para a lista completa de ofertas e regras de produto, `PRODUCT.md` para brand/design
principles e `DESIGN.md` para o sistema de design compartilhado. Ao criar/importar uma oferta a
partir de uma pasta com `PV.txt` e imagens, usar o skill `$nova-oferta`.

## Prioridades

- Manter as páginas rápidas, leves e mobile-first.
- Centralizar conteúdo variável em `src/config/offers/<oferta>/offer.ts` (contrato em `src/types/offer.ts`).
- Preservar componentes de seção como blocos reutilizáveis entre ofertas.
- Evitar hardcode de copy específica de uma oferta dentro dos componentes de seção.
- Criar ofertas novas como `draft`; ativar somente após checkout, validações e QA visual.
- Remover assets antigos quando não forem referenciados pela oferta atual.

## Comandos

```bash
npm run dev
npm run typecheck
npm run build
npm run lint
```

## Arquivos Importantes

- `src/config/offers/<oferta>/offer.ts`: conteúdo comercial das 13 ofertas: `alicate`, `castracao`, `confissao`, `croqui`, `felinos`, `higienizacao`, `jardim`, `laboral`, `lavanderia`, `lembrancinhas`, `porcelanato`, `psicopedagogia` e `tilapia`.
- `src/config/offers/catalog.json`: configuração-base versionada (status, paleta, favicon e Cashflow); alterações operacionais publicadas pelo painel são mantidas no Blob privado da Vercel.
- `src/types/offer.ts`: contrato `OfferConfig` compartilhado por todas as ofertas.
- `src/components/OfferPage.tsx` e `src/components/OfferRouteLayout.tsx`: composição e layout compartilhados.
- `src/app/<oferta>/`: adapters mínimos de rota e editor de paleta protegido.
- `src/app/globals.css`: estilos globais (Tailwind v4, CSS-first).
- `public/images/<oferta>/`: imagens da oferta.

## Regras de Edição

- Antes de remover imagens, confirme se elas não aparecem em `src/config/offers/<oferta>/offer.ts`.
- Antes de adicionar dependências, verifique se a solução não pode ser feita com React, CSS e componentes existentes.
- Quando uma mudança afetar layout, valide desktop e mobile.
- Depois de alterações relevantes, rode `npm run typecheck` e `npm run build`.
- Tracking é somente pelo script fornecido pela Cashflow e configurado no catálogo; nunca embarcar pixel Meta, GTM ou Utmify direto numa oferta.
