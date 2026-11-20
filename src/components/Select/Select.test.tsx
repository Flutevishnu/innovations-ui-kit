import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, type SelectOption } from './Select';

const options: SelectOption[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer', disabled: true },
];

describe('Select', () => {
  it('links the label to the select and renders its options', () => {
    render(<Select label="Role" options={options} />);
    const select = screen.getByRole('combobox', { name: 'Role' });
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Admin' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Editor' })).toBeInTheDocument();
  });

  it('disables an option marked disabled', () => {
    render(<Select label="Role" options={options} />);
    expect(screen.getByRole('option', { name: 'Viewer' })).toBeDisabled();
  });

  it('describes the select with the hint', () => {
    render(<Select label="Role" options={options} hint="Admins can manage billing" />);
    expect(screen.getByRole('combobox', { name: 'Role' })).toHaveAccessibleDescription('Admins can manage billing');
  });

  it('shows the error, marks the select invalid and replaces the hint', () => {
    render(<Select label="Role" options={options} hint="A hint" error="Choose a role for this team member" />);
    const select = screen.getByRole('combobox', { name: 'Role' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Choose a role for this team member');
    expect(screen.queryByText('A hint')).not.toBeInTheDocument();
  });

  it('sets the native required attribute', () => {
    render(<Select label="Role" options={options} required />);
    expect(screen.getByRole('combobox', { name: 'Role' })).toBeRequired();
  });

  it('calls onChange and updates the value when an option is chosen', async () => {
    const onChange = vi.fn();
    render(<Select label="Role" options={options} onChange={onChange} />);
    const select = screen.getByRole('combobox', { name: 'Role' });
    await userEvent.selectOptions(select, 'editor');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('editor');
  });

  it('cannot be changed when disabled', () => {
    render(<Select label="Role" options={options} disabled />);
    expect(screen.getByRole('combobox', { name: 'Role' })).toBeDisabled();
  });

  it('blocks keys and mouse when read-only but still allows Tab', () => {
    render(<Select label="Role" options={options} readOnly />);
    const select = screen.getByRole('combobox', { name: 'Role' });
    expect(select).toHaveAttribute('aria-readonly', 'true');
    expect(fireEvent.keyDown(select, { key: 'ArrowDown' })).toBe(false);
    expect(fireEvent.mouseDown(select)).toBe(false);
    expect(fireEvent.keyDown(select, { key: 'Tab' })).toBe(true);
  });

  it('forwards the ref to the select', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select label="Role" options={options} ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('combobox', { name: 'Role' }));
  });

  it('can be focused with the keyboard', async () => {
    render(<Select label="Role" options={options} />);
    await userEvent.tab();
    expect(screen.getByRole('combobox', { name: 'Role' })).toHaveFocus();
  });
});
