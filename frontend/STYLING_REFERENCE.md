# Styling Reference – Student Rewarding System

**Use this file as the single source of truth for all page generation and creation.**

---

## Colors

| Token | Hex | Aliases | Usage |
|-------|-----|---------|-------|
| **Primary** | `#8F113B` | Red | Buttons, headings, accents, links, CTAs |
| **Secondary** | `#FFFFFF` | White | Backgrounds, cards, light surfaces |
| **Tertiary** | `#c6c6c6` | Grey | Borders, dividers, disabled states, gradient effects |

**Tailwind classes:** `bg-brand-primary`, `text-brand-primary`, `border-brand-tertiary`, etc.

---

## Gradients

Use the **tertiary color (#c6c6c6)** in gradients wherever possible.

**Examples:**
- `from-brand-tertiary to-white` – subtle fade
- `from-white via-brand-tertiary/30 to-brand-tertiary/50` – soft grey gradient
- `bg-gradient-to-br from-brand-tertiary/40 to-brand-tertiary` – diagonal grey gradient
- Page backgrounds: `bg-gradient-to-br from-brand-tertiary/20 to-secondary` or similar

---

## Fonts

| Role | Path | Usage |
|------|------|-------|
| **Primary** | `assets/fonts/alteix-sans-font/AlteixsansRegulardemo-E4j1n.otf` | Body text, default UI |
| **Secondary** | `assets/fonts/timeburner-font/Timeburner-xJB8.ttf` | Headings, titles |
| **Tertiary** | `assets/fonts/queensides-font/QueensidesMedium-x30zV.ttf` | Labels, captions, accents |

**Tailwind classes:** `font-primary`, `font-secondary`, `font-tertiary`

**CSS variables:** `--font-primary`, `--font-secondary`, `--font-tertiary`

---

## Quick Reference for Page Creation

```css
/* Page background – use tertiary gradient */
background: linear-gradient(to bottom right, rgba(198, 198, 198, 0.2), #ffffff);

/* Primary button */
background-color: #8F113B;
color: #FFFFFF;

/* Card/section */
background: #FFFFFF;
border: 1px solid #c6c6c6;

/* Headings */
font-family: var(--font-secondary);
color: #8F113B;
```

---

## Tailwind Token Mapping

- `brand-primary` → #8F113B
- `brand-secondary` → #FFFFFF
- `brand-tertiary` → #c6c6c6
