# Psicopedagogia Offer — Design Doc

## 1. Visão Geral

Criar uma nova oferta de **Mapa de Perfil Infantil para Psicopedagogas Iniciantes** sob a rota `/psicopedagogia`, mantendo a oferta existente de `lembrancinhas` intacta.

## 2. Arquitetura

### 2.1 Novos arquivos (espelhando lembrancinhas)

```
src/
  app/
    psicopedagogia/
      page.tsx                              # ordering igual lembrancinhas/page.tsx
      layout.tsx                             # CSS vars + OfferProvider + pixels
      politica-de-privacidade/page.tsx
      termos-de-uso/page.tsx
  config/
    offers/
      psicopedagogia/
        offer.ts                             # config completa com copy adaptada
public/
  images/
    psicopedagogia/
      .gitkeep                               # placeholder para imagens futuras
```

### 2.2 Arquivos modificados

- `src/components/dev/PaletteSwitcher.tsx` — adicionar 3 novas paletas de psicopedagogia
- `src/app/psicopedagogia/page.tsx` — incluir `<PaletteSwitcher />`

### 2.3 Arquivos não modificados

- `src/app/page.tsx` — continua redirecionando para `/lembrancinhas`
- `src/app/lembrancinhas/` — intacto
- `src/config/offers/lembrancinhas/` — intacto
- Todos os componentes de seção — reutilizados sem alteração

## 3. Copy Adaptada por Seção

### 3.1 Meta
- **title:** "Mapa de Perfil Infantil para Psicopedagogas Iniciantes"
- **description:** "Um mapa visual e prático para psicopedagogas iniciantes identificarem o perfil da criança, escolherem o objetivo da sessão e conduzirem o atendimento com mais segurança."

### 3.2 Hero (VendaImediata)
- **pill:** "MAPA DE PERFIL INFANTIL"
- **titleLine1:** "Mapa de Perfil Infantil"
- **titleLine2:** "para psicopedagogas iniciantes"
- **titleLine3:** "Identifique, escolha e conduza com mais segurança"
- **image:** "/images/psicopedagogia/hero.webp"
- **imageAlt:** "Mapa de Perfil Infantil"
- **subtitle:** "Um mapa visual e prático para psicopedagogas iniciantes identificarem o perfil da criança, escolherem o objetivo da sessão e conduzirem o atendimento com mais segurança, clareza e menos improviso."
- **ctaText:** "QUERO O MAPA DE PERFIL INFANTIL"
- **marqueeText:** "15 Perfis Infantis • Atividade-guia para cada perfil • Acesso Imediato • "
- **marqueeGradient:** definido pela paleta
- **bullets:** ["Identificar o perfil da criança", "Escolher a atividade certa", "Definir o objetivo da sessão", "Conduzir sem improvisar", "Atender com mais segurança"]

### 3.3 SocialProof
- **title:** "Olha só o que Psicopedagogas Iniciantes estão achando"
- **testimonials:** 8 placeholders (imagens serão fornecidas)

### 3.4 Counter (Pain Points)
- **prefix:** "+ de"
- **target:** 15
- **label:** "Perfis Infantis organizados para suas sessões"

### 3.5 KitCards (Demonstrativo)
- **heading1:** "VEJA POR DENTRO O MAPA DO PERFIL QUE VAI TE AJUDAR NAS SESSÕES"
- **images:** 10 placeholders (imagens serão fornecidas)

### 3.6 Benefits (4 cards)
- **title:** "O Mapa de Perfil Infantil possui tudo para tornar suas sessões mais seguras, organizadas e sem improviso"
- **items:**
  1. 🧠 "15 perfis infantis organizados" / "A psicopedagoga consegue identificar perfis como criança agitada, dispersa, ansiosa, resistente, impulsiva, desorganizada e muito mais."
  2. 🎯 "Atividade certa para cada perfil" / "Em vez de escolher no improviso, ela consulta o perfil da criança e encontra uma atividade-guia mais adequada para aquele atendimento."
  3. 📋 "Aplicação simples na sessão" / "Basta observar o comportamento da criança, seguir o mapa visual e aplicar a orientação indicada com mais clareza."
  4. ✅ "Mais segurança para iniciantes" / "Mesmo no início da prática clínica, a psicopedagoga consegue entrar na sessão com um caminho claro para seguir."

### 3.7 Urgencia
- **pill:** "OPORTUNIDADE ÚNICA"
- **title:** "APROVEITE O PREÇO PROMOCIONAL POR TEMPO LIMITADO"
- **body:** "Pare de escolher atividades no improviso e comece a conduzir suas sessões com mais clareza. Com o Mapa de Perfil Infantil, você sabe o que observar, qual perfil identificar e qual atividade aplicar com cada criança."
- **ctaText:** "QUERO ACESSAR AGORA E USAR HOJE"

