# Agent Notes

Este projeto e um template de landing page low ticket. O objetivo nao e clonar sites; o objetivo e receber uma OA100K, gerar copy comercial e preencher uma landing reutilizavel com nova copy, paleta, imagens e checkout.

## Prioridades

- Manter a pagina rapida, leve e mobile-first.
- Centralizar conteudo variavel em `src/config/offer.ts`.
- Preservar componentes de secao como blocos reutilizaveis.
- Evitar hardcode de copy especifica da oferta dentro dos componentes.
- Remover assets antigos quando nao forem referenciados pela oferta atual.

## Comandos

```bash
npm run dev
npm run typecheck
npm run build
npm run lint
```

## Arquivos Importantes

- `src/config/offer.ts`: fonte principal da oferta atual.
- `src/types/offer.ts`: contrato da configuracao.
- `src/app/page.tsx`: ordem das secoes.
- `src/app/globals.css`: estilos da landing.
- `public/images`: imagens da oferta atual.

## Regras De Edicao

- Antes de remover imagens, confirme se elas nao aparecem em `src/config/offer.ts`.
- Antes de adicionar dependencias, verifique se a solucao nao pode ser feita com React, CSS e componentes existentes.
- Quando uma mudanca afetar layout, valide desktop e mobile.
- Depois de alteracoes relevantes, rode `npm run typecheck` e `npm run build`.
