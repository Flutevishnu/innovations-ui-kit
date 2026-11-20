import { useId, useState, type ChangeEvent, type InputHTMLAttributes, type Ref } from 'react';
import styles from './TextField.module.css';

export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  ref?: Ref<HTMLInputElement>;
  label: string;
  hint?: string;
  error?: string;
  size?: TextFieldSize;
  required?: boolean;
  maxLength?: number;
  showCounter?: boolean;
}

export function TextField({
  ref,
  label,
  hint,
  error,
  size = 'md',
  required = false,
  maxLength,
  showCounter = false,
  id: idProp,
  className,
  value,
  defaultValue,
  onChange,
  'aria-describedby': describedByProp,
  disabled,
  readOnly,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const messageId = `${id}-message`;
  const counterId = `${id}-counter`;

  const [uncontrolledLength, setUncontrolledLength] = useState(String(defaultValue ?? '').length);
  const length = value !== undefined ? String(value).length : uncontrolledLength;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUncontrolledLength(event.target.value.length);
    onChange?.(event);
  };

  const message = error ?? hint;
  const describedBy =
    [describedByProp, message ? messageId : undefined, showCounter ? counterId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  const classes = [styles.field, className].filter(Boolean).join(' ');

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
      <input
        {...rest}
        ref={ref}
        id={id}
        className={`${styles.input} ${styles[size]}`}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {(message || showCounter) && (
        <div className={styles.footer}>
          {message && (
            <p id={messageId} className={error ? styles.error : styles.hint}>
              {message}
            </p>
          )}
          {showCounter && (
            <span id={counterId} className={styles.counter}>
              {maxLength !== undefined ? `${length} / ${maxLength}` : length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
