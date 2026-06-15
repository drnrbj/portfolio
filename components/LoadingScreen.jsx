'use client';

import { useEffect, useRef, useState } from 'react';

// ── QR matrix (29×29 quiet-zone-stripped, hand-crafted pattern) ──────────────
const SIZE = 29;

function buildMatrix() {
  const m = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

  function finder(r, c) {
    for (let dr = 0; dr < 7; dr++) {
      for (let dc = 0; dc < 7; dc++) {
        const outer = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const inner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        m[r + dr][c + dc] = outer || inner ? 2 : 0;
      }
    }
    for (let i = -1; i <= 7; i++) {
      const sr = r + i; const sc = c - 1;
      if (sr >= 0 && sr < SIZE && sc >= 0) m[sr][sc] = 0;
      const sr2 = r - 1; const sc2 = c + i;
      if (sr2 >= 0 && sc2 >= 0 && sc2 < SIZE) m[sr2][sc2] = 0;
      const sr3 = r + i; const sc3 = c + 7;
      if (sr3 >= 0 && sr3 < SIZE && sc3 < SIZE) m[sr3][sc3] = 0;
      const sr4 = r + 7; const sc4 = c + i;
      if (sr4 < SIZE && sc4 >= 0 && sc4 < SIZE) m[sr4][sc4] = 0;
    }
  }

  finder(0, 0);
  finder(0, SIZE - 7);
  finder(SIZE - 7, 0);

  for (let i = 8; i < SIZE - 8; i++) {
    m[6][i] = i % 2 === 0 ? 1 : 0;
    m[i][6] = i % 2 === 0 ? 1 : 0;
  }

  const ap = 16;
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      const outer2 = Math.abs(dr) === 2 || Math.abs(dc) === 2;
      const center = dr === 0 && dc === 0;
      m[ap + dr][ap + dc] = outer2 || center ? 1 : 0;
    }
  }

  m[8][SIZE - 8] = 1;

  const seed = (x, y) => {
    const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (m[r][c] !== 0) continue;
      const inFinder =
        (r < 9 && c < 9) ||
        (r < 9 && c >= SIZE - 8) ||
        (r >= SIZE - 8 && c < 9) ||
        r === 6 || c === 6;
      if (inFinder) continue;
      m[r][c] = seed(r, c) > 0.42 ? 1 : 0;
    }
  }

  return m;
}

const MATRIX = buildMatrix();

function buildScanOrder() {
  const order = [];
  for (let r = SIZE - 1; r >= 0; r--) {
    for (let c = SIZE - 1; c >= 0; c--) {
      order.push([r, c]);
    }
  }
  return order;
}
const SCAN_ORDER = buildScanOrder();

