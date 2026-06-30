"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  suffix = "",
  duration = 1100,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let done = false;
    const setVal = (v: number) => setN(v);

    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
      else done = true;
    };
    let start: number | null = null;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          raf = requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    const safety = setTimeout(() => {
      if (!done) setVal(to);
    }, 2600);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(safety);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="ct">
      {n}
      {suffix}
    </span>
  );
}
