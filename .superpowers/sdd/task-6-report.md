# Task 6 Report: Terms of Use Page

## What I implemented

Created `src/app/psicopedagogia/termos-de-uso/page.tsx` adapted from the lembrancinhas version:

- Backlink href: `/psicopedagogia`
- Brand color: `#0D4F4F`
- Brand-ink: `#062B2B`
- Background: `#F5F8F0`
- Meta title: "Termos de Uso | Mapa de Perfil Infantil"
- Meta description: psicopedagogia-specific
- Product name: "Mapa de Perfil Infantil para Psicopedagogas Iniciantes"
- Product description: "arquivos em formato PDF contendo um mapa visual de perfis infantis, atividades-guia e orientações para condução de sessões psicopedagógicas."
- Guarantee period: 15 days
- All other legal content preserved

## Test Results

- `npx tsc --noEmit` passed with no errors.

## Files Changed

- Created: `src/app/psicopedagogia/termos-de-uso/page.tsx`

## Self-review findings

- All brand colors, backlink, product name, product description, and guarantee period correctly adapted.
- File mirrors lembrancinhas structure exactly — consistent look and feel.
- No hardcoded values that should be config-driven; this is a static legal page, which is appropriate.
