# Agent Notes

Projeto com 7 landing pages de venda low-ticket, cada uma em sua própria rota, compartilhando
componentes de seção e a mesma infraestrutura de tracking (um painel externo, o "Hub"). Ler
`CLAUDE.md` para a lista completa de ofertas e regras de produto, `PRODUCT.md` para brand/design
principles e `DESIGN.md` para o sistema de design compartilhado (cada oferta troca cores via
`palette` em `offer.ts`; layout, tipografia e padrões de componente são os mesmos entre ofertas).

## Prioridades

- Manter as páginas rápidas, leves e mobile-first.
- Centralizar conteúdo variável em `src/config/offers/<oferta>/offer.ts` (contrato em `src/types/offer.ts`).
- Preservar componentes de seção como blocos reutilizáveis entre ofertas.
- Evitar hardcode de copy específica de uma oferta dentro dos componentes de seção.
- Remover assets antigos quando não forem referenciados pela oferta atual.

## Comandos

```bash
npm run dev
npm run typecheck
npm run build
npm run lint
```

## Arquivos Importantes

- `src/config/offers/<oferta>/offer.ts`: fonte de conteúdo de cada oferta (7 hoje: `psicopedagogia`, `laboral`, `castracao`, `confissao`, `croqui`, `jardim`, `lembrancinhas` — ver tabela completa em `CLAUDE.md`).
- `src/types/offer.ts`: contrato `OfferConfig` compartilhado por todas as ofertas.
- `src/app/<oferta>/layout.tsx`: metadata + carregamento do `tracker.js` do Hub.
- `src/app/<oferta>/page.tsx`: composição das seções da oferta.
- `src/app/globals.css`: estilos globais (Tailwind v4, CSS-first).
- `public/images/<oferta>/`: imagens da oferta.

## Regras de Edição

- Antes de remover imagens, confirme se elas não aparecem em `src/config/offers/<oferta>/offer.ts`.
- Antes de adicionar dependências, verifique se a solução não pode ser feita com React, CSS e componentes existentes.
- Quando uma mudança afetar layout, valide desktop e mobile.
- Depois de alterações relevantes, rode `npm run typecheck` e `npm run build`.
- Nunca embarcar pixel Meta, GTM ou Utmify direto numa página — o tracking é só via `tracker.js` do Hub (ver `CLAUDE.md`).
