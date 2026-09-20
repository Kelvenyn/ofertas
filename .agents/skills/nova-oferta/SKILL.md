---
name: nova-oferta
description: Importe e configure uma nova landing page de oferta neste projeto quando o pedido fornecer uma pasta de materiais e um slug, ou pedir para criar uma oferta a partir de PV.txt e imagens.
---

# Nova oferta

Transforme uma pasta-fonte em uma oferta `draft`, usando a estrutura compartilhada do projeto. O importador resolve o trabalho mecânico; a adaptação da copy exige julgamento editorial.

## Entrada

Obtenha a pasta-fonte e o slug. Se um deles não estiver explícito, pergunte antes de executar. Trate a pasta-fonte como somente leitura.

## Fluxo

1. Leia `AGENTS.md`, `CLAUDE.md`, o contrato em `src/types/offer.ts`, o catálogo e uma oferta de referência indicada pelo usuário ou próxima do produto.
2. Leia integralmente `PV.txt` na pasta-fonte e inventarie os arquivos de imagem. Identifique orientação, dimensões, pares frente/verso, depoimentos e mockups antes de classificar os assets.
3. Rode primeiro:

   ```bash
   node scripts/import-offer.mjs --source <pasta> --slug <slug> --dry-run
   ```

   Confira o plano, os nomes normalizados e qualquer campo ausente. O importador deve recusar slug existente e preservar os arquivos-fonte.
4. Pergunte somente fatos comerciais que não possam ser inferidos dos materiais ou do repositório: preços, checkouts, garantia, identificadores Cashflow e promessas que mudem a oferta. Não peça ao usuário decisões de estrutura já fixadas pelo shell compartilhado.
5. Execute o importador sem `--dry-run`. Confirme que o catálogo registrou a oferta como `draft` e que os assets WebP ficaram em `public/images/<slug>/`.
6. Adapte os blocos de `PV.txt` ao `OfferConfig` gerado. Preserve o sentido e as promessas do material; complete apenas texto estrutural recorrente com base na oferta de referência. Mantenha toda copy variável em `offer.ts`.
7. Configure checkout e Cashflow somente com valores reais fornecidos. Sem checkout válido, mantenha os CTAs explicitamente desabilitados. Sem Cashflow, deixe a configuração ausente e reporte `tracking pendente`.
8. Rode:

   ```bash
   node scripts/validate-offers.mjs
   npm run lint
   npm run typecheck
   npm run build
   ```

9. Faça QA desktop e mobile da rota, incluindo carregamento das imagens, proporções, contraste, carrosséis, CTAs e ausência de layout shift. Compare a ordem e o comportamento das seções com a oferta de referência.

## Gate de publicação

Mantenha a oferta em `draft` até que checkouts reais, validação, build e QA visual estejam concluídos. Promova para `active` somente quando o usuário pedir publicação ou quando a tarefa incluir explicitamente a ativação após esses gates. Registre campos pendentes no resumo final.
