import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Role',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'editor' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'editor' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'editor' } };
export const WithError: Story = { args: { error: 'Choose a role for this team member' } };

export const FocusVisible: Story = {
  play: async () => {
    await userEvent.tab();
  },
};

export const Hover: Story = { parameters: { pseudo: { hover: true } } };

export const WithHint: Story = { args: { hint: 'Admins can manage billing' } };
export const Required: Story = { args: { required: true } };

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };