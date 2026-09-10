const params = new URLSearchParams(location.search);
const review = document.querySelector<HTMLElement>('.hero-review');
if (review && params.has('hero-review')) {
  const scene = document.querySelector<HTMLElement>('.paper-scene')!;
  const cards = Array.from(scene.querySelectorAll<HTMLElement>('.paper'));
  const orbit = scene.querySelector<HTMLElement>('.paper-orbit')!;
  const buttons = Array.from(review.querySelectorAll<HTMLButtonElement>('[data-hero-option]'));
  const description = review.querySelector<HTMLElement>('.hero-review-description')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const descriptions: Record<string, string> = {
    shuffle:
      'A tight pack peels apart, trades places in depth, balances on edge, then fans into position.',
    chain:
      'A tipping card triggers the next. Each impact stamps its number; the red circle absorbs the final landing.',
    drawing:
      'Red outlines draw themselves. Paper unrolls inside them, then the typography prints onto the new surfaces.',
    machine:
      'Paper, numbers and captions separate into depth layers, rotate together, then assemble with three precise clicks.',
  };
  let animations: Animation[] = [];
  let selected = params.get('hero-review') || 'shuffle';
  if (!(selected in descriptions)) selected = 'shuffle';
  scene.classList.add('hero-motion-review');
  review.hidden = false;
  const outlines = cards.map((card) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'hero-card-outline');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    const rect = document.createElementNS(svg.namespaceURI, 'rect');
    for (const [key, value] of Object.entries({
      x: '1',
      y: '1',
      width: '98',
      height: '98',
      pathLength: '1',
    }))
      rect.setAttribute(key, value);
    svg.append(rect);
    card.append(svg);
    return svg;
  });
  function move(el: Element, frames: Keyframe[], duration: number, delay = 0) {
    const animation = el.animate(frames, { duration, delay, fill: 'both', easing: 'linear' });
    animations.push(animation);
    if (document.hidden) animation.pause();
  }
  function play() {
    animations.forEach((animation) => animation.cancel());
    animations = [];
    cards.forEach((card) => {
      card.style.removeProperty('z-index');
    });
    outlines.forEach((svg) => {
      svg.style.visibility = 'hidden';
    });
    buttons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.heroOption === selected)),
    );
    description.textContent =
      descriptions[selected] +
      (reduced.matches ? ' Reduced motion: showing the finished composition.' : '');
    const url = new URL(location.href);
    url.searchParams.set('hero-review', selected);
    history.replaceState(null, '', url);
    if (reduced.matches) return;
    const bases = cards.map((card) => getComputedStyle(card).transform);
    const frame = (i: number, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) =>
      `translate3d(${x}px,${y}px,${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) ${bases[i]}`;
    const final = (i: number) => ({ transform: bases[i], offset: 1 });
    const smooth = 'cubic-bezier(.2,.75,.25,1)';
    const snap = 'cubic-bezier(.55,0,.85,.5)';
    if (selected === 'shuffle') {
      const cx = cards[1].offsetLeft;
      const cy = cards[1].offsetTop;
      cards.forEach((card, i) => {
        const x = cx - card.offsetLeft,
          y = cy - card.offsetTop;
        move(
          card,
          [
            {
              transform: frame(i, x + i * 3, y + i * 4, i * 5, 0, 0, [-3, -9, -13][i]),
              offset: 0,
              easing: smooth,
            },
            {
              transform: frame(
                i,
                x + [-28, 20, 38][i],
                y + [-60, 12, 50][i],
                [100, -35, 65][i],
                [-22, 16, -12][i],
                [-35, 12, 30][i],
                [-18, 12, 20][i],
              ),
              offset: 0.24,
              easing: smooth,
            },
            {
              transform: frame(
                i,
                x + [60, -65, 0][i],
                y + [25, -25, 12][i],
                [-25, 115, 55][i],
                [12, -20, 6][i],
                [65, -45, 82][i],
                [8, -15, 4][i],
              ),
              offset: 0.49,
              easing: smooth,
            },
            {
              transform: frame(
                i,
                [-18, 18, -8][i],
                [-16, 0, 15][i],
                [35, 20, 10][i],
                [-6, 4, -3][i],
                [-10, 8, 5][i],
                [-3, 2, -2][i],
              ),
              offset: 0.78,
              easing: smooth,
            },
            { transform: frame(i, 2, 4, 0, 0, 0, 1), offset: 0.92, easing: smooth },
            final(i),
          ],
          2400,
          i * 65,
        );
      });
    } else if (selected === 'chain') {
      cards.forEach((card, i) => {
        move(
          card,
          [
            { transform: frame(i, 0, -18, 18, 0, 0, -12), offset: 0, easing: snap },
            { transform: frame(i, 9, 24, 4, 16, 0, 17), offset: 0.29, easing: smooth },
            { transform: frame(i, -5, -22, 40, -13, 7, -9), offset: 0.49, easing: smooth },
            { transform: frame(i, 2, 8, 0, 3, -2, 3), offset: 0.73, easing: smooth },
            final(i),
          ],
          1200,
          i * 350,
        );
        move(
          card.querySelector('.paper-number')!,
          [
            {
              transform: 'translateZ(90px) scale(1.5) rotate(-12deg)',
              opacity: 0,
              offset: 0,
              easing: snap,
            },
            {
              transform: 'translateZ(0) scale(.93) rotate(2deg)',
              opacity: 1,
              offset: 0.58,
              easing: smooth,
            },
            { transform: 'translateZ(8px) scale(1.04)', offset: 0.78, easing: smooth },
            { transform: 'none', opacity: 1, offset: 1 },
          ],
          480,
          i * 350 + 200,
        );
      });
      move(
        orbit,
        [
          { transform: 'scale(1)', offset: 0 },
          { transform: 'scale(1.14,.82) translateY(8px)', offset: 0.22, easing: smooth },
          { transform: 'scale(.94,1.08)', offset: 0.52, easing: smooth },
          { transform: 'scale(1)', offset: 1 },
        ],
        700,
        850,
      );
    } else if (selected === 'drawing') {
      cards.forEach((card, i) => {
        const svg = outlines[i];
        svg.style.visibility = 'visible';
        move(
          svg.querySelector('rect')!,
          [
            { strokeDasharray: '1', strokeDashoffset: 1, opacity: 1, offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: 0, opacity: 1, offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: 0, opacity: 0, offset: 1 },
          ],
          1200,
          i * 240,
        );
        move(
          card,
          [
            { background: 'transparent', boxShadow: '0 0 0 transparent', offset: 0 },
            {
              background: 'transparent',
              boxShadow: '0 0 0 transparent',
              offset: 0.4,
              easing: smooth,
            },
            {
              background: '#fffefa',
              boxShadow: '0 4px 0 #bcb09c, 0 22px 22px -12px #39302529',
              offset: 1,
            },
          ],
          1300,
          i * 240,
        );
        move(
          card,
          [
            { transform: frame(i, 0, 0, 0, 0, 0, 0), offset: 0 },
            { transform: frame(i, 0, 0, 0, 0, 0, 0), offset: 0.35, easing: smooth },
            { transform: frame(i, 0, -18, 45, -16, 8, 0), offset: 0.65, easing: smooth },
            final(i),
          ],
          1700,
          i * 240,
        );
        Array.from(card.querySelectorAll<HTMLElement>(':scope > span')).forEach((part, j) => {
          move(
            part,
            [
              {
                clipPath: 'inset(0 100% 0 0)',
                transform: 'translateY(7px)',
                opacity: 0,
                offset: 0,
                easing: smooth,
              },
              { clipPath: 'inset(0 0% 0 0)', transform: 'translateY(0)', opacity: 1, offset: 1 },
            ],
            500,
            650 + i * 240 + j * 130,
          );
        });
      });
    } else {
      cards.forEach((card, i) => {
        move(
          card,
          [
            { transform: frame(i, 0, 0, 0), offset: 0, easing: smooth },
            {
              transform: frame(i, [-12, 0, 12][i], [-8, 0, 8][i], -35, 24, -24, 0),
              offset: 0.25,
              easing: smooth,
            },
            { transform: frame(i, 0, 0, 0, 12, 28, 0), offset: 0.55, easing: smooth },
            { transform: frame(i, 0, 0, 0, -3, -3, 0), offset: 0.83, easing: smooth },
            final(i),
          ],
          2400,
          i * 80,
        );
        Array.from(card.querySelectorAll<HTMLElement>(':scope > span')).forEach((part, j) => {
          const z = [100, 65, 35][j];
          move(
            part,
            [
              { transform: 'translate3d(0,0,0)', offset: 0, easing: smooth },
              {
                transform: `translate3d(${[-12, 8, 3][j]}px,${[-12, -3, 12][j]}px,${z}px)`,
                offset: 0.25,
                easing: smooth,
              },
              { transform: `translate3d(0,0,${z}px)`, offset: 0.59, easing: snap },
              { transform: 'translate3d(0,0,-2px)', offset: 0.8, easing: smooth },
              { transform: 'translate3d(0,0,3px)', offset: 0.87, easing: smooth },
              { transform: 'translate3d(0,0,0)', offset: 1 },
            ],
            2100 + j * 100,
            i * 80,
          );
        });
      });
    }
  }
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      selected = button.dataset.heroOption!;
      play();
    }),
  );
  review.querySelector('.hero-review-replay')!.addEventListener('click', play);
  reduced.addEventListener('change', play);
  document.addEventListener('visibilitychange', () =>
    animations.forEach((animation) => (document.hidden ? animation.pause() : animation.play())),
  );
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(play, 180);
  });
  play();
}
