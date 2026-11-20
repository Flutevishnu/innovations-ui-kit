import type { ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
}

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  type = 'button',
  className,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classes}
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={handleClick}
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
}
