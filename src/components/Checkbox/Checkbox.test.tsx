import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('links the label to the checkbox', () => {
    render(<Checkbox label="Send me product updates" />);
    expect(screen.getByRole('checkbox', { name: 'Send me product updates' })).not.toBeChecked();
  });

  it('toggles and calls onChange when clicked', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Send me product updates" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Send me product updates' });
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('toggles with the Space key after tabbing to it', async () => {
    render(<Checkbox label="Send me product updates" />);
    await userEvent.tab();
    const checkbox = screen.getByRole('checkbox', { name: 'Send me product updates' });
    expect(checkbox).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(checkbox).toBeChecked();
  });

  it('can start checked', () => {
    render(<Checkbox label="Send me product updates" defaultChecked />);
    expect(screen.getByRole('checkbox', { name: 'Send me product updates' })).toBeChecked();
  });

  it('shows the indeterminate state', () => {
    render(<Checkbox label="Select all" indeterminate />);
    expect(screen.getByRole('checkbox', { name: 'Select all' })).toBePartiallyChecked();
  });

  it('does not toggle when disabled', async () => {
    render(<Checkbox label="Send me product updates" disabled />);
    const checkbox = screen.getByRole('checkbox', { name: 'Send me product updates' });
    await userEvent.click(checkbox);
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });

  it('shows the error, marks the checkbox invalid and describes it with the error', () => {
    render(<Checkbox label="I accept the terms" error="Accept the terms to continue" />);
    const checkbox = screen.getByRole('checkbox', { name: 'I accept the terms' });
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription('Accept the terms to continue');
  });

  it('forwards the ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Send me product updates" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('checkbox', { name: 'Send me product updates' }));
  });
});
