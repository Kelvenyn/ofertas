# Low Ticket Landing Template

Template Next.js para criar landing pages de ofertas low ticket a partir de uma OA100K.

O fluxo esperado e:

1. Receber a OA100K da oferta.
2. Transformar a OA100K em copy de pagina.
3. Atualizar `src/config/offer.ts` com copy, checkout, paleta e imagens.
4. Trocar os assets em `public/images`.
5. Validar build e publicar.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Estrutura Principal

```text
src/app/page.tsx                 Ordem das secoes da landing
src/app/globals.css              Estilos globais e estilos das secoes
src/config/offer.ts              Conteudo, imagens, precos e paleta da oferta
src/types/offer.ts               Contrato TypeScript da oferta
src/components/sections          Blocos reutilizaveis da pagina
src/components/ui                Componentes visuais compartilhados
public/images                    Assets da oferta atual
```

## Como Criar Uma Nova Oferta

1. Duplique ou substitua a configuracao em `src/config/offer.ts`.
2. Atualize `meta`, `palette`, `hero`, `benefits`, `bonuses`, `pricing`, `guarantee`, `access`, `faq` e `footer`.
3. Coloque as novas imagens em `public/images`.
4. Referencie as imagens sempre como `/images/nome-do-arquivo.webp`.
5. Rode `npm run typecheck` e `npm run build`.

## Cuidados De Template

- Toda copy variavel deve viver em `src/config/offer.ts`.
- Evite textos fixos dentro dos componentes quando forem especificos da oferta.
- Use imagens otimizadas em WebP.
- Remova assets antigos quando uma oferta for substituida.
- Mantenha a pagina leve: menos scripts, menos animacoes infinitas, menos imagens duplicadas.
