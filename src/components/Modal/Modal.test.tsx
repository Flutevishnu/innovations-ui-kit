import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

function renderModal(props: { open?: boolean; onClose?: () => void } = {}) {
  const onClose = props.onClose ?? vi.fn();
  render(
    <Modal open={props.open ?? true} onClose={onClose} title="Edit team member">
      <button type="button">Save</button>
    </Modal>,
  );
  return onClose;
}

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit team member">
        <button type="button">Save</button>
      </Modal>
    </>
  );
}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    renderModal({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('is a modal dialog named by its title', () => {
    renderModal();
    const dialog = screen.getByRole('dialog', { name: 'Edit team member' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('moves focus to the first focusable element when it opens', () => {
    renderModal();
    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus();
  });

  it('keeps focus inside when tabbing forwards and backwards', async () => {
    renderModal();
    const close = screen.getByRole('button', { name: 'Close dialog' });
    const save = screen.getByRole('button', { name: 'Save' });

    await userEvent.tab();
    expect(save).toHaveFocus();
    await userEvent.tab();
    expect(close).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(save).toHaveFocus();
  });

  it('closes on Escape', async () => {
    const onClose = renderModal();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the close button', async () => {
    const onClose = renderModal();
    await userEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the overlay is clicked but not when the dialog is clicked', async () => {
    const onClose = renderModal();
    const dialog = screen.getByRole('dialog', { name: 'Edit team member' });
    const overlay = dialog.parentElement;
    if (!overlay) {
      throw new Error('Expected the dialog to have an overlay');
    }

    await userEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('returns focus to the element that opened it', async () => {
    render(<Harness />);
    const opener = screen.getByRole('button', { name: 'Open modal' });
    await userEvent.click(opener);
    expect(screen.getByRole('dialog', { name: 'Edit team member' })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
