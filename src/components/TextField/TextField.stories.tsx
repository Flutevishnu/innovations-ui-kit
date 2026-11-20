import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: { label: 'Email address' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'maya@innovationslab.ai' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'maya@innovationslab.ai' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'maya@innovationslab.ai' } };
export const WithError: Story = {
  args: {
    defaultValue: 'maya@',
    error: 'Enter an email address like name@example.com',
  },
};

export const FocusVisible: Story = {
  play: async () => {
    await userEvent.tab();
  },
};

export const Hover: Story = { parameters: { pseudo: { hover: true } } };

export const WithHint: Story = { args: { hint: 'We only use this to send receipts' } };
export const Required: Story = { args: { required: true } };
export const WithCounter: Story = {
  args: { label: 'Display name', maxLength: 20, showCounter: true, defaultValue: 'Maya' },
};

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };
