import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Modal, type ModalProps } from './Modal';

function ModalDemo({ open: initialOpen, ...args }: ModalProps) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    onClose: () => {},
    title: 'Edit team member',
    children: 'Update the name, role and email for this team member.',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  render: (args) => <ModalDemo {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = { args: { open: false } };
export const Open: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

export const WithFooter: Story = {
  args: {
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Save changes</Button>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: Array.from({ length: 24 }, (_, index) => (
      <p key={index}>Team member note {index + 1}. This paragraph makes the body scroll.</p>
    )),
  },
};
