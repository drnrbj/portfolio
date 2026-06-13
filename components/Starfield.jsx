export default function Starfield() {
  return null;
}

// 'use client';

// import { memo, useEffect, useRef } from 'react';

// // ── Constellation definitions ─────────────────────────────────────────────
// const CONSTELLATION_TEMPLATES = [
//   {
//     // Orion-like — bottom-left zone
//     name: 'orion',
//     baseX: 0.12, baseY: 0.55,
//     stars: [
//       { dx: 0.00, dy: 0.00 },  // 0 left shoulder
//       { dx: 0.06, dy: -0.02 }, // 1 right shoulder
//       { dx: 0.02, dy: 0.07 },  // 2 belt left
//       { dx: 0.04, dy: 0.07 },  // 3 belt mid
//       { dx: 0.06, dy: 0.07 },  // 4 belt right
//       { dx: 0.01, dy: 0.14 },  // 5 left foot
//       { dx: 0.07, dy: 0.13 },  // 6 right foot
//       { dx: 0.03, dy: -0.08 }, // 7 head
//     ],
//     edges: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[0,7],[1,7]],
//     color: '#3B82F6',
//   },
//   {
//     // Cassiopeia-like W — top-right zone
//     name: 'cassiopeia',
//     baseX: 0.72, baseY: 0.10,
//     stars: [
//       { dx: 0.00, dy: 0.00 },
//       { dx: 0.04, dy: -0.04 },
//       { dx: 0.08, dy: 0.00 },
//       { dx: 0.12, dy: -0.04 },
//       { dx: 0.16, dy: 0.00 },
//     ],
//     edges: [[0,1],[1,2],[2,3],[3,4]],
//     color: '#8B5CF6',
//   },
//   {
//     // Ursa Minor-like dipper — top-left zone
//     name: 'dipper',
//     baseX: 0.60, baseY: 0.70,
//     stars: [
//       { dx: 0.00, dy: 0.00 },
//       { dx: 0.05, dy: -0.03 },
//       { dx: 0.10, dy: -0.02 },
//       { dx: 0.14, dy: 0.02 },
//       { dx: 0.14, dy: 0.07 }, // cup start
//       { dx: 0.10, dy: 0.09 },
//       { dx: 0.06, dy: 0.07 },
//     ],
//     edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
//     color: '#06B6D4',
//   },
//   {
//     // Southern Cross-like — right zone
//     name: 'cross',
//     baseX: 0.82, baseY: 0.52,
//     stars: [
//       { dx: 0.04, dy: 0.00 }, // top
//       { dx: 0.04, dy: 0.08 }, // bottom
//       { dx: 0.00, dy: 0.04 }, // left
//       { dx: 0.08, dy: 0.04 }, // right
//       { dx: 0.02, dy: 0.02 }, // inner diag
//     ],
//     edges: [[0,1],[2,3],[0,4],[1,4],[2,4],[3,4]],
//     color: '#8B5CF6',
//   },
// ];

// function buildConstellations(w, h) {
//   return CONSTELLATION_TEMPLATES.map((tmpl) => {
//     const stars = tmpl.stars.map((s) => ({
//       x: (tmpl.baseX + s.dx) * w,
//       y: (tmpl.baseY + s.dy) * h,
//       // offset from group origin (for rigid drift)
//       ox: s.dx * w,
//       oy: s.dy * h,
//       radius: Math.random() * 0.8 + 1.0,
//       twinkleSpeed: Math.random() * 0.015 + 0.004,
//       twinkleOffset: Math.random() * Math.PI * 2,
//     }));
//     return {
//       ...tmpl,
//       // group origin
//       gx: tmpl.baseX * w,
//       gy: tmpl.baseY * h,
//       speedX: (Math.random() - 0.5) * 0.04,
//       speedY: (Math.random() - 0.5) * 0.04,
//       stars,
//       lineOpacity: 0.18,
//     };
//   });
// }

// // ─────────────────────────────────────────────────────────────────────────────

// function StarField() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     let animationId;

//     const getColor = () => {
//       const r = Math.random();
//       if (r < 0.60) return '#FFFFFF';
//       if (r < 0.75) return '#3B82F6';
//       if (r < 0.90) return '#8B5CF6';
//       return '#06B6D4';
//     };

