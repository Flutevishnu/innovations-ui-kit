import {
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type Ref,
} from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  ref?: Ref<HTMLInputElement>;
  label: string;
  hideLabel?: boolean;
  error?: string;
  indeterminate?: boolean;
}

export function Checkbox({
  ref,
  label,
  hideLabel = false,
  error,
  indeterminate = false,
  id: idProp,
  className,
  disabled,
  'aria-describedby': describedByProp,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const messageId = `${id}-message`;
  const describedBy = [describedByProp, error ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  });

  const classes = [styles.field, className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-invalid={error ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
    >
      <label htmlFor={id} className={styles.control}>
        <input
          {...rest}
          ref={inputRef}
          id={id}
          type="checkbox"
          className={styles.input}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        <span className={hideLabel ? `${styles.label} ${styles.visuallyHidden}` : styles.label}>{label}</span>
      </label>
      {error && (
        <p id={messageId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
