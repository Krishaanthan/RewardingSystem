/**
 * Design Tokens – Student Rewarding System
 * Use these values when creating or updating any page.
 * See STYLING_REFERENCE.md for full documentation.
 */

export const colors = {
  primary: "#8F113B",
  secondary: "#FFFFFF",
  tertiary: "#c6c6c6",
} as const;

export const fontPaths = {
  primary: "assets/fonts/alteix-sans-font/AlteixsansRegulardemo-E4j1n.otf",
  secondary: "assets/fonts/timeburner-font/Timeburner-xJB8.ttf",
  tertiary: "assets/fonts/queensides-font/QueensidesMedium-x30zV.ttf",
} as const;

/** Tertiary-based gradient for backgrounds */
export const gradients = {
  page: "linear-gradient(to bottom right, rgba(198, 198, 198, 0.2), #ffffff)",
  card: "linear-gradient(to bottom, rgba(198, 198, 198, 0.05), transparent)",
  subtle: "linear-gradient(135deg, #c6c6c6 0%, rgba(198, 198, 198, 0.3) 100%)",
} as const;
