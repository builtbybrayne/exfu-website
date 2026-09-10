type Animate = (
  el: Element,
  frames: Keyframe[],
  duration: number,
  delay?: number,
  easing?: string,
) => Promise<void>;
export function createFabStudies(
  launcher: HTMLDetailsElement,
  cards: HTMLElement[],
  animate: Animate,
  discard: (el: Element) => void,
) {
  const panel = launcher.querySelector<HTMLElement>('.agent-panel')!;
  const trigger = launcher.querySelector<HTMLElement>('summary')!;
  const overlays: HTMLElement[] = [];
  const lip = document.createElement('span');
  lip.className = 'fab-slot-lip';
  lip.setAttribute('aria-hidden', 'true');
  trigger.append(lip);
  function reset() {
    overlays.splice(0).forEach((el) => {
      discard(el);
      el.remove();
    });
    discard(lip);
    lip.style.opacity = '0';
    lip.style.transform = 'scaleY(0)';
    delete launcher.dataset.collapseStudy;
  }
  function run(kind: string, rate: number) {
    reset();
    launcher.dataset.collapseStudy = kind;
    const duration = 1200 * rate;
    const area = panel.getBoundingClientRect();
    const mouth = trigger.getBoundingClientRect();
    const bottom = cards[2].offsetTop + cards[2].offsetHeight;
    const promises: Promise<void>[] = [];
    const smooth = 'cubic-bezier(.3,0,.25,1)';
    promises.push(
      animate(
        lip,
        [
          { opacity: 1, transform: 'scaleY(1)', offset: 0.1 },
          { opacity: 1, transform: 'scaleY(1)', offset: 0.92 },
          { opacity: 0, transform: 'scaleY(0)', offset: 1 },
        ],
        duration,
        0,
        'linear',
      ),
    );
    cards.forEach((card, i) => {
      const start = (2 - i) / 3,
        end = (3 - i) / 3;
      const portion = (p: number) => start + (end - start) * p;
      const width = card.offsetWidth,
        height = card.offsetHeight;
      const scale = (mouth.width - 18) / width;
      const dx = mouth.left - area.left + 9 - card.offsetLeft;
      const mouthY = mouth.top - area.top - card.offsetTop - 3;
      const drop = bottom - card.offsetTop - height;
      const pose = (y: number, rx = 0, rz = 0, sway = 0) =>
        `translate3d(${dx + sway}px,${y}px,0) scale(${scale}) rotateX(${rx}deg) rotateZ(${rz}deg)`;
      const frames: Keyframe[] = [];
      if (start > 0)
        frames.push({
          transform: `translate3d(0,${drop}px,0)`,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          offset: start,
          easing: smooth,
        });
      if (kind === 'slot') {
        const direction = i === 1 ? -1 : 1;
        // Align the bottom edge with the mouth, then feed the paper behind its lip.
        frames.push(
          {
            transform: pose(mouthY - height * scale, -9, 2.4 * direction, 3 * direction),
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            offset: portion(0.34),
            easing: 'cubic-bezier(.25,.15,.65,1)',
          },
          {
            transform: pose(mouthY - height * scale * 0.73, 5, -1.6 * direction, -2 * direction),
            clipPath: 'inset(0% 0% 27% 0%)',
            opacity: 1,
            offset: portion(0.52),
            easing: 'cubic-bezier(.3,0,.6,1)',
          },
          {
            transform: pose(mouthY - height * scale * 0.43, -2, 0.8 * direction, direction),
            clipPath: 'inset(0% 0% 57% 0%)',
            opacity: 1,
            offset: portion(0.72),
            easing: 'cubic-bezier(.3,0,.6,1)',
          },
          {
            transform: pose(mouthY - height * scale * 0.19, 1, -0.3 * direction, -0.4 * direction),
            clipPath: 'inset(0% 0% 81% 0%)',
            opacity: 1,
            offset: portion(0.87),
          },
          { transform: pose(mouthY), clipPath: 'inset(0% 0% 100% 0%)', opacity: 1, offset: end },
        );
      } else if (kind === 'envelope') {
        const flap = document.createElement('div');
        flap.className = `fab-study-flap ${i === 1 ? 'is-dark' : ''}`;
        flap.setAttribute('aria-hidden', 'true');
        Object.assign(flap.style, {
          left: `${card.offsetLeft}px`,
          top: `${card.offsetTop}px`,
          width: `${width}px`,
          height: `${height}px`,
          transformOrigin: '0 0',
          opacity: '0',
        });
        const face = document.createElement('div');
        face.className = 'fab-study-foldface';
        flap.append(face);
        panel.append(flap);
        overlays.push(face, flap);
        promises.push(
          animate(
            face,
            [
              { transform: 'rotateX(0deg)', offset: start },
              { transform: 'rotateX(-12deg)', offset: portion(0.05), easing: smooth },
              { transform: 'rotateX(-179deg)', offset: portion(0.44) },
              { transform: 'rotateX(-179deg)', offset: 1 },
            ],
            duration,
            0,
            'linear',
          ),
        );
        // The lower half rotates up over a crease; its reverse is a warm unprinted surface.
        const folded = pose(mouthY - height * scale * 0.5 - 7);
        frames.push(
          {
            transform: `translate3d(0,${drop}px,0)`,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            offset: portion(0.04),
          },
          {
            transform: `translate3d(0,${drop}px,0)`,
            clipPath: 'inset(0% 0% 50% 0%)',
            opacity: 1,
            offset: portion(0.44),
            easing: smooth,
          },
          { transform: folded, clipPath: 'inset(0% 0% 50% 0%)', opacity: 1, offset: portion(0.72) },
          { transform: pose(mouthY), clipPath: 'inset(0% 0% 100% 0%)', opacity: 1, offset: end },
        );
        promises.push(
          animate(
            flap,
            [
              {
                transform: `translate3d(0,${drop}px,1px)`,
                opacity: 0,
                offset: start,
              },
              {
                transform: `translate3d(0,${drop}px,1px)`,
                opacity: 1,
                offset: portion(0.05),
                easing: smooth,
              },
              {
                transform: `translate3d(0,${drop}px,1px)`,
                opacity: 1,
                offset: portion(0.44),
                easing: smooth,
              },
              { transform: `${folded}`, opacity: 1, offset: portion(0.72) },
              { transform: `${pose(mouthY)}`, opacity: 0, offset: end },
              ...(end < 1 ? [{ opacity: 0, offset: 1 }] : []),
            ],
            duration,
            0,
            'linear',
          ),
        );
      } else {
        const roll = document.createElement('div');
        roll.className = `fab-study-roll ${i === 1 ? 'is-dark' : ''}`;
        roll.setAttribute('aria-hidden', 'true');
        Object.assign(roll.style, {
          left: `${card.offsetLeft}px`,
          top: `${card.offsetTop}px`,
          width: `${width}px`,
          opacity: '0',
        });
        panel.append(roll);
        overlays.push(roll);
        // Curl travels up the sheet; a shaded cylinder remains after the surface is wound away.
        frames.push(
          {
            transform: `translate3d(0,${drop}px,0)`,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            offset: portion(0.04),
            easing: smooth,
          },
          {
            transform: `translate3d(0,${drop}px,0)`,
            clipPath: 'inset(0% 0% 100% 0%)',
            opacity: 1,
            offset: portion(0.64),
          },
          {
            transform: `translate3d(0,${drop}px,0)`,
            clipPath: 'inset(0% 0% 100% 0%)',
            opacity: 1,
            offset: end,
          },
        );
        promises.push(
          animate(
            roll,
            [
              {
                transform: `translate3d(0,${drop + height - 5}px,2px) scaleY(.2)`,
                opacity: 0,
                offset: start,
              },
              {
                transform: `translate3d(0,${drop + height - 10}px,2px) scaleY(.5)`,
                opacity: 1,
                offset: portion(0.04),
                easing: smooth,
              },
              {
                transform: `translate3d(0,${drop - 8}px,8px) scaleY(1)`,
                opacity: 1,
                offset: portion(0.64),
                easing: smooth,
              },
              {
                transform: `translate3d(${dx}px,${mouthY - 8}px,0) scaleX(${scale}) rotateZ(-3deg)`,
                opacity: 1,
                offset: portion(0.91),
              },
              {
                transform: `translate3d(${dx}px,${mouthY + 5}px,0) scale(${scale},.2)`,
                opacity: 0,
                offset: end,
              },
              ...(end < 1 ? [{ opacity: 0, offset: 1 }] : []),
            ],
            duration,
            0,
            'linear',
          ),
        );
      }
      if (end < 1) frames.push({ ...frames[frames.length - 1], offset: 1 });
      promises.push(animate(card, frames, duration, 0, 'linear'));
    });
    return promises;
  }
  return { run, reset };
}
