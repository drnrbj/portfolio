'use client';

import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const getColor = () => {
      const rand = Math.random();
      if (rand < 0.60) return '#FFFFFF';
      if (rand < 0.75) return '#3B82F6';
      if (rand < 0.90) return '#8B5CF6';
      return '#06B6D4';
    };

    const createStars = (w, h) =>
      Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: getColor(),
      }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = createStars(canvas.width, canvas.height);
    };

    let stars = [];
    resize();

    const draw = () => {
      const { width, height } = canvas;
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      const now = Date.now();
      for (const star of stars) {
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentOpacity =
          star.opacity * (0.5 + 0.5 * Math.sin(now * star.twinkleSpeed + star.twinkleOffset));

        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
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
      }}
    />
  );
}