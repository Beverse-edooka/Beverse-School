import { useEffect, useRef } from "react";

export type Blob = {
  cx: number;
  cy: number;
  amp: number;
  r: number;
  col: string;
};

export function useMesh(blobs: Blob[]) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * 0.5;
    let w = 0;
    let h = 0;
    let raf = 0;
    const B = blobs.map((b) => ({ ...b, a: Math.random() * 6.28 }));

    const size = () => {
      w = cv.width = Math.max(2, innerWidth * dpr);
      h = cv.height = Math.max(2, innerHeight * dpr);
      cv.style.width = `${innerWidth}px`;
      cv.style.height = `${innerHeight}px`;
    };
    size();
    addEventListener("resize", size);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = `blur(${70 * dpr}px)`;
      for (const b of B) {
        b.a += 0.0042;
        const cx = (b.cx + Math.cos(b.a) * b.amp) * w;
        const cy = (b.cy + Math.sin(b.a * 1.13) * b.amp) * h;
        const rad = b.r * Math.min(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, b.col);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, 7);
        ctx.fill();
      }
      ctx.filter = "none";
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
    };
  }, [blobs]);

  return ref;
}
