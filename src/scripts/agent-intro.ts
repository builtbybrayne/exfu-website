const candidate = document.querySelector<HTMLDetailsElement>('.agent-launcher');
if (candidate) {
  const launcher = candidate;
  const trigger = launcher.querySelector<HTMLElement>('summary')!;
  const panel = launcher.querySelector<HTMLElement>('.agent-panel')!;
  const cards = Array.from(panel.querySelectorAll<HTMLElement>('.agent-layer'));
  const tray = launcher.querySelector<HTMLElement>('.agent-tray')!;
  const label = launcher.querySelector<HTMLElement>('.agent-button-label')!;
  const mark = launcher.querySelector<HTMLElement>('.agent-button-mark')!;
  const arrow = launcher.querySelector<HTMLElement>('.agent-button-arrow')!;
  const thread = launcher.querySelector<SVGPathElement>('.agent-binding-path')!;
  const svg = launcher.querySelector<SVGSVGElement>('.agent-binding')!;
  const close = launcher.querySelector<HTMLButtonElement>('.agent-panel-close')!;
  const replay = launcher.querySelector<HTMLButtonElement>('.agent-replay')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Map<Element, Animation>();
  let revision = 0;
  let automatic = false;
  let timer = 0;
  let deadline = 0;
  let remaining = 1800;
  close.hidden = replay.hidden = false;
  launcher.classList.add('motion-ready');
  const clearTimer = () => {
    window.clearTimeout(timer);
    timer = 0;
  };
  const setState = (state: string) => {
    launcher.dataset.motion = state;
  };
  // Sample the currently rendered frame before replacing a transition. No reset-to-keyframe jump.
  function animate(el: Element, frames: Keyframe[], duration: number, delay = 0) {
    const properties = [...new Set(frames.flatMap((frame) => Object.keys(frame)))].filter(
      (key) => key !== 'offset',
    );
    const computed = getComputedStyle(el);
    const current: Record<string, string> = {};
    for (const key of properties)
      current[key] = computed[key as keyof CSSStyleDeclaration] as string;
    active.get(el)?.cancel();
    Object.assign((el as HTMLElement).style, current);
    const animation = el.animate([current, ...frames], {
      duration: reduced.matches ? 0 : duration,
      delay: reduced.matches ? 0 : delay,
      easing: 'cubic-bezier(.22,.8,.22,1)',
      fill: 'both',
    });
    active.set(el, animation);
    if (document.hidden) animation.pause();
    return animation.finished
      .then(() => {
        if (active.get(el) !== animation) return;
        const last = { ...frames[frames.length - 1] };
        delete last.offset;
        Object.assign((el as HTMLElement).style, last);
        animation.cancel();
        active.delete(el);
      })
      .catch(() => {});
  }
  const openShadow = (i: number) =>
    `0 1px 0 ${i === 1 ? '#676052' : '#c2b295'}, 0 3px 0 ${i === 1 ? '#292620' : '#b09a78'}, 0 7px 9px #302e2926, 0 18px 28px #302e2924`;
  const docked = (i: number) => {
    const target = (i === 0 ? label : i === 1 ? mark : trigger).getBoundingClientRect();
    const area = panel.getBoundingClientRect();
    const card = cards[i];
    const width = target.width;
    const height = i === 0 ? target.height : i === 1 ? 5 : 3;
    return `translate3d(${target.left - area.left - card.offsetLeft}px, ${target.top - area.top - card.offsetTop + (i === 2 ? target.height - 3 : 0)}px, 0px) scale(${width / card.offsetWidth}, ${height / card.offsetHeight})`;
  };
  function drawThread() {
    const area = panel.getBoundingClientRect();
    const end = arrow.getBoundingClientRect();
    const x = area.width - 17;
    const y = end.top - area.top + end.height / 2;
    svg.setAttribute('viewBox', `0 0 ${area.width} ${y + 20}`);
    svg.style.height = `${y + 20}px`;
    const a = cards[0].offsetTop + 30;
    const b = cards[1].offsetTop + 40;
    thread.setAttribute(
      'd',
      `M ${x - 35} ${a} C ${x + 10} ${a - 25}, ${x + 10} ${b - 30}, ${x - 5} ${b} S ${x - 36} ${y - 60}, ${end.left - area.left + end.width / 2} ${y}`,
    );
  }
  function stopAuto() {
    automatic = false;
    clearTimer();
  }
  function hold() {
    clearTimer();
    if (!automatic || document.hidden) return;
    deadline = performance.now() + remaining;
    timer = window.setTimeout(() => {
      if (automatic) void fold(false);
    }, remaining);
  }
  async function unfold(auto = false) {
    const run = ++revision;
    clearTimer();
    automatic = auto;
    const wasClosed = !launcher.open;
    launcher.open = true;
    setState('opening');
    drawThread();
    if (wasClosed)
      cards.forEach((card, i) => {
        card.style.transform = docked(i);
        card.style.opacity = '1';
        card.style.boxShadow = '0 1px 0 #302e2930';
      });
    const fresh = wasClosed;
    const moves = cards.map((card, i) => {
      const frames: Keyframe[] = fresh
        ? [
            {
              transform: `translate3d(${[-16, -8, -4][i]}px, ${[30, 24, 12][i]}px, ${[42, 25, 10][i]}px) rotateX(${[-12, 8, -4][i]}deg) rotateY(${[-9, 7, -3][i]}deg) rotateZ(${[-5, 3, -1][i]}deg)`,
              opacity: 1,
              boxShadow: `0 3px 0 #9e8e75, 5px 25px 32px #302e2938`,
              offset: 0.64,
            },
            { transform: 'translate3d(0,0,0)', opacity: 1, boxShadow: openShadow(i) },
          ]
        : [{ transform: 'translate3d(0,0,0)', opacity: 1, boxShadow: openShadow(i) }];
      return animate(card, frames, fresh ? 820 : 340, fresh ? [0, 90, 170][i] : 0);
    });
    moves.push(
      animate(
        tray,
        [
          {
            transform: 'perspective(600px) rotateX(38deg) translateY(3px)',
            boxShadow: '0 4px 0 #1e1c19, 0 8px 15px #302e2930',
          },
        ],
        500,
      ),
    );
    moves.push(animate(label, [{ opacity: 0.55 }], 350));
    moves.push(animate(mark, [{ transform: 'translateY(-2px) rotate(-9deg)', opacity: 0.4 }], 500));
    moves.push(animate(thread, [{ strokeDashoffset: 0, opacity: 0.85 }], 780, 90));
    moves.push(animate(arrow, [{ opacity: 0.2, transform: 'rotate(-45deg)' }], 450));
    await Promise.all(moves);
    if (revision !== run) return;
    setState('open');
    remaining = 1600;
    hold();
  }
  async function fold(returnFocus: boolean) {
    const run = ++revision;
    stopAuto();
    if (!launcher.open) return;
    setState('closing');
    const bottom = cards[2].offsetTop + cards[2].offsetHeight;
    // As each sheet docks, the remaining stack falls into its vacated space.
    const collapseCards = async () => {
      for (let i = cards.length - 1; i >= 0; i--) {
        if (revision !== run) return;
        const moves = [
          animate(
            cards[i],
            [
              { transform: docked(i), opacity: 1, boxShadow: '0 1px 0 #302e2930', offset: 0.96 },
              { transform: docked(i), opacity: 0, boxShadow: '0 1px 0 #302e2930' },
            ],
            260,
          ),
        ];
        const drop = i > 0 ? bottom - cards[i - 1].offsetTop - cards[i - 1].offsetHeight : 0;
        for (let j = 0; j < i; j++) {
          moves.push(
            animate(
              cards[j],
              [
                {
                  transform: `translate3d(0,${drop + 7}px,0) rotateZ(${j === 0 ? -0.7 : 0.9}deg)`,
                  offset: 0.76,
                },
                { transform: `translate3d(0,${drop}px,0) rotateZ(0deg)` },
              ],
              260,
            ),
          );
        }
        await Promise.all(moves);
      }
    };
    const moves = [collapseCards()];
    moves.push(animate(thread, [{ strokeDashoffset: -1, opacity: 0 }], 600));
    moves.push(
      animate(
        tray,
        [
          { transform: 'perspective(600px) rotateX(-5deg) translateY(1px)', offset: 0.7 },
          {
            transform: 'perspective(600px) rotateX(0deg) translateY(0px)',
            boxShadow: '0 3px 0 #1e1c19, 0 7px 16px #302e2926',
          },
        ],
        790,
      ),
    );
    moves.push(animate(label, [{ opacity: 1 }], 260, 520));
    moves.push(
      animate(mark, [{ transform: 'translateY(0px) rotate(0deg)', opacity: 1 }], 260, 260),
    );
    moves.push(animate(arrow, [{ opacity: 1, transform: 'rotate(0deg)' }], 450, 160));
    await Promise.all(moves);
    if (revision !== run) return;
    launcher.open = false;
    setState('closed');
    if (returnFocus) trigger.focus({ preventScroll: true });
  }
  function engage() {
    if (!launcher.open) return;
    if (automatic) {
      stopAuto();
      void unfold(false);
    }
  }
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    if (launcher.open && launcher.dataset.motion !== 'closing') void fold(true);
    else void unfold(false);
  });
  close.addEventListener('click', () => void fold(true));
  replay.addEventListener('click', async () => {
    replay.blur();
    await fold(false);
    if (!launcher.open) void unfold(true);
  });
  launcher.addEventListener('pointerenter', engage);
  launcher.addEventListener('focusin', engage);
  launcher.addEventListener('pointerdown', (event) => {
    if (!(
      event.target instanceof Element &&
      event.target.closest('.agent-replay, .agent-panel-close, summary')
    ))
      engage();
  });
  launcher.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && launcher.open) {
      event.preventDefault();
      event.stopPropagation();
      void fold(true);
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (launcher.open && event.target instanceof Node && !launcher.contains(event.target))
      void fold(false);
  });
  document.addEventListener('focusin', (event) => {
    if (launcher.open && event.target instanceof Node && !launcher.contains(event.target))
      void fold(false);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (timer) {
        remaining = Math.max(0, deadline - performance.now());
        clearTimer();
      }
      active.forEach((animation) => animation.pause());
    } else {
      active.forEach((animation) => animation.play());
      if (launcher.dataset.motion === 'open') hold();
    }
  });
  window.addEventListener('resize', () => {
    if (launcher.open) {
      stopAuto();
      void unfold(false);
    }
  });
  reduced.addEventListener('change', () => {
    if (launcher.open) {
      stopAuto();
      void unfold(false);
    }
  });
  void unfold(!reduced.matches);
}
