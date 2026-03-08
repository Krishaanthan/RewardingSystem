# Student Rewarding System - Styling Guide

## Colors
- **Primary:** `#831238` (Red)
- **Secondary:** `#FFFFFF` (White)
- **Ascent / Tertiary:** `#FBEFF1`
- **Black:** `#14110F` 
- **Grey:** `#F5F5F5`

## Typography

The application uses `next/font/local` to load the following local font files.

- **Primary Font:** `Swansea`
    - **Source:** `assets/fonts/swansea-font-prm/Swansea-q3pd.ttf`
    - **CSS Variable:** `--font-primary`
- **Secondary Font:** `Timeburner Bold`
    - **Source:** `assets/fonts/timeburner-font/TimeburnerBold-peGR.ttf`
    - **CSS Variable:** `--font-secondary`
- **Tertiary Font:** `Alteix Sans Regular`
    - **Source:** `assets/fonts/alteix-sans-sec/AlteixsansRegulardemo-E4j1n.otf`
    - **CSS Variable:** `--font-tertiary`

## Implementation Details
- Colors are exported in the Tailwind configuration (`frontend/tailwind.config.ts`) under the `brand` node and aliases (e.g. `brand.primary`, `black`, `grey`), as well as in `frontend/lib/theme.ts`.
- Fonts are mapped to CSS variables in `frontend/app/layout.tsx` and can be utilized natively in Tailwind styling or global CSS.
