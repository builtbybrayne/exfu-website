import { toolFamilies } from '../data/tools';
const selector = document.querySelector<HTMLSelectElement>('#plugin-choice');
if (selector) {
  selector.closest<HTMLElement>('.plugin-picker')!.hidden = false;
  selector.addEventListener('change', () => {
    const tool = toolFamilies.find((tool) => tool.pkg === selector.value)!;
    document.querySelector('#selected-plugin-name')!.textContent = tool.pkg;
    document.querySelector('#selected-plugin-description')!.textContent = tool.detail;
    document.querySelector('#selected-terminal code')!.textContent =
      `claude plugin marketplace add ExFu/exfu-marketplace && claude plugin install ${tool.pkg}@exfu-marketplace`;
    document
      .querySelector('#selected-terminal button')!
      .setAttribute('aria-label', `Copy ${tool.name} install command`);
    document.querySelector('#selected-slash code')!.textContent =
      `/plugin install ${tool.pkg}@exfu-marketplace`;
    document
      .querySelectorAll<HTMLElement>('[data-plugin-first]')
      .forEach((panel) => (panel.hidden = panel.dataset.pluginFirst !== tool.pkg));
    document
      .querySelectorAll<HTMLElement>('#setup .copy-status')
      .forEach((status) => (status.hidden = true));
    document.querySelector('#plugin-selection-status')!.textContent =
      `Showing ${tool.name} installation and first-session instructions.`;
  });
}
