import type { HTMLAttributes } from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
}

export function Badge({ tone = 'neutral', size = 'md', className, children, ...rest }: BadgeProps) {
  const classes = [styles.badge, styles[tone], styles[size], className].filter(Boolean).join(' ');

  return (
    <span {...rest} className={classes} data-tone={tone} data-size={size}>
      {children}
    </span>
  );
}
