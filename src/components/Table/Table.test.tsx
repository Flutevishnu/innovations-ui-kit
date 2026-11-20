import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, type TableColumn, type TableProps } from './Table';

interface Member {
  id: string;
  name: string;
  tasks: number;
}

const members: Member[] = [
  { id: '1', name: 'Maya', tasks: 12 },
  { id: '2', name: 'Arjun', tasks: 8 },
  { id: '3', name: 'Lena', tasks: 21 },
];

const columns: TableColumn<Member>[] = [
  { key: 'name', header: 'Name', cell: (row) => row.name, sortValue: (row) => row.name },
  { key: 'tasks', header: 'Open tasks', cell: (row) => row.tasks, sortValue: (row) => row.tasks },
  { key: 'note', header: 'Note', cell: () => 'None' },
];

function renderTable(props: Partial<TableProps<Member>> = {}) {
  render(
    <Table
      caption="Team members"
      columns={columns}
      rows={members}
      getRowId={(row) => row.id}
      getRowLabel={(row) => `Select ${row.name}`}
      {...props}
    />,
  );
}

function bodyNames() {
  return screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[0]?.textContent);
}

describe('Table', () => {
  it('renders a captioned table with headers and rows', () => {
    renderTable();
    expect(screen.getByRole('table', { name: 'Team members' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(bodyNames()).toEqual(['Maya', 'Arjun', 'Lena']);
  });

  it('cycles a column through ascending, descending and unsorted with aria-sort', async () => {
    renderTable();
    const header = screen.getByRole('columnheader', { name: /Name/ });
    const button = within(header).getByRole('button', { name: /Name/ });
    expect(header).toHaveAttribute('aria-sort', 'none');

    await userEvent.click(button);
    expect(header).toHaveAttribute('aria-sort', 'ascending');
    expect(bodyNames()).toEqual(['Arjun', 'Lena', 'Maya']);

    await userEvent.click(button);
    expect(header).toHaveAttribute('aria-sort', 'descending');
    expect(bodyNames()).toEqual(['Maya', 'Lena', 'Arjun']);

    await userEvent.click(button);
    expect(header).toHaveAttribute('aria-sort', 'none');
    expect(bodyNames()).toEqual(['Maya', 'Arjun', 'Lena']);
  });

  it('sorts numbers numerically', async () => {
    renderTable();
    await userEvent.click(screen.getByRole('button', { name: /Open tasks/ }));
    expect(bodyNames()).toEqual(['Arjun', 'Maya', 'Lena']);
  });

  it('gives a non-sortable column no button and no aria-sort', () => {
    renderTable();
    const header = screen.getByRole('columnheader', { name: 'Note' });
    expect(within(header).queryByRole('button')).not.toBeInTheDocument();
    expect(header).not.toHaveAttribute('aria-sort');
  });

  it('sorts from the keyboard', async () => {
    renderTable();
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: /Name/ })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute('aria-sort', 'ascending');
  });

  it('selects and deselects a row and reports the ids', async () => {
    const onSelectionChange = vi.fn();
    renderTable({ selectable: true, onSelectionChange });
    const checkbox = screen.getByRole('checkbox', { name: 'Select Arjun' });

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith(['2']);

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
  });

  it('selects and clears all rows from the header checkbox', async () => {
    renderTable({ selectable: true });
    const all = screen.getByRole('checkbox', { name: 'Select all rows' });

    await userEvent.click(all);
    expect(all).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Select Maya' })).toBeChecked();

    await userEvent.click(all);
    expect(all).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Select Maya' })).not.toBeChecked();
  });

  it('shows the header checkbox as indeterminate when only some rows are selected', () => {
    renderTable({ selectable: true, defaultSelectedIds: ['1'] });
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBePartiallyChecked();
  });

  it('shows the empty message when there are no rows', () => {
    renderTable({ rows: [], emptyMessage: 'No team members yet' });
    expect(screen.getByText('No team members yet')).toBeInTheDocument();
  });

  it('has a focusable scroll region named by the caption', () => {
    renderTable();
    expect(screen.getByRole('region', { name: 'Team members' })).toHaveAttribute('tabindex', '0');
  });
});
