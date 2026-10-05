import { createElement } from '../utils/create-element.js';

const SCROLL_LOCK_CLASS = 'modal-open';
let modalCount = 0;

/**
 * Общая оболочка модального окна на базе <dialog>.
 * Содержимое и дополнительные кнопки передаются снаружи, кнопка «Закрыть» добавляется всегда.
 * Любая кнопка сначала закрывает окно, затем вызывает свой обработчик.
 * @param {{ title: string, content: Node, actions?: Array<{ text: string, onClick: () => void }> }} options
 */
export function createModal({ title, content, actions = [] }) {
  modalCount += 1;
  const titleId = `modal-title-${modalCount}`;

  const actionButtons = [...actions, { text: 'Закрыть', secondary: true }].map(
    ({ text, onClick, secondary }) =>
      createElement('button', {
        className: secondary ? 'button button--secondary' : 'button',
        text,
        attrs: { type: 'button' },
        on: {
          click: () => {
            close();
            onClick?.();
          },
        },
      }),
  );

  const dialog = createElement(
    'dialog',
    { className: 'modal', attrs: { 'aria-labelledby': titleId } },
    [
      createElement('div', { className: 'modal__window' }, [
        createElement('h2', { className: 'modal__title', text: title, attrs: { id: titleId } }),
        createElement('div', { className: 'modal__content' }, [content]),
        createElement('div', { className: 'modal__actions' }, actionButtons),
      ]),
    ],
  );

  // Клик считается кликом по фону, только если и нажатие, и отпускание были на самом <dialog>
  // (например, выделение текста с отпусканием мыши за окном не должно его закрывать).
  let isPointerDownOnBackdrop = false;

  dialog.addEventListener('pointerdown', (event) => {
    isPointerDownOnBackdrop = event.target === dialog;
  });

  dialog.addEventListener('click', (event) => {
    if (isPointerDownOnBackdrop && event.target === dialog) {
      close();
    }
  });

  // Срабатывает при любом способе закрытия, включая Escape.
  dialog.addEventListener('close', () => {
    document.body.classList.remove(SCROLL_LOCK_CLASS);
    dialog.remove();
  });

  function open() {
    document.body.append(dialog);
    document.body.classList.add(SCROLL_LOCK_CLASS);
    dialog.showModal();
  }

  function close() {
    if (dialog.open) {
      dialog.close();
    }
  }

  return { open, close };
}
