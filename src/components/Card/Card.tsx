import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardBaseProps {
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

interface StaticCardProps extends CardBaseProps {
  title?: string;
  href?: undefined;
  onClick?: undefined;
}

interface LinkCardProps extends CardBaseProps {
  title: string;
  href: string;
  onClick?: undefined;
}

interface ButtonCardProps extends CardBaseProps {
  title: string;
  onClick: () => void;
  href?: undefined;
}

export type CardProps = StaticCardProps | LinkCardProps | ButtonCardProps;

export function Card({ title, actions, footer, children, className, href, onClick }: CardProps) {
  const clickable = href !== undefined || onClick !== undefined;
  const classes = [styles.card, className].filter(Boolean).join(' ');

  let heading: ReactNode = title;
  if (title && href !== undefined) {
    heading = (
      <a className={styles.primary} href={href}>
        {title}
      </a>
    );
  } else if (title && onClick) {
    heading = (
      <button type="button" className={styles.primary} onClick={onClick}>
        {title}
      </button>
    );
  }

  return (
    <div className={classes} data-clickable={clickable ? 'true' : undefined}>
      {(title || actions) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{heading}</h3>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
