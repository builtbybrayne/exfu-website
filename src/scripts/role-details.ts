const directory = document.querySelector<HTMLElement>('#role-directory');
const toggle = document.querySelector<HTMLButtonElement>('#show-roles');
const dialog = document.querySelector<HTMLDialogElement>('#role-popover');
if (directory && toggle && dialog) {
  directory.hidden = true;
  toggle.hidden = false;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    directory.hidden = !directory.hidden;
    toggle.setAttribute('aria-expanded', String(!directory.hidden));
    toggle.textContent = directory.hidden ? 'Show all roles' : 'Hide all roles';
  });
  let opener: HTMLElement | null = null;
  document.querySelectorAll<HTMLAnchorElement>('.role-card').forEach((card) => {
    card.setAttribute('aria-haspopup', 'dialog');
    card.addEventListener('click', (event) => {
      event.preventDefault();
      const source = document.getElementById(`role-${card.dataset.role}`)?.firstElementChild;
      if (!source) return;
      opener = card;
      const content = source.cloneNode(true) as HTMLElement;
      content.querySelector('h3')!.id = 'popover-heading';
      dialog.querySelector('.popover-content')!.replaceChildren(content);
      dialog.showModal();
      document.documentElement.classList.add('persona-open');
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
        dialog.animate(
          [
            { opacity: 0, transform: 'translateY(24px) scale(.96)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 240, easing: 'ease-out' },
        );
    });
  });
  dialog.querySelector('button')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('persona-open');
    opener?.focus({ preventScroll: true });
  });
}
