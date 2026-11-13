/** Minimum widths in px. CSS custom properties cannot be used in media queries, so these live in TS. */
export const breakpoints = {
  sm: 0,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;
