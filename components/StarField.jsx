'use client';

import { memo, useEffect, useRef } from 'react';

function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const createShooter = (w, h) => ({
      x: Math.random() * w * 0.7,
      y: Math.random() * h * 0.4,
      len: Math.random() * 100 + 50,
      speed: Math.random() * 3 + 2, // Slower (was 6+4, now 2-5)
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      alpha: 1,
      color: Math.random() < 0.5 ? '#93C5FD' : '#C4B5FD',
      active: false,
      timer: Math.random() * 150 + 50, // More frequent (was 400+100, now 50-200)
    });

    let shooters = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      shooters = Array.from({ length: 5 }, () => createShooter(canvas.width, canvas.height)); // More shooters (was 3)
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
          s.timer = Math.random() * 200 + 80; // Quicker respawn (was 500+200)
        }
        if (!s.active) continue;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012; // Slower fade (was 0.018)

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

        // Bright tip
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