### 3.8 IdealPara
- **pill:** "É PARA VOCÊ"
- **title:** "ESTE MATERIAL É IDEAL PARA VOCÊ QUE DESEJA:"
- **subtitle:** "Feito para psicopedagogas iniciantes que querem mais segurança nos primeiros atendimentos."
- **items:**
  1. 🚀 "Parar de improvisar nas sessões"
  2. 🎯 "Escolher atividades com mais segurança"
  3. 🧩 "Saber o que aplicar com cada perfil infantil"
  4. 💪 "Se sentir mais preparada nos primeiros atendimentos"

### 3.9 Deliverables (TudoQueVoceRecebe)
- **pill:** "⚡ ACESSO IMEDIATO"
- **title:** "TUDO O QUE VOCÊ VAI RECEBER"
- **bullets:**
  - "Mapa de Perfil Infantil para Psicopedagogas Iniciantes"
  - "Arquivo Digital pronto para imprimir"
  - "Material visual, organizado e fácil de aplicar"
  - "Mapa geral com 15 perfis infantis"
  - "Atividade-guia para cada perfil infantil"
  - "Orientação simples de como aplicar"
  - "Entrega imediata por Whatsapp e e-mail"

### 3.10 BonusSection + Bonuses (6 bônus)

**BonusSection:**
- **pill:** "EXTRA INCLUÍDO"
- **titleLead:** "6 BÔNUS"
- **titleHighlight:** "EXCLUSIVOS"
- **subtitle:** "Além do Mapa de Perfil Infantil, ao adquirir o Plano Completo você também recebe 6 bônus especiais."
- **timerText:** "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO"

**Bonuses (6):**

1. **Roteiro Sessão Sem Travar** — R$ 29,90
   - front: `/images/psicopedagogia/bonus-1-frente.webp`
   - desc: "Um roteiro prático para a psicopedagoga saber como conduzir a sessão do início ao fim, sem ficar perdida ou travar no meio do atendimento."

2. **Checklist Anti-Improviso** — R$ 12,90
   - front: `/images/psicopedagogia/bonus-2-frente.webp`
   - desc: "Um checklist simples para preparar a sessão antes da criança chegar, com perfil, objetivo, atividade, materiais, plano B e frases de condução."

3. **Atividades Prontas por Perfil Infantil** — R$ 19,90
   - front: `/images/psicopedagogia/bonus-3-frente.webp`
   - desc: "Um banco com 75 atividades prontas, separadas por perfil infantil, para a psicopedagoga ter mais opções do que aplicar em cada tipo de criança."

4. **Mapa dos Perfis Combinados** — R$ 19,90
   - front: `/images/psicopedagogia/bonus-4-frente.webp`
   - desc: "Um mapa visual para ajudar quando a criança apresenta mais de um comportamento ao mesmo tempo, como agitação com impulsividade ou ansiedade com resistência."

5. **Fichas de Evolução da Criança** — R$ 12,90
   - front: `/images/psicopedagogia/bonus-5-frente.webp`
   - desc: "Fichas práticas para registrar o que aconteceu na sessão, acompanhar avanços, perceber padrões e planejar o próximo atendimento com mais organização."

6. **Kit Visual de Combinados** — R$ 12,90
   - front: `/images/psicopedagogia/bonus-6-frente.webp`
   - desc: "Cards visuais para criar combinados com a criança, organizar a sessão e retomar regras sem transformar tudo em bronca."

### 3.11 Pricing (2 planos)

**Plano Básico — R$ 17,90 (4x R$ 4,47)**
- oldPrice: R$ 39,90
- ctaText: "QUERO ESSA OPÇÃO!"
- Item único: Mapa de Perfil Infantil

**Plano Completo — R$ 27,90 (4x R$ 6,97)**
- oldPrice: R$ 147,00 (soma dos bônus)
- ctaText: "QUERO O PLANO COMPLETO!"
- Items: Mapa + todos os 6 bônus

### 3.12 Guarantee
- **marqueeText:** "GARANTIA 15 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • "
- **title:** "Compra 100% segura e garantida!"
- **body:** "Você tem 15 dias de garantia para testar o material. Se não gostar por qualquer motivo, devolvemos 100% do valor. Sem perguntas, sem burocracia."

