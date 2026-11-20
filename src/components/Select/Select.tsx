import { useId, type KeyboardEvent, type MouseEvent, type Ref, type SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  ref?: Ref<HTMLSelectElement>;
  label: string;
  hint?: string;
  error?: string;
  size?: SelectSize;
  required?: boolean;
  readOnly?: boolean;
  options: SelectOption[];
}

export function Select({
  ref,
  label,
  hint,
  error,
  size = 'md',
  required = false,
  id: idProp,
  className,
  disabled,
  readOnly,
  'aria-describedby': describedByProp,
  onMouseDown,
  onKeyDown,
  options,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const messageId = `${id}-message`;
  const message = error ?? hint;
  const describedBy = [describedByProp, message ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  const classes = [styles.field, className].filter(Boolean).join(' ');

  const handleMouseDown = (event: MouseEvent<HTMLSelectElement>) => {
    if (readOnly) {
      event.preventDefault();
    }
    onMouseDown?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSelectElement>) => {
    if (readOnly && event.key !== 'Tab') {
      event.preventDefault();
    }
    onKeyDown?.(event);
  };

  return (
    <div
      className={classes}
      data-size={size}
      data-invalid={error ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' *'}
          </span>
        )}
      </label>
      <select
        {...rest}
        ref={ref}
        id={id}
        className={`${styles.select} ${styles[size]}`}
        required={required}
        disabled={disabled}
        aria-readonly={readOnly || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {message && (
        <p id={messageId} className={error ? styles.error : styles.hint}>
          {message}
        </p>
      )}
    </div>
  );
}
