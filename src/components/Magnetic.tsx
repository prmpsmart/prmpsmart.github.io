import { useMagnetic } from '../effects';

/** Wraps a button or link so it drifts toward the cursor. */
export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useMagnetic<HTMLSpanElement>();
  return (
    <span ref={ref} className="inline-flex">
      {children}
    </span>
  );
}
