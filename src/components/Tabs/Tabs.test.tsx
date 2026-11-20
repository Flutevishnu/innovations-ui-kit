import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, type TabItem } from './Tabs';

const items: TabItem[] = [
  { value: 'overview', label: 'Overview', content: 'Overview content' },
  { value: 'members', label: 'Members', content: 'Members content' },
  { value: 'billing', label: 'Billing', content: 'Billing content', disabled: true },
  { value: 'settings', label: 'Settings', content: 'Settings content' },
];

function renderTabs(props: Partial<Parameters<typeof Tabs>[0]> = {}) {
  render(<Tabs items={items} aria-label="Team sections" {...props} />);
}

describe('Tabs', () => {
  it('shows a named tab list with the first tab selected and its panel', () => {
    renderTabs();
    expect(screen.getByRole('tablist', { name: 'Team sections' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Members' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toHaveTextContent('Overview content');
  });

  it('selects a tab when it is clicked', async () => {
    renderTabs();
    await userEvent.click(screen.getByRole('tab', { name: 'Members' }));
    expect(screen.getByRole('tab', { name: 'Members' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Members' })).toHaveTextContent('Members content');
  });

  it('moves focus and selection with the arrow keys and skips disabled tabs', async () => {
    renderTabs();
    await userEvent.tab();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Members' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Members' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();
  });

  it('wraps around at both ends', async () => {
    renderTabs();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('jumps to the first and last tab with Home and End', async () => {
    renderTabs({ defaultValue: 'members' });
    await userEvent.tab();
    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();
    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('only lets the selected tab be reached with Tab, then moves into the panel', async () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Members' })).toHaveAttribute('tabindex', '-1');

    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toHaveFocus();
  });

  it('does not select a disabled tab', async () => {
    renderTabs();
    await userEvent.click(screen.getByRole('tab', { name: 'Billing' }));
    expect(screen.getByRole('tab', { name: 'Billing' })).toBeDisabled();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('reports changes and stays put until the value changes when controlled', async () => {
    const onValueChange = vi.fn();
    renderTabs({ value: 'overview', onValueChange });
    await userEvent.click(screen.getByRole('tab', { name: 'Members' }));
    expect(onValueChange).toHaveBeenCalledWith('members');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });
});
