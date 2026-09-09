import { toolFamilies } from '../data/tools';
const selector = document.querySelector<HTMLSelectElement>('#plugin-choice');
if (selector) {
  selector.closest<HTMLElement>('.plugin-picker')!.hidden = false;
  function updatePlugin() {
    const tool = toolFamilies.find((tool) => tool.pkg === selector!.value)!;
    document.querySelector('#selected-tool-title')!.textContent = `Install ${tool.name}.`;
    document.querySelector('#selected-plugin-name')!.textContent = tool.pkg;
    document.querySelector('#selected-plugin-description')!.textContent = tool.detail;
    document.querySelector('#selected-terminal code')!.textContent =
      `claude plugin install ${tool.pkg}@exfu-marketplace`;
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
  }
  selector.addEventListener('change', updatePlugin);
  document.querySelectorAll<HTMLAnchorElement>('[data-choose-plugin]').forEach((link) =>
    link.addEventListener('click', () => {
      selector.value = link.dataset.choosePlugin!;
      updatePlugin();
    }),
  );
}
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.tools-sidebar a'));
const sections = links.map((link) => document.querySelector<HTMLElement>(link.hash)!);
function updateSection() {
  let active = 0;
  sections.forEach((section, i) => {
    if (section.getBoundingClientRect().top <= 180) active = i;
  });
  links.forEach((link, i) => {
    if (i === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
if (links.length) {
  document.addEventListener('scroll', updateSection, { passive: true });
  window.addEventListener('resize', updateSection);
  updateSection();
}
