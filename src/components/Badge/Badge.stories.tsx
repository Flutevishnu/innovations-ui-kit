import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Active' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: 'neutral', children: 'Draft' } };
export const Info: Story = { args: { tone: 'info', children: 'New' } };
export const Success: Story = { args: { tone: 'success', children: 'Active' } };
export const Warning: Story = { args: { tone: 'warning', children: 'Pending' } };
export const Danger: Story = { args: { tone: 'danger', children: 'Overdue' } };

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
