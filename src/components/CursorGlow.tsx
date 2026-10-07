import { useEffect, useRef } from 'react';
import { useSettings } from '../settings-context';

/** A soft light that trails the cursor across the page. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { effects } = useSettings();

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !effects ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    )
      return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
    };
    const onLeave = () => (el.style.opacity = '0');
    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      el.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      el.style.opacity = '0';
    };
  }, [effects]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, rgba(246,230,203,0.10), rgba(182,199,170,0.05) 35%, transparent 65%)',
      }}
    />
  );
}
