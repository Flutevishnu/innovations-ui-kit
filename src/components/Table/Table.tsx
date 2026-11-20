import { useState, type ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import styles from './Table.module.css';

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
}

export interface TableProps<T> {
  caption: string;
  columns: TableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  sort?: SortState | null;
  defaultSort?: SortState | null;
  onSortChange?: (sort: SortState | null) => void;
  selectable?: boolean;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  getRowLabel?: (row: T) => string;
  emptyMessage?: ReactNode;
  className?: string;
}

function compareValues(a: string | number, b: string | number) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b));
}

export function Table<T>({
  caption,
  columns,
  rows,
  getRowId,
  sort,
  defaultSort = null,
  onSortChange,
  selectable = false,
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  getRowLabel,
  emptyMessage = 'No results',
  className,
}: TableProps<T>) {
  const [internalSort, setInternalSort] = useState<SortState | null>(defaultSort);
  const [internalSelected, setInternalSelected] = useState<string[]>(defaultSelectedIds);
  const activeSort = sort !== undefined ? sort : internalSort;
  const selected = selectedIds ?? internalSelected;

  const handleSort = (key: string) => {
    let next: SortState | null;
    if (activeSort?.key !== key) {
      next = { key, direction: 'asc' };
    } else if (activeSort.direction === 'asc') {
      next = { key, direction: 'desc' };
    } else {
      next = null;
    }
    if (sort === undefined) {
      setInternalSort(next);
    }
    onSortChange?.(next);
  };

  const updateSelection = (next: string[]) => {
    if (selectedIds === undefined) {
      setInternalSelected(next);
    }
    onSelectionChange?.(next);
  };

  const sortValue = activeSort ? columns.find((column) => column.key === activeSort.key)?.sortValue : undefined;
  const sortedRows =
    activeSort && sortValue
      ? [...rows].sort((a, b) => compareValues(sortValue(a), sortValue(b)) * (activeSort.direction === 'asc' ? 1 : -1))
      : rows;

  const shownIds = sortedRows.map(getRowId);
  const selectedSet = new Set(selected);
  const selectedShown = shownIds.filter((id) => selectedSet.has(id));
  const allSelected = shownIds.length > 0 && selectedShown.length === shownIds.length;
  const someSelected = selectedShown.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      updateSelection(selected.filter((id) => !shownIds.includes(id)));
    } else {
      updateSelection([...selected, ...shownIds.filter((id) => !selectedSet.has(id))]);
    }
  };

  const toggleRow = (id: string) => {
    updateSelection(selectedSet.has(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  };

  const columnCount = columns.length + (selectable ? 1 : 0);
  const classes = [styles.region, className].filter(Boolean).join(' ');

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div role="region" aria-label={caption} tabIndex={0} className={classes}>
      <table className={styles.table}>
        <caption className={styles.visuallyHidden}>{caption}</caption>
        <thead>
          <tr>
            {selectable && (
              <th scope="col" className={styles.selectCell}>
                <Checkbox
                  label="Select all rows"
                  hideLabel
                  checked={allSelected}
                  indeterminate={someSelected}
                  disabled={shownIds.length === 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((column) => {
              if (!column.sortValue) {
                return (
                  <th key={column.key} scope="col" className={styles.header}>
                    {column.header}
                  </th>
                );
              }
              const direction = activeSort?.key === column.key ? activeSort.direction : null;
              const ariaSort = direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none';
              const glyph = direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕';
              return (
                <th key={column.key} scope="col" aria-sort={ariaSort} className={styles.header}>
                  <button type="button" className={styles.sortButton} onClick={() => handleSort(column.key)}>
                    {column.header}
                    <span className={styles.sortIcon} aria-hidden="true">
                      {glyph}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columnCount} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedRows.map((row) => {
              const id = getRowId(row);
              const isSelected = selectedSet.has(id);
              return (
                <tr key={id} data-selected={isSelected ? 'true' : undefined}>
                  {selectable && (
                    <td className={styles.selectCell}>
                      <Checkbox
                        label={getRowLabel ? getRowLabel(row) : `Select ${id}`}
                        hideLabel
                        checked={isSelected}
                        onChange={() => toggleRow(id)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={styles.cell}>
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
