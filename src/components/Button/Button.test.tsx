import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

function renderInForm(button: React.ReactNode) {
  const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
  render(
    <form onSubmit={onSubmit}>
      <label>
        Name
        <input />
      </label>
      {button}
    </form>,
  );
  return onSubmit;
}

describe('Button', () => {
  it('renders a button named by its label', () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it.each(variants)('renders the %s variant', (variant) => {
    render(<Button variant={variant}>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toHaveAttribute('data-variant', variant);
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(<Button size={size}>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toHaveAttribute('data-size', size);
  });

  it('defaults to the primary variant and md size', () => {
    render(<Button>Save changes</Button>);
    const button = screen.getByRole('button', { name: 'Save changes' });
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'md');
  });

  it('defaults to type="button" so it does not submit a form by accident', async () => {
    const onSubmit = renderInForm(<Button>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toHaveAttribute('type', 'button');
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save changes</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates with Enter and Space', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save changes</Button>);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Save changes' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('shows its leading icon without adding to the accessible name', () => {
    render(<Button leadingIcon={<svg data-testid="icon" />}>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toContainElement(screen.getByTestId('icon'));
  });

  it('forwards its ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save changes</Button>);
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Save changes' }));
  });

  describe('disabled', () => {
    it('is disabled and does not call onClick', async () => {
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Save changes
        </Button>,
      );
      const button = screen.getByRole('button', { name: 'Save changes' });
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not submit a form', async () => {
      const onSubmit = renderInForm(
        <Button type="submit" disabled>
          Save changes
        </Button>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
      await userEvent.type(screen.getByLabelText('Name'), '{Enter}');
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('loading', () => {
    it('sets aria-busy and stays focusable', async () => {
      render(<Button loading>Save changes</Button>);
      const button = screen.getByRole('button', { name: 'Save changes' });
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      await userEvent.tab();
      expect(button).toHaveFocus();
    });

    it('does not set aria-busy when not loading', () => {
      render(<Button>Save changes</Button>);
      expect(screen.getByRole('button', { name: 'Save changes' })).not.toHaveAttribute('aria-busy');
    });

    it('does not call onClick', async () => {
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Save changes
        </Button>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not submit a form', async () => {
      const onSubmit = renderInForm(
        <Button type="submit" loading>
          Save changes
        </Button>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
      await userEvent.type(screen.getByLabelText('Name'), '{Enter}');
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('keeps its label as the accessible name', () => {
      render(<Button loading>Save changes</Button>);
      expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
    });
  });

  it('submits a form when type="submit" and neither loading nor disabled', async () => {
    const onSubmit = renderInForm(<Button type="submit">Save changes</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
