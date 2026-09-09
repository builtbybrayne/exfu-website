import { recommend, needNames, type Recommendation } from '../data/recommendation';
const form = document.querySelector<HTMLFormElement>('#enquiry-form');
const quiz = document.querySelector<HTMLElement>('#quiz');
const panel = document.querySelector<HTMLElement>('#contact-panel');
const start = document.querySelector<HTMLElement>('.quiz-start');
const steps = Array.from(document.querySelectorAll<HTMLFieldSetElement>('[data-step]'));
const support = document.querySelector<HTMLSelectElement>('#support');
const message = document.querySelector<HTMLTextAreaElement>('#message');
const result = document.querySelector<HTMLElement>('#quiz-result');
const error = document.querySelector<HTMLElement>('#quiz-error');
const routes: Record<string, string> = {
  business: 'Fractional AI support',
  project: 'A defined project',
  personal: 'Personal AI support',
};
let currentPlan: Recommendation | null = null;
let planText = '';
let step = 0;
let generatedBrief = '';
const selected = (name: string) =>
  Array.from(document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)).map(
    (input) => input.value,
  );
function showStep(index: number, focus = true) {
  step = index;
  if (!quiz || !panel || !start || !error) return;
  document.querySelector('.enquiry-section')?.classList.add('is-quiz');
  if (result) result.hidden = true;
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
  if (result) result.hidden = true;
  start.hidden = false;
  if (focus) (document.querySelector('.form-title') as HTMLElement).focus();
}
function showPlan() {
  if (!result || !quiz || !panel || !start) return;
  quiz.hidden = true;
  panel.hidden = true;
  start.hidden = true;
  result.hidden = false;
  document.querySelector<HTMLElement>('#result-title')!.focus();
}
function finishQuiz() {
  if (!support || !message || !result || !quiz || !panel || !start) return;
  const needs = selected('quiz-need'),
    obstacles = selected('quiz-obstacle'),
    stages = selected('quiz-stage');
  currentPlan = recommend({ needs, obstacles, stages });
  support.value = routes[needs[0]] || 'Not sure yet';
  document.querySelector('#result-title')!.textContent = currentPlan.title;
  document.querySelector('#result-description')!.textContent = currentPlan.why;
  const answers = `You want help with ${needs
    .map((need) => needNames[need])
    .join(' and ')
    .toLowerCase()}. Getting in the way: ${obstacles.join('; ').toLowerCase()}. Where you are now: ${stages.join('; ').toLowerCase()}.`;
  document.querySelector('#result-answers')!.textContent = answers;
  const list = document.querySelector('#result-steps')!;
  list.replaceChildren();
  for (const item of currentPlan.steps) {
    const li = document.createElement('li');
    const h = document.createElement('h4');
    h.textContent = item.title;
    const p = document.createElement('p');
    p.textContent = item.text;
    li.append(h, p);
    list.append(li);
  }
  document.querySelector('#result-question')!.textContent = currentPlan.question;
  document.querySelector('#result-pacing')!.textContent = currentPlan.pacing;
  const offers = document.querySelector('#result-offers')!;
  offers.replaceChildren();
  for (const offer of currentPlan.offers) {
    const article = document.createElement('article');
    const a = document.createElement('a');
    a.href = offer.href;
    a.textContent = offer.name;
    const p = document.createElement('p');
    p.textContent = offer.text;
    article.append(a, p);
    offers.append(article);
  }
  planText = `${currentPlan.title}\n\n${currentPlan.why}\n\n${answers}\n\n${currentPlan.steps.map((item, i) => `${i + 1}. ${item.title}\n${item.text}`).join('\n\n')}\n\n${currentPlan.question}\n\n${currentPlan.pacing}\n\nPossible support: ${currentPlan.offers.map((o) => o.name).join('; ')}.\nhttps://exfu.ai`;
  const nextBrief = `I'd like to discuss this starting plan:\n\n${planText}`;
  if (!message.value.trim() || message.value === generatedBrief) {
    message.value = nextBrief;
    generatedBrief = nextBrief;
  }
  document.querySelector<HTMLElement>('#copy-status')!.hidden = true;
  document.querySelector<HTMLElement>('#copy-fallback')!.hidden = true;
  document.querySelector<HTMLElement>('#back-to-plan')!.hidden = false;
  showPlan();
}
if (form && quiz && panel && start && support && message && error) {
  start.hidden = false;
  const params = new URLSearchParams(location.search);
  const need = params.get('need') || '';
  if (Object.hasOwn(routes, need)) {
    support.value = routes[need];
    const choice = document.querySelector<HTMLInputElement>(
      `input[name="quiz-need"][value="${need}"]`,
    );
    if (choice) choice.checked = true;
  }
  if (params.get('quiz') === '1') showStep(Object.hasOwn(routes, need) ? 1 : 0, false);
  document.querySelector('#start-quiz')?.addEventListener('click', () => showStep(0));
  document.querySelector('#edit-answers')?.addEventListener('click', () => showStep(0));
  document.querySelector('#skip-quiz')?.addEventListener('click', () => showContact());
  document
    .querySelector('#quiz-back')
    ?.addEventListener('click', () => showStep(Math.max(0, step - 1)));
  document.querySelector('#quiz-next')?.addEventListener('click', () => {
    if (!steps[step].querySelector('input:checked')) {
      error.textContent = 'Choose at least one answer to continue, or skip to the enquiry.';
      error.hidden = false;
      steps[step].querySelector('input')?.focus();
      return;
    }
    if (step < 2) showStep(step + 1);
    else finishQuiz();
  });
  document.querySelector('#back-to-plan')?.addEventListener('click', showPlan);
  document.querySelector('#discuss-plan')?.addEventListener('click', () => showContact());
  document.querySelector('#copy-plan')?.addEventListener('click', async () => {
    const status = document.querySelector<HTMLElement>('#copy-status')!;
    status.hidden = false;
    try {
      await navigator.clipboard.writeText(planText);
      status.textContent = 'Plan copied. Keep it somewhere useful.';
    } catch {
      const fallback = document.querySelector<HTMLTextAreaElement>('#copy-fallback')!;
      fallback.value = planText;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      status.textContent = 'Select and copy the plan below.';
    }
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
