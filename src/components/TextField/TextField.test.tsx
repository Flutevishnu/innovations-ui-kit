import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';

describe('TextField', () => {
  it('links the label to the input, with a generated or caller-provided id', () => {
    const { rerender } = render(<TextField label="Email address" />);
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument();

    rerender(<TextField label="Email address" id="email" />);
    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveAttribute('id', 'email');
  });

  it('describes the input with the hint', () => {
    render(<TextField label="Email address" hint="We only use this to send receipts" />);
    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveAccessibleDescription(
      'We only use this to send receipts',
    );
  });

  it('shows the error, marks the input invalid and describes it with the error', () => {
    render(<TextField label="Email address" error="Enter an email address like name@example.com" />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter an email address like name@example.com');
  });

  it('replaces the hint with the error when both are set', () => {
    render(<TextField label="Email address" hint="A hint" error="An error" />);
    expect(screen.getByText('An error')).toBeInTheDocument();
    expect(screen.queryByText('A hint')).not.toBeInTheDocument();
  });

  it('is not marked invalid without an error', () => {
    render(<TextField label="Email address" />);
    expect(screen.getByRole('textbox', { name: 'Email address' })).not.toHaveAttribute('aria-invalid');
  });

  it('sets the native required attribute and keeps the marker out of the accessible name', () => {
    render(<TextField label="Email address" required />);
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeRequired();
  });

  it('does not change the value when disabled', async () => {
    render(<TextField label="Email address" disabled />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    await userEvent.type(input, 'hello');
    expect(input).toBeDisabled();
    expect(input).toHaveValue('');
  });

  it('does not change the value when read-only', async () => {
    render(<TextField label="Email address" readOnly defaultValue="fixed" />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    await userEvent.type(input, 'hello');
    expect(input).toHaveValue('fixed');
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    render(<TextField label="Email address" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox', { name: 'Email address' }), 'hi');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('shows a counter for an uncontrolled field and updates it while typing', async () => {
    render(<TextField label="Display name" maxLength={10} showCounter defaultValue="Ma" />);
    expect(screen.getByText('2 / 10')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox', { name: 'Display name' }), 'ya');
    expect(screen.getByText('4 / 10')).toBeInTheDocument();
  });

  it('shows a counter for a controlled field from its value', () => {
    render(<TextField label="Display name" maxLength={20} showCounter value="hello" onChange={() => {}} />);
    expect(screen.getByText('5 / 20')).toBeInTheDocument();
  });

  it('includes the counter in the accessible description', () => {
    render(<TextField label="Display name" hint="Shown to your team" maxLength={20} showCounter />);
    expect(screen.getByRole('textbox', { name: 'Display name' })).toHaveAccessibleDescription(
      'Shown to your team 0 / 20',
    );
  });

  it('stops typing at maxLength', async () => {
    render(<TextField label="Display name" maxLength={3} />);
    const input = screen.getByRole('textbox', { name: 'Display name' });
    await userEvent.type(input, 'abcdef');
    expect(input).toHaveValue('abc');
  });

  it('forwards the ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextField label="Email address" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Email address' }));
  });

  it('passes native attributes to the input', () => {
    render(<TextField label="Email address" type="email" name="email" placeholder="you@example.com" />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('placeholder', 'you@example.com');
  });

  it('can be focused with the keyboard', async () => {
    render(<TextField label="Email address" />);
    await userEvent.tab();
    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveFocus();
  });
});