//     const createStars = (w, h, count) =>
//       Array.from({ length: count }, () => ({
//         x: Math.random() * w,
//         y: Math.random() * h,
//         radius: Math.random() * 1.5 + 0.3,
//         opacity: Math.random() * 0.7 + 0.3,
//         speedX: (Math.random() - 0.5) * 0.15,
//         speedY: (Math.random() - 0.5) * 0.15,
//         twinkleSpeed: Math.random() * 0.02 + 0.005,
//         twinkleOffset: Math.random() * Math.PI * 2,
//         color: getColor(),
//       }));

//     let stars = [];
//     let constellations = [];

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       const isMobile = canvas.width < 768;
//       stars = createStars(canvas.width, canvas.height, isMobile ? 100 : 180);
//       constellations = isMobile ? [] : buildConstellations(canvas.width, canvas.height);
//     };

//     resize();

//     const draw = () => {
//       const { width, height } = canvas;
//       ctx.clearRect(0, 0, width, height);

//       const now = Date.now();

//       // ── Background stars ──────────────────────────────────────────────
//       for (const star of stars) {
//         star.x += star.speedX;
//         star.y += star.speedY;
//         if (star.x < 0) star.x = width;
//         if (star.x > width) star.x = 0;
//         if (star.y < 0) star.y = height;
//         if (star.y > height) star.y = 0;

//         const alpha = star.opacity * (0.5 + 0.5 * Math.sin(now * star.twinkleSpeed + star.twinkleOffset));
//         ctx.globalAlpha = alpha;
//         ctx.fillStyle = star.color;
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.globalAlpha = 1;
//       }

//       // ── Constellations ────────────────────────────────────────────────
//       for (const con of constellations) {
//         // Drift the group origin (slow, wraps)
//         con.gx += con.speedX;
//         con.gy += con.speedY;
//         if (con.gx < -0.2 * width)  con.gx = 1.1 * width;
//         if (con.gx >  1.1 * width)  con.gx = -0.1 * width;
//         if (con.gy < -0.2 * height) con.gy = 1.1 * height;
//         if (con.gy >  1.1 * height) con.gy = -0.1 * height;

//         // Update each star's world position from group origin + fixed offset
//         for (const s of con.stars) {
//           s.x = con.gx + s.ox;
//           s.y = con.gy + s.oy;
//         }

//         // Draw edges first (behind stars)
//         ctx.strokeStyle = con.color;
//         ctx.lineWidth = 0.6;
//         for (const [a, b] of con.edges) {
//           const sa = con.stars[a];
//           const sb = con.stars[b];
//           // Fade line based on average star twinkle
//           const ta = 0.5 + 0.5 * Math.sin(now * sa.twinkleSpeed + sa.twinkleOffset);
//           const tb = 0.5 + 0.5 * Math.sin(now * sb.twinkleSpeed + sb.twinkleOffset);
//           ctx.globalAlpha = con.lineOpacity * ((ta + tb) / 2);
//           ctx.beginPath();
//           ctx.moveTo(sa.x, sa.y);
//           ctx.lineTo(sb.x, sb.y);
//           ctx.stroke();
//         }
//         ctx.globalAlpha = 1;

//         // Draw constellation stars (slightly brighter / larger than bg stars)
//         for (const s of con.stars) {
//           const alpha = 0.7 + 0.3 * Math.sin(now * s.twinkleSpeed + s.twinkleOffset);

//           // Soft outer glow
//           const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 4);
//           grad.addColorStop(0, con.color + '55');
//           grad.addColorStop(1, 'transparent');
//           ctx.globalAlpha = alpha * 0.6;
//           ctx.fillStyle = grad;
//           ctx.beginPath();
//           ctx.arc(s.x, s.y, s.radius * 4, 0, Math.PI * 2);
//           ctx.fill();

//           // Bright core
//           ctx.globalAlpha = alpha;
//           ctx.fillStyle = '#FFFFFF';
//           ctx.beginPath();
//           ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
//           ctx.fill();

//           ctx.globalAlpha = 1;
//         }
//       }

//       animationId = requestAnimationFrame(draw);
//     };

//     draw();
//     window.addEventListener('resize', resize);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener('resize', resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: 0,
//         width: '100vw',
//         height: '100vh',
//         pointerEvents: 'none',
//         willChange: 'transform',
//       }}
//     />
//   );
// }

// export default memo(StarField);