const ACCENT_COLORS = ['#3B82F6', '#8B5CF6', '#C084FC', '#60A5FA', '#F472B6', '#34D399'];
const MODULE_COLOR = '#e2e8f0';
const FINDER_COLOR = '#60A5FA';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('build');
  const [labelText, setLabelText] = useState('INITIALIZING');
  const [visible, setVisible] = useState(true);
  const rafRef = useRef(0);
  const frameRef = useRef(0);

  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (phase !== 'build' && phase !== 'scan') return;
    const msgs = ['INITIALIZING', 'COMPILING', 'LAUNCHING'];
    let i = 0;
    const iv = setInterval(() => {
      i = (i + 1) % msgs.length;
      setLabelText(msgs[i]);
    }, 600); // Balanced speed
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    const iv = setInterval(() => setDotCount(d => (d + 1) % 4), 350); // Balanced
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = 240;
    const H = 240;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const CELL = W / SIZE;
    let buildIndex = 0;
    const BUILD_PER_FRAME = 10; // Balanced (was 18 fast, 6 slow)
    let scanY = 0;
    let glitchFrames = 0;
    const GLITCH_TOTAL = 22; // Balanced (was 18, then 30)
    let scanStartFrame = 0;
    const SCAN_DURATION = 140; // Balanced (was 120, then 180)
    let currentPhase = 'build';

    function drawModule(r, c, alpha = 1, glitching = false) {
      const val = MATRIX[r][c];
      const x = c * CELL;
      const y = r * CELL;
      if (val === 0) return;

      ctx.globalAlpha = alpha;
      if (val === 2) {
        ctx.fillStyle = glitching
          ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
          : FINDER_COLOR;
      } else {
        ctx.fillStyle = glitching
          ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
          : MODULE_COLOR;
      }
      const r2 = Math.max(0.5, CELL * 0.12);
      ctx.beginPath();
      ctx.roundRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1, r2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    function drawCanvas(phase) {
      ctx.clearRect(0, 0, W, H);

      if (phase === 'build') {
        for (let i = 0; i < buildIndex; i++) {
          const [r, c] = SCAN_ORDER[i];
          drawModule(r, c);
        }

        const beamRow = buildIndex > 0 ? SCAN_ORDER[Math.min(buildIndex - 1, SCAN_ORDER.length - 1)][0] : 0;
        const beamY = beamRow * CELL + CELL / 2;
        const grad = ctx.createLinearGradient(0, beamY - 6, 0, beamY + 6);
        grad.addColorStop(0, 'rgba(59,130,246,0)');
        grad.addColorStop(0.5, 'rgba(59,130,246,0.5)');
        grad.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, beamY - 6, W, 12);

      } else if (phase === 'scan') {
        for (let r = 0; r < SIZE; r++) {
          for (let c = 0; c < SIZE; c++) {
            if (MATRIX[r][c] !== 0) drawModule(r, c);
          }
        }
        const beamY2 = scanY * CELL + CELL / 2;
        const grad2 = ctx.createLinearGradient(0, beamY2 - 12, 0, beamY2 + 12);
        grad2.addColorStop(0, 'rgba(52,211,153,0)');
        grad2.addColorStop(0.5, 'rgba(52,211,153,0.6)');
        grad2.addColorStop(1, 'rgba(52,211,153,0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, beamY2 - 12, W, 24);

        ctx.strokeStyle = 'rgba(52,211,153,0.9)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, beamY2);
        ctx.lineTo(W, beamY2);
        ctx.stroke();

        const BL = 18;
        const CO = 8;
        ctx.strokeStyle = 'rgba(52,211,153,0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(CO, CO + BL); ctx.lineTo(CO, CO); ctx.lineTo(CO + BL, CO); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(W - CO - BL, CO); ctx.lineTo(W - CO, CO); ctx.lineTo(W - CO, CO + BL); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(CO, H - CO - BL); ctx.lineTo(CO, H - CO); ctx.lineTo(CO + BL, H - CO); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(W - CO - BL, H - CO); ctx.lineTo(W - CO, H - CO); ctx.lineTo(W - CO, H - CO - BL); ctx.stroke();

      } else if (phase === 'glitch') {
        for (let r = 0; r < SIZE; r++) {
          for (let c = 0; c < SIZE; c++) {
            if (MATRIX[r][c] !== 0) drawModule(r, c, 1, true);
          }
        }
        for (let g = 0; g < 5; g++) {
          const gy = Math.random() * H;
          const gh = Math.random() * 8 + 2;
          const shift = (Math.random() - 0.5) * 12;
          ctx.save();
          ctx.drawImage(canvas, 0, gy * dpr, W * dpr, gh * dpr, shift, gy, W, gh);
          ctx.restore();
        }
      }
    }

    function tick() {
      frameRef.current++;

      if (currentPhase === 'build') {
        buildIndex = Math.min(buildIndex + BUILD_PER_FRAME, SCAN_ORDER.length);
        drawCanvas('build');
        if (buildIndex >= SCAN_ORDER.length) {
          currentPhase = 'scan';
          setPhase('scan');
          scanStartFrame = frameRef.current;
        }
      } else if (currentPhase === 'scan') {
        scanY = (scanY + 0.35) % SIZE; // Balanced scan speed
        drawCanvas('scan');
        if (frameRef.current - scanStartFrame > SCAN_DURATION) {
          currentPhase = 'glitch';
          setPhase('glitch');
          glitchFrames = 0;
        }
      } else if (currentPhase === 'glitch') {
        glitchFrames++;
        drawCanvas('glitch');
        if (glitchFrames >= GLITCH_TOTAL) {
          currentPhase = 'fade';
          setPhase('fade');
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // In LoadingScreen.jsx, fix the fade completion logic:

  useEffect(() => {
    if (phase !== 'fade') return;
    const t = setTimeout(() => {
      setVisible(false);
      // Add a small delay to ensure the fade animation completes
      const completeTimeout = setTimeout(() => {
        onComplete?.();
      }, 100); // Reduced from 600ms to 100ms
      return () => clearTimeout(completeTimeout);
    }, 400);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (!visible) return null;

  const isFading = phase === 'fade';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a1a',
        opacity: isFading ? 0 : 1,
        transition: isFading ? 'opacity 0.7s ease-out' : 'none',
        gap: '28px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background:
            phase === 'scan'
              ? 'radial-gradient(ellipse, rgba(52,211,153,0.06) 0%, transparent 70%)'
              : phase === 'glitch'
                ? 'radial-gradient(ellipse, rgba(196,84,252,0.1) 0%, transparent 70%)'
                : 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)',
          transition: 'background 0.4s',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            imageRendering: 'pixelated',
            filter:
              phase === 'glitch'
                ? 'hue-rotate(60deg) saturate(2)'
                : 'none',
            transition: 'filter 0.1s',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          color:
            phase === 'scan'
              ? '#34D399'
              : phase === 'glitch'
                ? '#C084FC'
                : 'rgba(255,255,255,0.35)',
          transition: 'color 0.4s',
        }}
      >
        {phase === 'scan'
          ? '[ SCANNING... ]'
          : phase === 'glitch'
            ? '[ DECODING ]'
            : `${labelText}${'·'.repeat(dotCount)}`}
      </div>

      {(phase === 'build' || phase === 'scan') && (
        <div
          style={{
            width: 240,
            height: 2,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: phase === 'scan' ? '100%' : '60%',
              background:
                phase === 'scan'
                  ? 'linear-gradient(90deg, #34D399, #3B82F6)'
                  : 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              borderRadius: 2,
              transition: 'width 0.3s ease-out, background 0.4s',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}