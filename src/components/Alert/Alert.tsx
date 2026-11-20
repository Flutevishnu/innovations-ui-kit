import type { ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  tone?: AlertTone;
  title?: string;
  children?: ReactNode;
  onDismiss?: () => void;
  action?: ReactNode;
  className?: string;
}

const LIVE_ROLE: Record<AlertTone, 'alert' | 'status'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
};

export function Alert({ tone = 'info', title, children, onDismiss, action, className }: AlertProps) {
  const classes = [styles.alert, styles[tone], className].filter(Boolean).join(' ');

  return (
    <div role={LIVE_ROLE[tone]} className={classes} data-tone={tone}>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.message}>{children}</div>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
      {onDismiss && (
        <button type="button" className={styles.dismiss} aria-label="Dismiss alert" onClick={onDismiss}>
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M4.3 3.3 8 7l3.7-3.7 1 1L9 8l3.7 3.7-1 1L8 9l-3.7 3.7-1-1L7 8 3.3 4.3z" />
          </svg>
        </button>
      )}
    </div>
  );
}
