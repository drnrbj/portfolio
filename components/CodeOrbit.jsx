import { useEffect, useRef } from 'react';

const KEYWORDS = [
  { text: 'const',  r: 96,  speed:  0.008,  angle: 0.0,  color: '#C084FC' },
  { text: '</>',    r: 108, speed: -0.011,  angle: 1.2,  color: '#60A5FA' },
  { text: 'npm',    r: 90,  speed:  0.013,  angle: 2.4,  color: '#34D399' },
  { text: '{ }',    r: 112, speed: -0.009,  angle: 3.6,  color: '#F472B6' },
  { text: 'git',    r: 94,  speed:  0.010,  angle: 4.8,  color: '#FBBF24' },
  { text: 'async',  r: 104, speed: -0.007,  angle: 0.7,  color: '#60A5FA' },
  { text: '=>',     r: 88,  speed:  0.012,  angle: 2.1,  color: '#C084FC' },
  { text: '.tsx',   r: 110, speed: -0.010,  angle: 5.2,  color: '#34D399' },
];

const MIN_KW_R = 88;

export default function CodeOrbit({ 
  containerSize = 360,
  profileInset = 3,
  topOffset = -20,
}) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(KEYWORDS.map(k => ({ ...k })));
  const rafRef    = useRef(0);
  const tRef      = useRef(0);

  const size = containerSize;
  const PROFILE_R = (size - profileInset * 2) / 2;
  
  // Make canvas slightly larger to prevent clipping
  const canvasPadding = 60;
  const canvasSize = size + canvasPadding * 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width  = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width  = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);

    // Center of the larger canvas
    const CX = canvasSize / 2;
    const CY = canvasSize / 2;

    function draw() {
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      const t = tRef.current;

      // Orbiting keywords
      stateRef.current.forEach(kw => {
        kw.angle += kw.speed;
        const orbitR = PROFILE_R + 24 + (kw.r - MIN_KW_R);
        const x = CX + Math.cos(kw.angle) * orbitR;
        const y = CY + Math.sin(kw.angle) * orbitR;

        ctx.shadowColor = kw.color;
        ctx.shadowBlur  = 12;

        const fontSize = Math.max(9, size * 0.034);
        ctx.font = `600 ${fontSize}px 'SF Mono', 'Fira Code', monospace`;
        const metrics = ctx.measureText(kw.text);
        const pw = metrics.width + 10;
        const ph = fontSize + 6;
        ctx.fillStyle = `${kw.color}18`;
        ctx.beginPath();
        ctx.roundRect(x - pw / 2, y - ph / 2, pw, ph, ph / 2);
        ctx.fill();

        ctx.fillStyle = kw.color;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(kw.text, x, y);
        ctx.shadowBlur = 0;
      });

      // Glowing ring on profile edge
      ctx.beginPath();
      ctx.arc(CX, CY, PROFILE_R + 1, 0, Math.PI * 2);
      const borderAlpha = 0.5 + 0.3 * Math.sin(t * 0.04);
      ctx.strokeStyle = `rgba(59,130,246,${borderAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#3B82F6';
      ctx.shadowBlur  = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      tRef.current++;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [canvasSize, PROFILE_R, size]);

  return (
    <div style={{ 
      position: 'relative', 
      width: size, 
      height: size,
      marginTop: topOffset,
      overflow: 'visible', // Allow overflow
    }}>
      {/* Profile image circle */}
      <div
        style={{
          position: 'absolute',
          inset: profileInset,
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e1b4b, #1e3a5f)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <img
          src="/images/profile.png"
          alt="Dranreb Jay Arzadon"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Canvas for orbit animations - positioned to center over the container */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
        aria-label="Animated code orbit around profile photo"
      />
    </div>
  );
}