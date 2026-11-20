import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert, type AlertTone } from './Alert';

const cases: [AlertTone, 'alert' | 'status'][] = [
  ['info', 'status'],
  ['success', 'status'],
  ['warning', 'alert'],
  ['danger', 'alert'],
];

describe('Alert', () => {
  it.each(cases)('announces the %s tone with role %s', (tone, role) => {
    render(<Alert tone={tone}>Your changes were saved.</Alert>);
    expect(screen.getByRole(role)).toHaveTextContent('Your changes were saved.');
  });

  it('defaults to the info tone', () => {
    render(<Alert>Your changes were saved.</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows the title and message', () => {
    render(<Alert title="Team updated">Your changes were saved.</Alert>);
    expect(screen.getByText('Team updated')).toBeInTheDocument();
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('shows a dismiss button that calls onDismiss', async () => {
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Your changes were saved.</Alert>);
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('has no dismiss button without onDismiss', () => {
    render(<Alert>Your changes were saved.</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
  });

  it('renders the action', () => {
    render(<Alert action={<a href="#billing">Update payment method</a>}>Payment failed.</Alert>);
    expect(screen.getByRole('link', { name: 'Update payment method' })).toBeInTheDocument();
  });
});
