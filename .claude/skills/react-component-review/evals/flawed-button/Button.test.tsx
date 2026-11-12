import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import Button from './Button';

it('renders', () => {
  const { container } = render(<Button label="Save Changes" type="primary" />);
  expect(container).toMatchSnapshot();
});