// Adapted from the legacy Hand.astro: ring geometry, pointer momentum and horizontal wheel.
// Automatic motion is slower, pausable and suspended offscreen or while reading a card.
const ring = document.querySelector<HTMLElement>('.role-ring');
if (ring) {
  const section = ring.closest<HTMLElement>('.audience-section')!;
  const slots = Array.from(ring.querySelectorAll<HTMLElement>('.role-slot'));
  const cards = slots.map((slot) => slot.querySelector<HTMLAnchorElement>('a')!);
  const controls = section.querySelector<HTMLElement>('.ring-controls')!;
  const pause = section.querySelector<HTMLButtonElement>('[data-ring-pause]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let radius = 1800,
    spacing = 0.14,
    span = slots.length * spacing;
  let angle = 0,
    velocity = 0,
    target: number | null = null,
    lastTime = 0;
  let hovered = false,
    focused = false,
    visible = false,
    paused = reduced.matches;
  let dragging: { x: number; angle: number; id: number; moved: boolean } | null = null;
  let lastX = 0,
    lastMove = 0,
    suppressUntil = 0;
  controls.hidden = false;
  ring.classList.add('ring-ready');
  const syncPause = () => {
    pause.textContent = paused ? 'Play movement' : 'Pause movement';
    pause.setAttribute('aria-pressed', String(paused));
  };
  function measure() {
    radius = ring!.clientWidth < 640 ? 1500 : 1800;
    const width = cards[0].offsetWidth,
      height = cards[0].offsetHeight;
    spacing = (width + 22) / (radius - height);
    span = slots.length * spacing;
    render();
  }
  function render() {
    slots.forEach((slot, index) => {
      const t = ((((index * spacing + angle + span / 2) % span) + span) % span) - span / 2;
      const x = Math.sin(t) * radius;
      const y = (1 - Math.cos(t)) * radius;
      slot.style.transform = `translate(${x}px, ${y}px) rotate(${t}rad)`;
      slot.style.zIndex = String(100 - Math.round(Math.abs(t) * 20));
      const inView =
        Math.abs(x) < ring!.clientWidth / 2 - cards[index].offsetWidth / 2 &&
        Math.abs(t) < Math.PI / 2;
      cards[index].tabIndex = inView ? 0 : -1;
      slot.setAttribute('aria-hidden', String(!inView));
    });
    ring!.dataset.angle = angle.toFixed(4);
  }
  function step(direction: number) {
    velocity = 0;
    target = (target ?? angle) + direction * spacing;
    if (reduced.matches) {
      angle = target;
      target = null;
      render();
    }
  }
  function frame(time: number) {
    const dt = Math.min(0.05, lastTime ? (time - lastTime) / 1000 : 0);
    lastTime = time;
    if (visible && !document.hidden) {
      if (target !== null) {
        const diff = target - angle;
        angle += diff * Math.min(1, dt * 10);
        if (Math.abs(diff) < 0.0001) {
          angle = target;
          target = null;
        }
        render();
      } else if (!dragging && !focused && !hovered && !paused && !reduced.matches) {
        angle += (Math.abs(velocity) > 0.001 ? velocity : -spacing / 14) * dt;
        velocity *= Math.pow(0.025, dt);
        render();
      }
    }
    requestAnimationFrame(frame);
  }
  ring.addEventListener('dragstart', (event) => event.preventDefault());
  ring.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || !event.isPrimary) return;
    dragging = { x: event.clientX, angle, id: event.pointerId, moved: false };
    lastX = event.clientX;
    lastMove = performance.now();
    velocity = 0;
    target = null;
  });
  ring.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - dragging.x;
    if (!dragging.moved && Math.abs(dx) > 6) {
      dragging.moved = true;
      ring.setPointerCapture(dragging.id);
      ring.classList.add('dragging');
    }
    if (!dragging.moved) return;
    angle = dragging.angle + dx / radius;
    const now = performance.now();
    velocity = Math.max(
      -spacing * 3,
      Math.min(
        spacing * 3,
        (event.clientX - lastX) / radius / (Math.max(8, now - lastMove) / 1000),
      ),
    );
    lastX = event.clientX;
    lastMove = now;
    render();
  });
  function release() {
    if (dragging?.moved) suppressUntil = performance.now() + 250;
    dragging = null;
    ring!.classList.remove('dragging');
  }
  ring.addEventListener('pointerup', release);
  ring.addEventListener('pointercancel', release);
  ring.addEventListener('lostpointercapture', release);
  ring.addEventListener(
    'click',
    (event) => {
      if (performance.now() < suppressUntil) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true,
  );
  ring.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') hovered = true;
  });
  ring.addEventListener('pointerleave', () => {
    hovered = false;
  });
  ring.addEventListener('focusin', () => {
    focused = true;
    velocity = 0;
    target = null;
  });
  ring.addEventListener('focusout', () => {
    focused = false;
  });
  ring.addEventListener(
    'wheel',
    (event) => {
      const dx =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.shiftKey
            ? event.deltaY
            : 0;
      if (!dx) return;
      event.preventDefault();
      velocity = 0;
      target = null;
      angle -= dx / radius;
      render();
    },
    { passive: false },
  );
  ring.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? 1 : -1);
    }
  });
  section.querySelector('[data-ring-prev]')?.addEventListener('click', () => step(1));
  section.querySelector('[data-ring-next]')?.addEventListener('click', () => step(-1));
  pause.addEventListener('click', () => {
    paused = !paused;
    velocity = 0;
    syncPause();
  });
  reduced.addEventListener('change', () => {
    paused = reduced.matches;
    velocity = 0;
    syncPause();
  });
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
  }).observe(ring);
  new ResizeObserver(measure).observe(ring);
  measure();
  syncPause();
  requestAnimationFrame(frame);
}