### 3.13 Access (4 steps)
1. "Conclua sua compra" — "Após escolher o plano e finalizar o pagamento, seu pedido é confirmado automaticamente."
2. "Receba no e-mail" — "As instruções de acesso chegam diretamente no e-mail cadastrado no momento da compra."
3. "Acesse os materiais" — "Você poderá abrir o Mapa de Perfil Infantil e, no plano completo, todos os bônus incluídos."
4. "Use nas suas sessões" — "Consulte pelo celular, tablet ou computador antes ou durante seus atendimentos psicopedagógicos."

### 3.14 FAQ (7 itens adaptados)

1. "O que é o Mapa de Perfil Infantil?" / "É um material digital, visual e prático para ajudar a psicopedagoga a identificar o perfil da criança e escolher uma atividade mais adequada para a sessão."
2. "Esse material é indicado para psicopedagogas iniciantes?" / "Sim. Ele foi criado justamente para psicopedagogas que estão começando e ainda sentem insegurança na hora de escolher o que aplicar com cada criança."
3. "O material é físico ou digital?" / "O material é 100% digital. Após a confirmação da compra, você recebe as instruções de acesso no e-mail cadastrado."
4. "O que vem no Plano Básico?" / "O Plano Básico inclui o produto principal: Mapa de Perfil Infantil para Psicopedagogas Iniciantes."
5. "O que vem no Plano Completo?" / "O Plano Completo inclui o Mapa de Perfil Infantil + todos os 6 bônus."
6. "O material ajuda com crianças agitadas, dispersas ou resistentes?" / "Sim. O produto trabalha 15 perfis infantis, incluindo criança agitada, dispersa, impulsiva, ansiosa, resistente, desorganizada e outros."
7. "Tem garantia?" / "Sim. Você tem 15 dias de garantia para conhecer o material. Se não gostar, pode solicitar o reembolso dentro do prazo."

### 3.15 Footer
- **updateTitle:** "Material em constante atualização"
- **updateBody:** "O Mapa de Perfil Infantil recebe novos perfis e atividades periodicamente. Ao adquirir agora, você garante acesso vitalício e todas as atualizações futuras."
- **copyright:** "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98."
- **missionText:** "Conduza suas sessões psicopedagógicas com mais segurança, clareza e menos improviso"
- **privacyUrl:** "/psicopedagogia/politica-de-privacidade"
- **termsUrl:** "/psicopedagogia/termos-de-uso"

## 4. Paletas de Cor

### 4.1 Paleta Padrão — Azul Petróleo & Coral
- brand: #0D4F4F (azul petróleo)
- brandDeep: #0A3D3D
- brandInk: #062B2B
- brandDark: #126161
- brandLight: #7AB8B8
- brandSubtle: #E0F0F0
- cta: #16A34A (verde)
- ctaDeep: #11863D
- ctaDarkest: #0E6B31
- accent: #E8634A (coral)
- yellow: #F0B040
- bg: #F5F8F0
- bgAlt: #E8634A

### 4.2 Paleta B — Verde Menta & Lilás
- brand: #2D5A4B (verde escuro)
- brandDeep: #214336
- brandInk: #172E25
- brandDark: #3A705E
- brandLight: #8DB8A8
- brandSubtle: #E6F0EC
- cta: #16A34A
- ctaDeep: #11863D
- ctaDarkest: #0E6B31
- accent: #9B59B6 (lilás)
- yellow: #E8A040
- bg: #F5F8F8
- bgAlt: #9B59B6

### 4.3 Paleta C — Rosa Antigo & Terracota
- brand: #8C4A5A (rose wine)
- brandDeep: #6E3847
- brandInk: #502735
- brandDark: #A85A6E
- brandLight: #D4A0B0
- brandSubtle: #F2E4E8
- cta: #16A34A
- ctaDeep: #11863D
- ctaDarkest: #0E6B31
- accent: #C0734A (terracota)
- yellow: #E8A040
- bg: #FFF5F5
- bgAlt: #C0734A

## 5. PaletteSwitcher

O componente `PaletteSwitcher` será:
1. Adicionado à página `/psicopedagogia` (visível para o visitante)
2. Atualizado para incluir as 3 novas paletas + as 4 existentes
3. A paleta ativa inicial será a "Azul Petróleo & Coral" (default da oferta)

## 6. Imagens

Todas as imagens usarão placeholder paths em `/images/psicopedagogia/`. O usuário fornecerá as imagens posteriormente.

## 7. Checkout

Links de checkout usarão `#` como placeholder. O usuário substituirá pelos links reais do ggcheckout.app.

## 8. Política de Privacidade & Termos de Uso

Cópias adaptadas dos arquivos de `lembrancinhas`, com:
- Referências ao produto "Mapa de Perfil Infantil para Psicopedagogas Iniciantes"
- Links de volta apontando para `/psicopedagogia`
- Metadados atualizados
