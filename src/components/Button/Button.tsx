import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Shows a spinner beside the label and blocks clicks and form submission.
   * TODO(docs/ux-handoff.md Q1): spinner sits beside the label for now; whether
   * it should replace the label and keep the button width is undecided.
   */
  loading?: boolean;
  /**
   * Icon shown before the label. Icon-only buttons are not supported yet, so a
   * visible label is always required.
   * TODO(docs/ux-handoff.md Q2): icon-only buttons, accessible label and tooltip.
   */
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
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');

  // A loading button stays focusable, so it is not natively disabled. Cancelling
  // the click also stops a type="submit" button from submitting its form.
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
});
