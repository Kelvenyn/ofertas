# Page Topology — NeuroAtividades Kids

## URL
https://melhor-pravoce.online/atividades-psicopedagogicas-infantis/

## Page Layout
- **Width:** 100% fluid, max-width 1120px container
- **Background:** #F8FBFF (global body)
- **Scroll:** Native browser scroll, smooth scroll behavior
- **Fonts:** Nunito (900 headings), Inter (500/600/700 body), Sora (800 headings), Poppins (500/600/700 body)
- **Platform:** WordPress + Elementor (each section = raw HTML widget with embedded styles)

## Sections (top to bottom)

1. **Top Timer** `.pk-top-timer` — Blue gradient bar with countdown timer
   - Type: Static display (JS countdown timer updates every second)
   - Background: linear-gradient(135deg, #2563EB, #1D4ED8, #1749B3)
   - Border-radius: 0 0 24px 24px

2. **Hero** `.hero-bonos` — Main headline + subtitle
   - Type: Static
   - Max-width: 760px centered
   - H1: Nunito 900, color #082F63
   - Decorative underline gradient

3. **Hero Image** — Main product image (a4996fc9...webp)
   - Type: Static image

4. **Counter + Pain Points** `.dc-wrap` — Animated counter + pain point cards
   - Type: Scroll-driven (IntersectionObserver triggers counter animation at 35% viewport)
   - Counter: animates from 0 to 250
   - Progress bar fills with sheen animation
   - Pain points: cards with X icons

5. **Price Display** — "SÓ HOJE / Antes: R$47 / Por apenas: R$ 14,90"
   - Type: Static with pulse animation on price

6. **CTA Button 1** — "QUERO ACESSAR O KIT AGORA" (links to #oferta)
   - Type: Static with hover effect
   - Pulse animation

7. **Skills/Organization** `.org-anos-wrap` — "Atividades organizadas por habilidade"
   - Type: Static
   - 8 cards with emoji icons, colored by category

8. **Kit Title** `.titulo-entregaveis` — "CONTEÚDO DO KIT" section header
   - Type: Static (blue bg section)
   - Shine animation on pill badge

9. **Kit Cards** `.bloco-categoria-interpretacao` — Product cards in a marquee-style track
   - Type: Static (CSS marquee animation for scrolling cards)
   - Duplicated content for seamless loop
   - 4 feature cards below

10. **Process Steps** `.neuro-processo` — "ATENDIMENTO MAIS PRÁTICO" with 4 steps
    - Type: Static
    - White bg with 4 numbered steps

11. **CTA Button 2** — Duplicate CTA

12. **Bonuses Header** `.bonos-wrap` — "EXTRA INCLUÍDO / 4 BÔNUS EXCLUSIVOS"
    - Type: Static

13. **Bonuses Cards** `.bonus-novo-wrap` — 4 bonus cards
    - Type: Static
    - Cards with image, title, description

14. **CTA Button 3** — Duplicate CTA

15. **Access Info** `.acesso-material-wrap` — "Receba tudo de forma rápida e prática"
    - Type: Static
    - Dual columns: text + WhatsApp/email images

16. **Social Proof** `.qs-social-wrap` — "RESULTADOS DE QUEM JÁ USA"
    - Type: Static
    - Testimonial cards

17. **Offer/Pricing** `.offer-pei-section` — "ESCOLHA SUA OPÇÃO" main offer card
    - Type: Static
    - Product image, features, pricing

18. **Creator** `.bio-professora-texto` — "Criadora do material / Laura Martins"
    - Type: Static
    - Photo + bio text

19. **Promo Banner** `.pei-promo-wrap` — Additional promo banner

20. **Guarantee** `.garantia-pei-wrap` — "GARANTIA DE SATISFAÇÃO / 7 dias"
    - Type: Static
    - Shield badge + text

21. **FAQ** `.faq-acc` — "Perguntas Frequentes" accordion
    - Type: Click-driven (accordion)
    - Accordion items with expand/collapse

22. **CTA Button 4** — Final CTA

23. **Footer** `.edu-toast-wrap` — Copyright + toast notification

## Interaction Model Summary
- **Scroll-driven:** Counter animation (IntersectionObserver)
- **Click-driven:** CTAs (anchors), FAQ accordion
- **Time-driven:** Countdown timer (1s interval), Marquee (CSS animation)
- **Static:** Everything else
