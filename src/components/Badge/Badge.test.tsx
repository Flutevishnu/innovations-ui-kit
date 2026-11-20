import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('passes native attributes to the element', () => {
    render(
      <Badge tone="danger" aria-label="Status: overdue">
        Overdue
      </Badge>,
    );
    expect(screen.getByLabelText('Status: overdue')).toHaveTextContent('Overdue');
  });
});
