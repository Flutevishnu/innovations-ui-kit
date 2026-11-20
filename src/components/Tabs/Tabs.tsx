import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  'aria-label'?: string;
  className?: string;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  'aria-label': ariaLabel,
  className,
}: TabsProps) {
  const id = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const firstEnabled = items.find((item) => !item.disabled)?.value;
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const selected = value ?? internalValue;
  const selectedItem = items.find((item) => item.value === selected);

  const select = (next: string) => {
    if (value === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, item: TabItem) => {
    const enabled = items.filter((candidate) => !candidate.disabled);
    const current = enabled.findIndex((candidate) => candidate.value === item.value);
    let target: TabItem | undefined;

    if (event.key === 'ArrowRight') {
      target = enabled[(current + 1) % enabled.length];
    } else if (event.key === 'ArrowLeft') {
      target = enabled[(current - 1 + enabled.length) % enabled.length];
    } else if (event.key === 'Home') {
      target = enabled[0];
    } else if (event.key === 'End') {
      target = enabled[enabled.length - 1];
    } else {
      return;
    }

    if (!target) {
      return;
    }
    event.preventDefault();
    tabRefs.current[target.value]?.focus();
    select(target.value);
  };

  const classes = [styles.tabs, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div role="tablist" aria-label={ariaLabel} aria-orientation="horizontal" className={styles.list}>
        {items.map((item) => {
          const isSelected = item.value === selected;
          return (
            <button
              key={item.value}
              ref={(node) => {
                tabRefs.current[item.value] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${item.value}`}
              className={styles.tab}
              aria-selected={isSelected}
              aria-controls={isSelected ? `${id}-panel-${item.value}` : undefined}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              onKeyDown={(event) => handleKeyDown(event, item)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selectedItem && (
        <div
          role="tabpanel"
          id={`${id}-panel-${selectedItem.value}`}
          aria-labelledby={`${id}-tab-${selectedItem.value}`}
          tabIndex={0}
          className={styles.panel}
        >
          {selectedItem.content}
        </div>
      )}
    </div>
  );
}
