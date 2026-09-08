const form = document.querySelector<HTMLFormElement>('#enquiry-form');
const quiz = document.querySelector<HTMLElement>('#quiz');
const panel = document.querySelector<HTMLElement>('#contact-panel');
const start = document.querySelector<HTMLElement>('.quiz-start');
const steps = Array.from(document.querySelectorAll<HTMLFieldSetElement>('[data-step]'));
const support = document.querySelector<HTMLSelectElement>('#support');
const message = document.querySelector<HTMLTextAreaElement>('#message');
const result = document.querySelector<HTMLElement>('#quiz-result');
const error = document.querySelector<HTMLElement>('#quiz-error');
const routes: Record<string, { value: string; title: string; description: string }> = {
  business: {
    value: 'Fractional AI support',
    title: 'Experienced help alongside you.',
    description:
      'Fractional support could be a useful starting point. We can discuss the opportunities, the business case and the help you need to move them forward.',
  },
  project: {
    value: 'A defined project',
    title: 'Give the idea a next step.',
    description:
      'A defined project could be a useful starting point. Tell me what you have in mind and we can discuss the scope and what needs testing.',
  },
  personal: {
    value: 'Personal AI support',
    title: 'Start with your own work.',
    description:
      'Personal support could be a useful starting point. We can choose a workstream and set up an agent with you, around the way you work.',
  },
};
let step = 0;
let generatedBrief = '';
const selected = (name: string) =>
  document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value || '';
function showStep(index: number, focus = true) {
  step = index;
  if (!quiz || !panel || !start || !error) return;
  document.querySelector('.enquiry-section')?.classList.add('is-quiz');
  quiz.hidden = false;
  panel.hidden = true;
  start.hidden = true;
  error.hidden = true;
  steps.forEach((field, i) => {
    field.hidden = i !== index;
  });
  document.querySelector('#quiz-progress')!.textContent = `Question ${index + 1} of 3`;
  (document.querySelector('#quiz-progress-bar') as HTMLElement).style.width =
    `${((index + 1) / 3) * 100}%`;
  (document.querySelector('#quiz-back') as HTMLButtonElement).hidden = index === 0;
  document.querySelector('#quiz-next')!.textContent =
    index === 2 ? 'See my starting point ↗' : 'Next question ↗';
  if (focus) steps[index].querySelector('legend')?.focus();
}
function showContact(focus = true) {
  if (!quiz || !panel || !start) return;
  document.querySelector('.enquiry-section')?.classList.remove('is-quiz');
  quiz.hidden = true;
  panel.hidden = false;
  start.hidden = false;
  if (focus) (document.querySelector('.form-title') as HTMLElement).focus();
}
function finishQuiz() {
  const need = selected('quiz-need');
  const route = routes[need];
  if (!route || !support || !message || !result) return;
  support.value = route.value;
  document.querySelector('#result-title')!.textContent = route.title;
  document.querySelector('#result-description')!.textContent = route.description;
  result.hidden = false;
  const nextBrief = `I'm interested in ${route.value.toLowerCase()}.\nWhat is getting in the way: ${selected('quiz-obstacle')}.\nWhere I am now: ${selected('quiz-stage')}.`;
  // Never overwrite a visitor's edited or directly entered brief.
  if (!message.value.trim() || message.value === generatedBrief) {
    message.value = nextBrief;
    generatedBrief = nextBrief;
  }
  showContact();
}
if (form && quiz && panel && start && support && message && error) {
  start.hidden = false;
  const params = new URLSearchParams(location.search);
  const need = params.get('need') || '';
  if (Object.hasOwn(routes, need)) {
    support.value = routes[need].value;
    const choice = document.querySelector<HTMLInputElement>(
      `input[name="quiz-need"][value="${need}"]`,
    );
    if (choice) choice.checked = true;
  }
  if (params.get('quiz') === '1') showStep(0, false);
  document.querySelector('#start-quiz')?.addEventListener('click', () => showStep(0));
  document.querySelector('#edit-answers')?.addEventListener('click', () => showStep(0));
  document.querySelector('#skip-quiz')?.addEventListener('click', () => showContact());
  document
    .querySelector('#quiz-back')
    ?.addEventListener('click', () => showStep(Math.max(0, step - 1)));
  document.querySelector('#quiz-next')?.addEventListener('click', () => {
    if (!steps[step].querySelector('input:checked')) {
      error.textContent = 'Choose one answer to continue, or skip to the enquiry.';
      error.hidden = false;
      steps[step].querySelector('input')?.focus();
      return;
    }
    if (step < 2) showStep(step + 1);
    else finishQuiz();
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = document.querySelector<HTMLButtonElement>('#send-enquiry')!;
    const status = document.querySelector<HTMLElement>('#form-status')!;
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = 'Sending…';
    status.hidden = false;
    status.className = '';
    status.textContent = 'Sending your enquiry…';
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      // Local static previews cannot verify Netlify receipt; do not report a false success.
      if (
        form.hasAttribute('data-netlify') ||
        location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1' ||
        location.hostname === '::1'
      )
        throw new Error('local-preview');
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          new FormData(form) as unknown as Record<string, string>,
        ).toString(),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('submission-failed');
      location.assign('/thanks/');
    } catch (err) {
      const local = err instanceof Error && err.message === 'local-preview';
      status.className = 'form-error';
      status.textContent = local
        ? 'This preview cannot send enquiries yet. Your text is still here. Please email al@exfu.ai.'
        : 'We could not confirm your enquiry was received. Your text is still here. Please try again, or email al@exfu.ai.';
      status.focus();
      button.disabled = false;
      button.innerHTML = 'Send enquiry to Alastair <span aria-hidden="true">↗</span>';
    } finally {
      window.clearTimeout(timeout);
    }
  });
}
