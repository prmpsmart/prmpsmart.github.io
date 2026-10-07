import { useEffect, useRef } from 'react';
import { useSettings } from './settings-context';

const motionAllowed = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  window.matchMedia('(pointer: fine)').matches;

/** Element drifts toward the cursor while hovered, then springs back. */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  const { effects } = useSettings();

  useEffect(() => {
    const el = ref.current;
    if (!el || !effects || !motionAllowed()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => (el.style.transform = '');
    el.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
    };
  }, [effects, strength]);

  return ref;
}

/** 3D tilt toward the cursor with a moving sheen (uses --sheen-x/--sheen-y). */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T>(null);
  const { effects } = useSettings();

  useEffect(() => {
    const el = ref.current;
    if (!el || !effects || !motionAllowed()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
      el.style.setProperty('--sheen-x', `${px * 100}%`);
      el.style.setProperty('--sheen-y', `${py * 100}%`);
      el.classList.add('is-tilting');
    };
    const onLeave = () => {
      el.style.transform = '';
      el.classList.remove('is-tilting');
    };
    el.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      onLeave();
    };
  }, [effects, max]);

  return ref;
}
