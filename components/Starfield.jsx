// export default function StarField() {
//   return null;
// }

'use client';

import { memo, useEffect, useRef } from 'react';

// ── Constellation definitions ─────────────────────────────────────────────
const CONSTELLATION_TEMPLATES = [
  {
    name: 'orion',
    baseX: 0.12, baseY: 0.55,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.06, dy: -0.02 },
      { dx: 0.02, dy: 0.07 },
      { dx: 0.04, dy: 0.07 },
      { dx: 0.06, dy: 0.07 },
      { dx: 0.01, dy: 0.14 },
      { dx: 0.07, dy: 0.13 },
      { dx: 0.03, dy: -0.08 },
    ],
    edges: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[0,7],[1,7]],
    color: '#3B82F6',
  },
  {
    name: 'cassiopeia',
    baseX: 0.72, baseY: 0.10,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.04, dy: -0.04 },
      { dx: 0.08, dy: 0.00 },
      { dx: 0.12, dy: -0.04 },
      { dx: 0.16, dy: 0.00 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
    color: '#8B5CF6',
  },
  {
    name: 'dipper',
    baseX: 0.60, baseY: 0.70,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.05, dy: -0.03 },
      { dx: 0.10, dy: -0.02 },
      { dx: 0.14, dy: 0.02 },
      { dx: 0.14, dy: 0.07 },
      { dx: 0.10, dy: 0.09 },
      { dx: 0.06, dy: 0.07 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
    color: '#06B6D4',
  },
  {
    name: 'cross',
    baseX: 0.82, baseY: 0.52,
    stars: [
      { dx: 0.04, dy: 0.00 },
      { dx: 0.04, dy: 0.08 },
      { dx: 0.00, dy: 0.04 },
      { dx: 0.08, dy: 0.04 },
      { dx: 0.02, dy: 0.02 },
    ],
    edges: [[0,1],[2,3],[0,4],[1,4],[2,4],[3,4]],
    color: '#8B5CF6',
  },
  {
    name: 'scorpius',
    baseX: 0.75, baseY: 0.65,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.02, dy: -0.03 },
      { dx: 0.04, dy: -0.01 },
      { dx: 0.07, dy: -0.05 },
      { dx: 0.09, dy: -0.02 },
      { dx: 0.10, dy: 0.03 },
      { dx: 0.08, dy: 0.06 },
      { dx: 0.05, dy: 0.08 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
    color: '#06B6D4',
  },
  {
    name: 'lyra',
    baseX: 0.45, baseY: 0.08,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.03, dy: 0.04 },
      { dx: -0.03, dy: 0.04 },
      { dx: 0.00, dy: 0.07 },
      { dx: 0.05, dy: 0.02 },
    ],
    edges: [[0,1],[0,2],[1,3],[2,3],[0,4]],
    color: '#8B5CF6',
  },
  {
    name: 'triangle',
    baseX: 0.15, baseY: 0.12,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.06, dy: -0.02 },
      { dx: 0.03, dy: 0.06 },
      { dx: 0.01, dy: 0.03 },
    ],
    edges: [[0,1],[1,2],[2,0],[0,3],[1,3],[2,3]],
    color: '#3B82F6',
  },
  {
    name: 'draco',
    baseX: 0.55, baseY: 0.15,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.02, dy: -0.02 },
      { dx: 0.05, dy: 0.01 },
      { dx: 0.07, dy: -0.03 },
      { dx: 0.10, dy: 0.00 },
      { dx: 0.12, dy: 0.03 },
      { dx: 0.14, dy: 0.01 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],
    color: '#06B6D4',
  },
  // ── New additional constellations ──────────────────────────────────────
  {
    name: 'pegasus',
    baseX: 0.30, baseY: 0.20,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.08, dy: 0.00 },
      { dx: 0.08, dy: 0.08 },
      { dx: 0.00, dy: 0.08 },
      { dx: -0.04, dy: -0.04 },
      { dx: 0.12, dy: -0.04 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[0,4],[1,5]],
    color: '#F59E0B',
  },
  {
    name: 'leo',
    baseX: 0.22, baseY: 0.35,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.03, dy: -0.05 },
      { dx: 0.07, dy: -0.03 },
      { dx: 0.09, dy: 0.01 },
      { dx: 0.12, dy: -0.02 },
      { dx: 0.14, dy: 0.03 },
      { dx: 0.05, dy: 0.04 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[3,6],[0,6]],
    color: '#EC4899',
  },
  {
    name: 'gemini',
    baseX: 0.38, baseY: 0.55,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.00, dy: 0.04 },
      { dx: 0.00, dy: 0.08 },
      { dx: 0.00, dy: 0.12 },
      { dx: 0.06, dy: 0.00 },
      { dx: 0.06, dy: 0.04 },
      { dx: 0.06, dy: 0.08 },
      { dx: 0.06, dy: 0.12 },
      { dx: 0.03, dy: -0.03 },
    ],
    edges: [[0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[0,4],[8,0],[8,4]],
    color: '#3B82F6',
  },
  {
    name: 'virgo',
    baseX: 0.48, baseY: 0.38,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.04, dy: -0.03 },
      { dx: 0.08, dy: 0.00 },
      { dx: 0.06, dy: 0.05 },
      { dx: 0.02, dy: 0.06 },
      { dx: 0.00, dy: 0.10 },
      { dx: 0.10, dy: 0.04 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[3,6],[4,5]],
    color: '#10B981',
  },
  {
    name: 'aquila',
    baseX: 0.30, baseY: 0.75,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.04, dy: -0.04 },
      { dx: 0.08, dy: 0.00 },
      { dx: 0.04, dy: 0.04 },
      { dx: 0.04, dy: 0.08 },
      { dx: 0.00, dy: 0.04 },
      { dx: 0.08, dy: 0.04 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[3,4],[5,3],[6,3]],
    color: '#F97316',
  },
  {
    name: 'cygnus',
    baseX: 0.62, baseY: 0.30,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.04, dy: 0.04 },
      { dx: 0.08, dy: 0.08 },
      { dx: 0.12, dy: 0.12 },
      { dx: 0.00, dy: 0.08 },
      { dx: 0.08, dy: 0.00 },
      { dx: 0.04, dy: -0.04 },
    ],
    edges: [[0,1],[1,2],[2,3],[4,2],[5,2],[1,6]],
    color: '#8B5CF6',
  },
  {
    name: 'aries',
    baseX: 0.05, baseY: 0.30,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.04, dy: -0.02 },
      { dx: 0.08, dy: 0.01 },
      { dx: 0.11, dy: -0.01 },
    ],
    edges: [[0,1],[1,2],[2,3]],
    color: '#EF4444',
  },
  {
    name: 'taurus',
    baseX: 0.05, baseY: 0.78,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.04, dy: -0.02 },
      { dx: 0.08, dy: 0.01 },
      { dx: 0.06, dy: 0.05 },
      { dx: 0.10, dy: -0.04 },
      { dx: 0.12, dy: -0.02 },
      { dx: 0.02, dy: 0.04 },
    ],
    edges: [[0,1],[1,2],[2,3],[1,4],[4,5],[0,6]],
    color: '#F59E0B',
  },
  {
    name: 'perseus',
    baseX: 0.85, baseY: 0.20,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.02, dy: -0.04 },
      { dx: -0.02, dy: -0.04 },
      { dx: 0.00, dy: -0.08 },
      { dx: 0.00, dy: 0.04 },
      { dx: 0.03, dy: 0.08 },
      { dx: -0.03, dy: 0.08 },
    ],
    edges: [[0,1],[0,2],[1,3],[2,3],[0,4],[4,5],[4,6]],
    color: '#06B6D4',
  },
  {
    name: 'corvus',
    baseX: 0.88, baseY: 0.72,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.04, dy: -0.04 },
      { dx: 0.08, dy: 0.00 },
      { dx: 0.04, dy: 0.04 },
      { dx: 0.00, dy: 0.04 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[0,3]],
    color: '#EC4899',
  },
  {
    name: 'bootes',
    baseX: 0.20, baseY: 0.60,
    stars: [
      { dx: 0.00, dy: 0.00 },
      { dx: 0.03, dy: -0.04 },
      { dx: 0.06, dy: -0.02 },
      { dx: 0.05, dy: 0.04 },
      { dx: 0.01, dy: 0.05 },
      { dx: -0.02, dy: -0.02 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[0,5],[5,1]],
    color: '#10B981',
  },
];

