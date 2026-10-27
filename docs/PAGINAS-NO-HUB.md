# Páginas no hub (Fase 5)

O contrato completo está em `prado-company/docs/PAGINAS.md`. Resumo do lado do site:

- **Com `HUB_PAGES_URL` e `PAGES_SITE_TOKEN` configurados**, o site lê as páginas publicadas do hub
  (`GET <hub>/api/paginas/site`) em vez do Blob `admin/ofertas-operacionais.json`, com cache de 5 minutos e
  revalidação pedida pelo hub a cada gravação (`POST /api/paginas/revalidar`). O tamanho global também vem do hub.
- **Reserva:** se o hub não responder, vale a última leitura boa da instância; depois, a cópia que o hub grava no Blob
  (`paginas/hub-snapshot-<VERCEL_ENV>.json`); por fim, o `offer.ts` de cada página legada.
- `/previa/<id>?t=<token>` é a prévia do editor do hub: token HMAC assinado pelo hub, mensagens aceitas só da origem
  do hub.
- `/painel` redireciona para a aba Páginas do hub e o painel antigo deixa de gravar no Blob.
- **Sem `HUB_PAGES_URL`**, tudo funciona como antes (Blob + `offer.ts` + painel). Remover a variável é o caminho de
  volta.

Scripts:
- `npx tsx scripts/export-pages-for-hub.mts [saida.json]`: exporta a configuração efetiva de cada página (Blob ou
  `offer.ts`) para o importador do hub. Só lê.
- `node scripts/qa-hub-parity.mjs --antes <url> --depois <url>`: compara o HTML renderizado de cada página entre o
  site lendo o Blob e o site lendo o hub.

Conferência de 27/10/2026 (local, hub em PGlite com as 18 páginas importadas): 18/18 páginas idênticas, também com o
hub fora do ar (servidas pela cópia do Blob). O QA responsivo deu as mesmas falhas antes e depois (acordeão do FAQ e
estouro a 320 px com tamanho G), que já existem no site atual.
