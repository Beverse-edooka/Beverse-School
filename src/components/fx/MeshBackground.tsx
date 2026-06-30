"use client";

import { useMesh, type Blob } from "@/hooks/useMesh";

const BLOBS: Blob[] = [
  { cx: 0.72, cy: 0.12, amp: 0.1, r: 0.42, col: "rgba(20,120,70,.85)" },
  { cx: 0.25, cy: 0.3, amp: 0.12, r: 0.36, col: "rgba(14,90,90,.80)" },
  { cx: 0.55, cy: 0.62, amp: 0.12, r: 0.4, col: "rgba(60,140,20,.60)" },
  { cx: 0.85, cy: 0.8, amp: 0.1, r: 0.34, col: "rgba(93,196,1,.40)" },
  { cx: 0.15, cy: 0.85, amp: 0.1, r: 0.32, col: "rgba(16,110,80,.60)" },
];

export default function MeshBackground() {
  const ref = useMesh(BLOBS);
  return <canvas id="mesh" ref={ref} aria-hidden="true" />;
}
