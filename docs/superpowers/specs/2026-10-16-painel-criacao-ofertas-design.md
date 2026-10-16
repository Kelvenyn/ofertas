# Criação de ofertas pelo painel

## Objetivo

Permitir que a equipe crie uma nova oferta pela área administrativa, sem editar o repositório ou publicar um deploy para cada cadastro. A oferta nasce como rascunho, pode ser editada no painel existente e só fica pública após atender aos mesmos requisitos de ativação das demais ofertas.

## Escopo aprovado

- O painel terá a ação **Nova oferta**.
- O único modelo inicial será **Psicopedagogia**. O fluxo coleta o nome de exibição e uma slug sugerida a partir do nome, permitindo revisar a slug antes de criar.
- A nova oferta recebe um ID estável independente da slug e é salva no catálogo operacional privado do Vercel Blob.
- O cadastro clona a configuração de Psicopedagogia, limpa checkout e Cashflow, desabilita os CTAs e define o status `draft`.
- Após criar, o painel abre o editor da nova oferta. Copy, imagens, cores, orientação, seções, checkout e tracking usam o editor e os endpoints atuais.
- Enquanto imagens do modelo continuarem referenciadas, o editor avisa que elas são herdadas. A ativação exige substituir as imagens herdadas, ter checkout HTTPS válido, passar validação e concluir QA visual.
- A rota dinâmica existente renderiza previews administrativos e páginas públicas de IDs armazenados no Blob. Ofertas `draft` e `inactive` continuam respondendo 404 ao público.

## Dados e persistência

O Blob operacional permanece como a única fonte mutável para catálogo e configuração das ofertas criadas pelo painel. O formato será evoluído para uma nova versão que aceite os registros estáticos existentes e registros customizados. Cada registro customizado terá ID UUID, slug, nome, status, configuração completa, favicon e identificador do modelo de origem. Catálogo e configuração serão gravados no mesmo objeto para evitar criação parcial.

Leituras manterão compatibilidade com as versões persistidas atualmente. Gravações converterão o objeto para a nova versão, preservando os registros existentes. A escrita usará o ETag do Blob e repetirá a leitura e validação quando houver conflito concorrente, seguindo `updateVersionedValue`.

Uma oferta customizada precisa ter sua configuração completa armazenada no Blob; não pode depender de `getOfferConfig` encontrar um ID em código. A validação estrutural da configuração e das referências WebP continua obrigatória. O modelo estático é usado apenas para inicializar o novo rascunho.

## Fluxo e validações

1. Um administrador autenticado abre **Nova oferta**, informa nome e revisa a slug sugerida.
2. O cliente envia nome e slug a um endpoint autenticado de criação.
3. O servidor valida campos, slug, rotas reservadas e colisões com slugs estáticas, atuais e customizadas.
4. O servidor lê a configuração atual de Psicopedagogia, prepara uma cópia em rascunho sem links de checkout e sem tracking, atribui UUID e grava catálogo e conteúdo em uma única atualização condicional do Blob.
5. O servidor invalida o cache do catálogo e do preview e retorna o registro criado.
6. O painel navega para o editor do novo slug, onde as imagens herdadas são sinalizadas até serem substituídas por uploads WebP próprios.

Falhas de autenticação, slug inválida ou ocupada, armazenamento ausente e conflito de gravação retornam mensagens distintas e não criam registros parciais. Requisições repetidas não devem sobrescrever ofertas já criadas.

Para ativar, o servidor verifica novamente o status, checkout, configuração e referências de imagem. Uma ativação não pode deixar referências a arquivos do diretório do modelo Psicopedagogia. O tracking Cashflow é opcional.

## Interface

A ação aparece na página inicial autenticada do painel, próxima ao título e resumo. Um formulário compacto, consistente com o painel atual, coleta nome e slug e informa que o editor permitirá personalizar o rascunho. Estados de envio, sucesso e erros de slug/armazenamento são apresentados junto ao formulário. O cadastro bem-sucedido leva diretamente ao editor.

O rascunho fica visível na lista com o status correspondente e pode ser reaberto. Não há uma ação de publicação automática no cadastro.

## Limites do primeiro corte

- Não inclui geração de copy por IA.
- Não inclui importação de uma pasta local ou ZIP; imagens são selecionadas e enviadas pelo editor já existente.
- Não cria arquivos no repositório, rotas compiladas por oferta nem deploy por cadastro.
- Não altera nem ativa automaticamente ofertas estáticas existentes.

## Verificação e aceite

- Testes unitários provam clonagem do template, limpeza de checkout/tracking, status inicial, validação de slug e unicidade de UUID/slug.
- Testes de migração provam que registros atuais v3 continuam legíveis e são preservados ao gravar o novo formato.
- Testes de endpoint provam autenticação, erros sem escrita parcial, persistência de um custom ID e conflito de ETag.
- QA autenticado prova cadastro, navegação ao editor, preview, upload/referência WebP, bloqueio de ativação com imagens herdadas e ativação só após checkout e assets válidos.
- QA visual verifica o painel em 320, 390, 768 e 1366 px.
- O conjunto `npm run check` permanece verde; a rota pública do rascunho responde 404 e o preview exige sessão.
