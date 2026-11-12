import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leadingIcon,
    type = 'button',
    className,
    onClick,
    children,
    ...rest
  },
  ref,
) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classes}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        leadingIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leadingIcon}
          </span>
        )
      )}
      {children}
    </button>
  );
});