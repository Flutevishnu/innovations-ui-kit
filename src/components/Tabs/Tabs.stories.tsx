import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, type TabItem, type TabsProps } from './Tabs';

const items: TabItem[] = [
  { value: 'overview', label: 'Overview', content: 'A summary of the team and its recent activity.' },
  { value: 'members', label: 'Members', content: 'Everyone who belongs to this team.' },
  { value: 'billing', label: 'Billing', content: 'Plans, invoices and payment methods.' },
  { value: 'settings', label: 'Settings', content: 'Team name, permissions and integrations.' },
];

function ControlledDemo(args: TabsProps) {
  const [value, setValue] = useState('members');
  return <Tabs {...args} value={value} onValueChange={setValue} />;
}

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { items, 'aria-label': 'Team sections' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSecondTabSelected: Story = { args: { defaultValue: 'members' } };

export const WithDisabledTab: Story = {
  args: {
    items: items.map((item) => (item.value === 'billing' ? { ...item, disabled: true } : item)),
  },
};

export const Controlled: Story = { render: (args) => <ControlledDemo {...args} /> };

export const ManyTabs: Story = {
  args: {
    items: Array.from({ length: 12 }, (_, index) => ({
      value: `tab-${index + 1}`,
      label: `Section ${index + 1}`,
      content: `Content for section ${index + 1}.`,
    })),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
