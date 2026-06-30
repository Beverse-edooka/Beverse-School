"use client";

import { useEffect, useRef } from "react";

export function useTilt(maxDeg = 7) {
  const area = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = area.current;
    const c = card.current;
    if (!a || !c) return;

    const move = (e: MouseEvent) => {
      const r = a.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(1000px) rotateY(${px * maxDeg}deg) rotateX(${-py * maxDeg}deg)`;
    };
    const leave = () => {
      c.style.transform = "perspective(1000px)";
    };

    a.addEventListener("mousemove", move);
    a.addEventListener("mouseleave", leave);
    return () => {
      a.removeEventListener("mousemove", move);
      a.removeEventListener("mouseleave", leave);
    };
  }, [maxDeg]);

  return { area, card };
}
