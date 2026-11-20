import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { Table, type TableColumn } from './Table';

interface Member {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Pending';
  tasks: number;
}

const members: Member[] = [
  { id: '1', name: 'Maya Chen', role: 'Designer', status: 'Active', tasks: 12 },
  { id: '2', name: 'Arjun Rao', role: 'Engineer', status: 'Active', tasks: 8 },
  { id: '3', name: 'Lena Fischer', role: 'Product manager', status: 'Pending', tasks: 3 },
  { id: '4', name: 'Tomás Silva', role: 'Engineer', status: 'Active', tasks: 21 },
  { id: '5', name: 'Priya Nair', role: 'Designer', status: 'Pending', tasks: 5 },
];

const columns: TableColumn<Member>[] = [
  { key: 'name', header: 'Name', cell: (row) => row.name, sortValue: (row) => row.name },
  { key: 'role', header: 'Role', cell: (row) => row.role, sortValue: (row) => row.role },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => <Badge tone={row.status === 'Active' ? 'success' : 'warning'}>{row.status}</Badge>,
  },
  { key: 'tasks', header: 'Open tasks', cell: (row) => row.tasks, sortValue: (row) => row.tasks },
];

const meta = {
  title: 'Components/Table',
  component: Table<Member>,
  parameters: { layout: 'padded' },
  args: {
    caption: 'Team members',
    columns,
    rows: members,
    getRowId: (row) => row.id,
    getRowLabel: (row) => `Select ${row.name}`,
  },
} satisfies Meta<typeof Table<Member>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unsorted: Story = { args: { defaultSort: null } };
export const SortedAscending: Story = { args: { defaultSort: { key: 'name', direction: 'asc' } } };
export const SortedDescending: Story = { args: { defaultSort: { key: 'tasks', direction: 'desc' } } };

export const WithSelection: Story = { args: { selectable: true } };
export const RowSelected: Story = { args: { selectable: true, defaultSelectedIds: ['2'] } };
export const Indeterminate: Story = { args: { selectable: true, defaultSelectedIds: ['1', '3'] } };
export const AllSelected: Story = {
  args: { selectable: true, defaultSelectedIds: members.map((member) => member.id) },
};

export const Empty: Story = { args: { rows: [], selectable: true } };

export const ManyColumns: Story = {
  args: {
    columns: [
      ...columns,
      { key: 'email', header: 'Email address', cell: (row: Member) => `${row.name.split(' ')[0]?.toLowerCase() ?? 'member'}@innovationslab.ai` },
      { key: 'team', header: 'Team', cell: () => 'Product design and engineering' },
      { key: 'location', header: 'Location', cell: () => 'Remote, Europe' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '28rem' }}>
        <Story />
      </div>
    ),
  ],
};
