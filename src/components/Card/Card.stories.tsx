import type { FunctionComponent, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import { Button } from '../Button';
import { Card } from './Card';

interface CardStoryArgs {
  title?: string;
  href?: string;
  onClick?: () => void;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

const meta = {
  title: 'Components/Card',
  component: Card as FunctionComponent<CardStoryArgs>,
  args: {
    title: 'Team Alpha',
    children: 'Eight members across design and engineering.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '24rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CardStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHeaderActions: Story = {
  args: {
    actions: (
      <Button size="sm" variant="secondary">
        Edit
      </Button>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    footer: (
      <>
        <Button size="sm" variant="secondary">
          Cancel
        </Button>
        <Button size="sm">Save changes</Button>
      </>
    ),
  },
};

export const ClickableLink: Story = { args: { href: '#team-alpha' } };

export const ClickableButton: Story = { args: { onClick: () => {} } };

export const ClickableWithActions: Story = {
  args: {
    href: '#team-alpha',
    actions: (
      <Button size="sm" variant="secondary">
        Edit
      </Button>
    ),
    footer: <Button size="sm">Invite member</Button>,
  },
};

export const FocusVisible: Story = {
  args: { href: '#team-alpha' },
  play: async () => {
    await userEvent.tab();
  },
};

export const Hover: Story = {
  args: { href: '#team-alpha' },
  parameters: { pseudo: { hover: true } },
};
