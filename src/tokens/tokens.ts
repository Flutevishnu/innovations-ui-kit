export const color = {
  bgCanvas: 'var(--color-bg-canvas)',
  bgSurface: 'var(--color-bg-surface)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textOnAction: 'var(--color-text-on-action)',
  borderDefault: 'var(--color-border-default)',
  actionPrimary: 'var(--color-action-primary)',
  actionPrimaryHover: 'var(--color-action-primary-hover)',
  actionPrimaryActive: 'var(--color-action-primary-active)',
  focusRing: 'var(--color-focus-ring)',
  statusSuccessBg: 'var(--color-status-success-bg)',
  statusSuccessFg: 'var(--color-status-success-fg)',
  statusWarningBg: 'var(--color-status-warning-bg)',
  statusWarningFg: 'var(--color-status-warning-fg)',
  statusDangerBg: 'var(--color-status-danger-bg)',
  statusDangerFg: 'var(--color-status-danger-fg)',
} as const;

export type Color = keyof typeof color;

export const space = {
  0: 'var(--space-0)',
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  7: 'var(--space-7)',
  8: 'var(--space-8)',
} as const;

export type Space = keyof typeof space;

export const fontFamily = 'var(--font-family)';

export const typography = {
  display: {
    size: 'var(--font-display-size)',
    lineHeight: 'var(--font-display-line-height)',
    weight: 'var(--font-display-weight)',
  },
  heading: {
    size: 'var(--font-heading-size)',
    lineHeight: 'var(--font-heading-line-height)',
    weight: 'var(--font-heading-weight)',
  },
  title: {
    size: 'var(--font-title-size)',
    lineHeight: 'var(--font-title-line-height)',
    weight: 'var(--font-title-weight)',
  },
  body: {
    size: 'var(--font-body-size)',
    lineHeight: 'var(--font-body-line-height)',
    weight: 'var(--font-body-weight)',
  },
  label: {
    size: 'var(--font-label-size)',
    lineHeight: 'var(--font-label-line-height)',
    weight: 'var(--font-label-weight)',
  },
  caption: {
    size: 'var(--font-caption-size)',
    lineHeight: 'var(--font-caption-line-height)',
    weight: 'var(--font-caption-weight)',
  },
} as const;

export type TypographyRole = keyof typeof typography;

export const radii = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  pill: 'var(--radius-pill)',
} as const;

export type Radius = keyof typeof radii;

export const shadows = {
  1: 'var(--shadow-1)',
  2: 'var(--shadow-2)',
  3: 'var(--shadow-3)',
} as const;

export type Shadow = keyof typeof shadows;

export const motion = {
  durationFast: 'var(--duration-fast)',
  durationBase: 'var(--duration-base)',
  easingStandard: 'var(--easing-standard)',
} as const;

export type Motion = keyof typeof motion;

export const interaction = {
  focusRingWidth: 'var(--focus-ring-width)',
  focusRingOffset: 'var(--focus-ring-offset)',
  opacityDisabled: 'var(--opacity-disabled)',
  borderWidth: 'var(--border-width)',
} as const;

export type Interaction = keyof typeof interaction;

export const controlSizes = {
  sm: 'var(--size-control-sm)',
  md: 'var(--size-control-md)',
  lg: 'var(--size-control-lg)',
} as const;

export type ControlSize = keyof typeof controlSizes;
