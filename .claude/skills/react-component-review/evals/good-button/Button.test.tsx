import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button with its label as the accessible name', () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)('renders the %s variant', (variant) => {
    render(<Button variant={variant}>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size', (size) => {
    render(<Button size={size}>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save changes</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates with Enter and Space', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save changes</Button>);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save changes</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-busy and ignores clicks while loading', async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Save changes</Button>);
    const button = screen.getByRole('button', { name: 'Save changes' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards its ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save changes</Button>);
    expect(ref.current).toBe(screen.getByRole('button'));
  });
});