import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card', () => {
  it('renders a static card with a heading and body and nothing focusable', async () => {
    render(<Card title="Team Alpha">Eight members.</Card>);
    expect(screen.getByRole('heading', { name: 'Team Alpha' })).toBeInTheDocument();
    expect(screen.getByText('Eight members.')).toBeInTheDocument();

    await userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it('renders header actions and footer', () => {
    render(
      <Card title="Team Alpha" actions={<button type="button">Edit</button>} footer={<span>Updated today</span>}>
        Eight members.
      </Card>,
    );
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByText('Updated today')).toBeInTheDocument();
  });

  it('renders a link card named by its title', () => {
    render(<Card title="Team Alpha" href="/teams/alpha" />);
    expect(screen.getByRole('link', { name: 'Team Alpha' })).toHaveAttribute('href', '/teams/alpha');
  });

  it('calls onClick for a button card when clicked', async () => {
    const onClick = vi.fn();
    render(<Card title="Team Alpha" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Team Alpha' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('can be reached with Tab and activated with Enter', async () => {
    const onClick = vi.fn();
    render(<Card title="Team Alpha" onClick={onClick} />);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Team Alpha' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('keeps actions in a clickable card separate from the card click', async () => {
    const onClick = vi.fn();
    const onEdit = vi.fn();
    render(
      <Card title="Team Alpha" onClick={onClick} actions={<button type="button" onClick={onEdit}>Edit</button>} />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});
