"use client";
import { useEffect, useRef } from "react";

/**
 * Prototype of hero option A: the headshot rebuilt from particles that
 * fly in, settle into the portrait, and move away from the cursor.
 * Pure canvas 2D, no dependencies. Final style follows the design reference.
 */
export function ParticlePortrait({ src = "/images/headshot-sample.png", className = "" }: { src?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const mouse = { x: -1e4, y: -1e4 };
    type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; r: number; c: string };
    let ps: P[] = [];
    let W = 0, H = 0;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = img.width; off.height = img.height;
      const o = off.getContext("2d")!;
      o.drawImage(img, 0, 0);
      const data = o.getImageData(0, 0, img.width, img.height).data;
      const step = W < 400 ? 2 : 1;
      const scale = Math.min(W / img.width, H / img.height);
      const ox = (W - img.width * scale) / 2, oy = (H - img.height * scale) / 2;
      ps = [];
      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          const i = (y * img.width + x) * 4;
          const lum = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11) / 255;
          // background was masked to black in the sample image
          if (lum < 0.06) continue;
          const tx = ox + x * scale, ty = oy + y * scale;
          const a = Math.random() * Math.PI * 2, d = Math.max(W, H) * (0.6 + Math.random() * 0.6);
          ps.push({
            tx, ty,
            x: reduce ? tx : W / 2 + Math.cos(a) * d, y: reduce ? ty : H / 2 + Math.sin(a) * d,
            vx: 0, vy: 0,
            r: Math.max(1, scale * 0.9) * (0.55 + lum * 0.6),
            c: `rgba(${Math.round(data[i] * 0.55 + 90)},${Math.round(data[i + 1] * 0.6 + 95)},${Math.round(data[i + 2] * 0.5 + 128)},${(0.25 + lum * 0.75).toFixed(2)})`,
          });
        }
      }
      tick();
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 3600) { const f = (3600 - d2) / 3600 * 2.2; p.vx += dx / 60 * f; p.vy += dy / 60 * f; }
        p.vx += (p.tx - p.x) * 0.045; p.vy += (p.ty - p.y) * 0.045;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.r, p.r);
      }
      if (!reduce) raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = mouse.y = -1e4; };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave); };
  }, [src]);

  return <canvas ref={ref} className={className} aria-label="Animated portrait made of particles" role="img" />;
}
