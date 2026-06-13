'use client';

import { memo, useEffect, useRef } from 'react';

function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    // ── Color palette ──────────────────────────────────────────────────────
    const COLORS = [
      '#FFFFFF',   // white core stars
      '#93C5FD',   // light blue
      '#3B82F6',   // blue
      '#6D28D9',   // deep purple
      '#8B5CF6',   // purple
      '#C4B5FD',   // lavender
      '#E0E7FF',   // pale violet
    ];

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // ── Star creation ──────────────────────────────────────────────────────
    const createStars = (w, h, count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.3 + 0.7, // Higher base opacity (0.7-1.0)
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        twinkleSpeed: Math.random() * 0.006 + 0.002, // Much slower twinkle (was 0.018 + 0.004)
        twinkleOffset: Math.random() * Math.PI * 2,
        color: pick(COLORS),
        hasGlow: Math.random() < 0.2, // Slightly fewer glow stars
      }));

    // ── Shooting stars ─────────────────────────────────────────────────────
    const createShooter = (w, h) => ({
      x: Math.random() * w * 0.7,
      y: Math.random() * h * 0.4,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 6 + 4,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      alpha: 1,
      color: Math.random() < 0.5 ? '#93C5FD' : '#C4B5FD',
      active: false,
      timer: Math.random() * 400 + 100,
    });

    let stars = [];
    let shooters = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const isMobile = canvas.width < 768;
      stars = createStars(canvas.width, canvas.height, isMobile ? 140 : 260);
      shooters = Array.from({ length: 3 }, () => createShooter(canvas.width, canvas.height));
    };

    resize();

    const drawShooters = (w, h) => {
      for (const s of shooters) {
        s.timer--;
        if (s.timer <= 0 && !s.active) {
          s.active = true;
          s.x = Math.random() * w * 0.6;
          s.y = Math.random() * h * 0.3;
          s.alpha = 1;
          s.timer = Math.random() * 500 + 200;
        }
        if (!s.active) continue;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;

        if (s.alpha <= 0) { s.active = false; continue; }

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, s.color);

        ctx.globalAlpha = s.alpha * 0.85;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // bright tip
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      // Background stars
      for (const star of stars) {
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Reduced twinkle range: 0.7 to 1.0 instead of 0.5 to 1.0
        const twinkle = 0.85 + 0.15 * Math.sin(now * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * twinkle;

        // Optional soft glow ring
        if (star.hasGlow) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 5);
          glow.addColorStop(0, star.color + '55');
          glow.addColorStop(1, 'transparent');
          ctx.globalAlpha = alpha * 0.5;
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Shooting stars on top
      drawShooters(width, height);

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
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}

export default memo(StarField);
