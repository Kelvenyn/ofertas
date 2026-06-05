---
name: Low Ticket Sales Page
description: High-converting Brazilian sales page for low-ticket digital products
colors:
  primary: "#0B7FE8"
  primary-dark: "#123A6D"
  primary-deeper: "#082F63"
  accent-coral: "#FF8A5B"
  cta-green: "#00A85A"
  cta-green-light: "#22C978"
  urgency-red: "#DC2626"
  yellow: "#FFD166"
  background: "#F8FBFF"
  surface: "#FFFFFF"
  text-primary: "#082F63"
  text-body: "#425466"
  text-light: "#5B6B7B"
  border: "#E2E8F0"
typography:
  display:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "clamp(24px, 5.5vw, 34px)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  hero:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "clamp(34px, 6.3vw, 52px)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.05em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(14px, 3.5vw, 16px)"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "10.5px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.06em"
    textTransform: "uppercase"
  secondary:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(28px, 5vw, 44px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.045em"
rounded:
  pill: "999px"
  card: "24px"
  card-sm: "20px"
  badge: "16px"
  button: "999px"
spacing:
  section: "44px"
  section-sm: "34px"
  card-padding: "22px"
  card-padding-sm: "18px"
  gap: "14px"
components:
  cta-primary:
    backgroundColor: "linear-gradient(180deg, #22C978 0%, #00A85A 100%)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "18px 22px"
  cta-urgency:
    backgroundColor: "linear-gradient(180deg, #DC2626 0%, #B91C1C 100%)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "18px 22px"
  cta-secondary:
    backgroundColor: "#FFFFFF"
    textColor: "#123A6D"
    rounded: "{rounded.pill}"
    padding: "18px 22px"
  card:
    backgroundColor: "#FFFFFF"
    textColor: "#082F63"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  pill:
    backgroundColor: "#EAF5FF"
    textColor: "#0B7FE8"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Low Ticket Sales Page

## 1. Overview

**Creative North Star: "The Urgent Closer"**

This design system embodies a bold, aggressive sales page that converts visitors into buyers through urgency, social proof, and direct CTAs. The voice is confident and slightly aggressive, pushing toward action. It rejects the polite, corporate aesthetic in favor of a direct, no-nonsense approach that respects the visitor's intelligence while creating genuine urgency.

The system prioritizes mobile-first design (768px viewport first), visual hierarchy through spacing and color, and aggressive call-to-action placement. Every element serves the conversion goal: timers, progress bars, social proof cards, and multiple CTA buttons create a relentless forward momentum.

**Key Characteristics:**
- Aggressive urgency through timers, limited-time offers, and scarcity indicators
- Mobile-first responsive design optimized for Brazilian smartphone users
- Bold color contrasts between primary blue, green CTAs, and red urgency
- Direct, action-oriented copy with Portuguese language
- Social proof through testimonials, numbers, and visual trust signals
- Pill-shaped buttons with gradient backgrounds and shadow depth
- Card-based layouts with generous padding and subtle borders

## 2. Colors

The palette is built around three functional groups: authority (blue), action (green), and urgency (red), with coral and yellow as supporting accents.

### Primary
- **Authority Blue** (#0B7FE8): Primary brand color for CTAs, links, highlights, and trust signals. Used extensively in buttons, badges, and section accents.
- **Deep Navy** (#123A6D): Secondary brand color for premium elements, text hierarchy, and depth. Used in pricing sections and premium plans.
- **Darker Navy** (#082F63): Primary text color for headings and body copy. Provides strong contrast against light backgrounds.

### Secondary
- **Action Green** (#00A85A): Primary CTA color for purchase buttons, success states, and positive indicators. Gradient from #22C978 to #00A85A creates depth.
- **Coral Accent** (#FF8A5B): Warm accent for highlights, decorative elements, and visual interest. Used sparingly for emphasis.

### Tertiary
- **Urgency Red** (#DC2626): High-contrast color for countdown timers, limited-time offers, and scarcity indicators. Creates immediate visual tension.
- **Gold Accent** (#FFD166): Supporting accent for bonus sections, highlights, and positive emphasis.

### Neutral
- **Background** (#F8FBFF): Very light blue-tinted white for body background. Clean and airy.
- **Surface** (#FFFFFF): Pure white for cards, containers, and elevated elements.
- **Text Primary** (#082F63): Dark navy for headings and important text. Strong hierarchy.
- **Text Body** (#425466): Medium gray-blue for body copy. Readable and professional.
- **Text Light** (#5B6B7B): Light gray for secondary text, captions, and metadata.
- **Border** (#E2E8F0): Subtle gray for dividers and card borders.

### Named Rules
**The Urgency Rule.** Red (#DC2626) is reserved exclusively for time-sensitive elements: countdown timers, limited-time pricing, and scarcity indicators. Never use red for decorative purposes or non-urgent content.

**The Green Means Go Rule.** Green (#00A85A) is exclusively for CTAs and success states. Every green element should feel clickable and actionable.

## 3. Typography

**Display Font:** Nunito (with system-ui fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** Sora (for secondary headings and special elements)

**Character:** Bold, confident, and action-oriented. Nunito's rounded terminals create approachability while the 900 weight delivers authority. Inter provides clean readability for body copy. The pairing balances friendliness with urgency.

### Hierarchy
- **Hero Display** (900, clamp(34px, 6.3vw, 52px), 1.04): Main headline, maximum impact. Used in hero sections and primary value propositions.
- **Section Display** (900, clamp(24px, 5.5vw, 34px), 1.1): Section headings. Clear hierarchy with tight letter-spacing (-0.04em).
- **Card Display** (900, 20px, 1.2): Card titles and feature headings. Compact and punchy.
- **Body** (500, clamp(14px, 3.5vw, 16px), 1.65): Readable body copy. Inter's humanist forms ensure legibility on mobile.
- **Label** (900, 10.5px, 0.06em, uppercase): Section pills, badges, and small labels. High contrast for visibility.

### Named Rules
**The Tight Letterspacing Rule.** Headings use -0.04em to -0.05em letter-spacing. This creates visual density and urgency; loose spacing feels relaxed, which contradicts the conversion goal.

**The Mobile-First Scale Rule.** All font sizes use clamp() with mobile-first values. The smallest value is the mobile default; the largest is the desktop maximum. This ensures readability on all devices without media query overrides.

## 4. Elevation

The system uses a layered shadow strategy to create depth and hierarchy. Shadows are ambient and structural, not decorative. Cards and buttons lift off the background through subtle box-shadows that increase on hover/focus.

### Shadow Vocabulary
- **Card Shadow** (`box-shadow: 0 14px 34px rgba(11,127,232,0.07)`): Standard elevation for cards and containers. Creates depth without distraction.
- **Button Shadow** (`box-shadow: 0 14px 34px rgba(0,168,90,0.28)`): Deeper shadow for CTAs. Creates prominence and clickability.
- **Urgency Shadow** (`box-shadow: 0 14px 34px rgba(220,38,38,0.25)`): Red-tinted shadow for urgency elements. Reinforces the time-sensitive nature.
- **Hover Lift** (`box-shadow: 0 18px 42px rgba(...,0.34)`): Enhanced shadow on hover. Creates tactile feedback.
- **Inset Highlight** (`inset 0 1px 0 rgba(255,255,255,0.18)`): Inner glow for gradient buttons. Adds dimensionality.

### Named Rules
**The Gradient Depth Rule.** Buttons and CTAs use linear gradients with inset highlights to create a tactile, pressable feel. Flat colors feel static; gradients feel interactive.

**The Blue Ambient Rule.** Blue-tinted shadows (rgba(11,127,232,0.07-0.12)) create a cohesive ambient glow across all card elements. This ties the visual system together without being overt.

## 5. Components

### Buttons
- **Shape:** Pill-shaped (999px radius), full-width on mobile
- **Primary CTA:** Green gradient (#22C978 to #00A85A), white text, 18px 22px padding, shadow depth
- **Urgency CTA:** Red gradient (#DC2626 to #B91C1C), white text, same padding
- **Secondary CTA:** White background, dark navy text, blue border
- **Hover/Focus:** translateY(-2px), enhanced shadow, slight brightness increase
- **Pulse Animation:** Subtle scale animation (1.045) on primary CTAs

### Cards
- **Corner Style:** 24px radius (cards), 20px radius (compact cards)
- **Background:** White (#FFFFFF) with subtle blue-tinted borders
- **Shadow Strategy:** Ambient blue shadows (0 14px 34px rgba(11,127,232,0.07))
- **Border:** 1px solid rgba(11,127,232,0.12) for blue-tinted cohesion
- **Internal Padding:** 22px standard, 18px compact

### Pills/Badges
- **Style:** Small rounded containers (999px radius) with colored backgrounds
- **States:** Blue (#EAF5FF bg, #0B7FE8 text), Green (#E9FFF4 bg, #00A85A text), Red (#FEF2F2 bg, #DC2626 text), Gold (#FFF8E1 bg, #F59E0B text)
- **Typography:** 10.5px, 900 weight, uppercase, 0.06em letter-spacing

### Progress Bars
- **Track:** Light gray background (#E5E7EB), 4px height, pill shape
- **Fill:** Gradient from blue to green, animated sheen effect
- **Purpose:** Visual urgency indicator for limited-time offers

### Price Displays
- **Old Price:** Strikethrough, gray (#8A99A8), 15px
- **New Price:** Large (clamp(42px, 8vw, 62px)), bold, color-coded by plan
- **Installments:** Medium gray, 14px, 600 weight

### FAQ Accordion
- **Item:** White card with subtle border and shadow
- **Button:** Full-width, flex layout, Nunito font, 900 weight
- **Icon:** Blue circle (24px) with white chevron, rotates on open
- **Panel:** Max-height transition, Inter font body text

### Social Proof Cards
- **Layout:** Auto-fill grid (minmax(220px, 1fr))
- **Content:** Star rating (gold), testimonial text
- **Style:** White background, rounded corners, subtle shadow

## 6. Do's and Don'ts

### Do:
- **Do** use aggressive urgency tactics: countdown timers, limited-time pricing, scarcity indicators
- **Do** create mobile-first designs optimized for Brazilian smartphone users
- **Do** use bold color contrasts between blue (trust), green (action), and red (urgency)
- **Do** implement pill-shaped buttons with gradient backgrounds and shadow depth
- **Do** use tight letterspacing (-0.04em to -0.05em) on headings for visual density
- **Do** create visual hierarchy through spacing variation and color contrast
- **Do** use Nunito for display text and Inter for body copy
- **Do** implement card-based layouts with generous padding and subtle borders
- **Do** use social proof elements: testimonials, numbers, visual trust signals
- **Do** create multiple CTA touchpoints throughout the page

### Don't:
- **Don't** use generic SaaS templates (Inter font everywhere, purple-to-blue gradients)
- **Don't** implement AI slop aesthetics (gray text on colored backgrounds, bounce easing, gradient text, glassmorphism as default)
- **Don't** use corporate/enterprise style (stiff, formal, overly polished to the point of being sterile)
- **Don't** use the 2023-era "tiny uppercase tracked eyebrow above every section" pattern
- **Don't** use numbered section markers as default scaffolding (01 / 02 / 03)
- **Don't** use border-left greater than 1px as a colored stripe on cards or containers
- **Don't** use gradient text (background-clip: text combined with gradient)
- **Don't** use glassmorphism (blurs and glass cards) decoratively
- **Don't** use bounce or elastic easing (feels dated)
- **Don't** use gray text on colored backgrounds (looks washed out)
- **Don't** nest cards inside cards (creates visual confusion)
- **Don't** use all-caps body copy (reserve for short labels and headings)
- **Don't** use font-family count greater than 3 (display + body + optional mono)
- **Don't** use flat font scales (less than 1.25 ratio between steps)
- **Don't** use arbitrary z-index values (999, 9999)
