import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Alert, type AlertProps } from './Alert';

function DismissibleDemo(args: AlertProps) {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Alert {...args} onDismiss={() => setVisible(false)} />
  ) : (
    <Button variant="secondary" onClick={() => setVisible(true)}>
      Show alert again
    </Button>
  );
}

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: { children: 'Your changes were saved.' },
  argTypes: {
    tone: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { tone: 'info', children: 'A new version of the app is available.' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning', children: 'Your trial ends in 3 days.' } };
export const Danger: Story = {
  args: { tone: 'danger', children: 'We could not save your changes. Check your connection and try again.' },
};

export const WithTitle: Story = { args: { title: 'Team updated' } };

export const WithAction: Story = {
  args: {
    tone: 'warning',
    title: 'Payment failed',
    children: 'Your last payment did not go through.',
    action: <a href="#billing">Update payment method</a>,
  },
};

export const Dismissible: Story = { render: (args) => <DismissibleDemo {...args} /> };
