'use client';

import { memo, useEffect, useRef } from 'react';

function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const createOrb = (w, h) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 120 + 100,
      baseAlpha: Math.random() * 0.05 + 0.05, // Slightly brighter (was 0.04+0.03, now 0.05-0.10)
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      pulseSpeed: Math.random() * 0.005 + 0.003,
      pulseOffset: Math.random() * Math.PI * 2,
      color: Math.random() < 0.5 ? '#3B82F6' : '#8B5CF6',
    });

    let orbs = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      orbs = Array.from({ length: 3 }, () => createOrb(canvas.width, canvas.height));
    };

    resize();

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      for (const orb of orbs) {
        orb.x += orb.speedX;
        orb.y += orb.speedY;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const pulse = Math.sin(now * orb.pulseSpeed + orb.pulseOffset);
        const alpha = orb.baseAlpha + pulse * orb.baseAlpha * 0.6;

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        gradient.addColorStop(0, orb.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.4, orb.color + Math.floor(alpha * 0.6 * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, 'transparent');

        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
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
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

export default memo(StarField);