// ── Movement system: each constellation has a primary drift + a secondary
//    sinusoidal wobble so they never travel in straight lines.
function buildConstellations(w, h) {
  return CONSTELLATION_TEMPLATES.map((tmpl) => {
    const speed = Math.random() * 0.06 + 0.02; // 0.02–0.08 px/frame
    const angle = Math.random() * Math.PI * 2;
    const stars = tmpl.stars.map((s) => ({
      x: (tmpl.baseX + s.dx) * w,
      y: (tmpl.baseY + s.dy) * h,
      ox: s.dx * w,
      oy: s.dy * h,
      radius: Math.random() * 1.0 + 1.2,
      twinkleSpeed: Math.random() * 0.015 + 0.006,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
    return {
      ...tmpl,
      gx: tmpl.baseX * w,
      gy: tmpl.baseY * h,
      // Primary drift
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed,
      // Sinusoidal wobble
      wobbleAmpX: Math.random() * 0.4 + 0.1,
      wobbleAmpY: Math.random() * 0.4 + 0.1,
      wobbleFreqX: Math.random() * 0.0004 + 0.0001,
      wobbleFreqY: Math.random() * 0.0004 + 0.0001,
      wobblePhaseX: Math.random() * Math.PI * 2,
      wobblePhaseY: Math.random() * Math.PI * 2,
      stars,
      lineOpacity: 0.25,
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────

function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const getColor = () => {
      const r = Math.random();
      if (r < 0.60) return '#FFFFFF';
      if (r < 0.75) return '#3B82F6';
      if (r < 0.90) return '#8B5CF6';
      return '#06B6D4';
    };

    const createStars = (w, h, count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.4 + 0.2,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: getColor(),
      }));

    let stars = [];
    let constellations = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const isMobile = canvas.width < 768;
      stars = createStars(canvas.width, canvas.height, isMobile ? 40 : 80);
      constellations = buildConstellations(canvas.width, canvas.height);
    };

    resize();

    const draw = () => {
      const { width, height } = canvas;
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      const now = Date.now();

      // ── Background stars ───────────────────────────────────────────────
      for (const star of stars) {
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const alpha = star.opacity * (0.5 + 0.5 * Math.sin(now * star.twinkleSpeed + star.twinkleOffset));
        ctx.globalAlpha = alpha * 0.5;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── Constellations ─────────────────────────────────────────────────
      for (const con of constellations) {
        // Primary drift
        con.gx += con.speedX;
        con.gy += con.speedY;

        // Sinusoidal wobble layered on top of drift
        const wobX = Math.sin(now * con.wobbleFreqX + con.wobblePhaseX) * con.wobbleAmpX;
        const wobY = Math.cos(now * con.wobbleFreqY + con.wobblePhaseY) * con.wobbleAmpY;

        // Wrap-around with padding so they glide smoothly off/onto edges
        if (con.gx < -0.25 * width)  con.gx = 1.15 * width;
        if (con.gx >  1.15 * width)  con.gx = -0.20 * width;
        if (con.gy < -0.25 * height) con.gy = 1.15 * height;
        if (con.gy >  1.15 * height) con.gy = -0.20 * height;

        for (const s of con.stars) {
          s.x = con.gx + wobX + s.ox;
          s.y = con.gy + wobY + s.oy;
        }

        // Draw edges
        ctx.strokeStyle = con.color;
        ctx.lineWidth = 0.8;
        for (const [a, b] of con.edges) {
          const sa = con.stars[a];
          const sb = con.stars[b];
          const ta = 0.5 + 0.5 * Math.sin(now * sa.twinkleSpeed + sa.twinkleOffset);
          const tb = 0.5 + 0.5 * Math.sin(now * sb.twinkleSpeed + sb.twinkleOffset);
          ctx.globalAlpha = con.lineOpacity * ((ta + tb) / 2);
          ctx.beginPath();
          ctx.moveTo(sa.x, sa.y);
          ctx.lineTo(sb.x, sb.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Draw constellation stars
        for (const s of con.stars) {
          const alpha = 0.8 + 0.2 * Math.sin(now * s.twinkleSpeed + s.twinkleOffset);

          // Glow
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 5);
          grad.addColorStop(0, con.color + '66');
          grad.addColorStop(1, 'transparent');
          ctx.globalAlpha = alpha * 0.7;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 5, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.globalAlpha = alpha;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = 1;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}

export default memo(StarField);