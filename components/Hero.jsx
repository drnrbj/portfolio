'use client';

import StarField from '@/components/StarField';
import CodeOrbit from '@/components/CodeOrbit';
import { useEffect, useState, useRef } from 'react';

const ROLES = ['WELCOME TO MY PORTFOLIO', 'WELCOME TO MY PORTFOLIO', 'WELCOME TO MY PORTFOLIO'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const gridCanvasRef = useRef(null);

  // Entrance animation after loading screen
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
        requestAnimationFrame(() => {
          setAnimationsStarted(true);
        });
      }, 300);
      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Safety fallback
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
        requestAnimationFrame(() => {
          setAnimationsStarted(true);
        });
      }
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, [isVisible]);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const currentRole = ROLES[currentRoleIndex];

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((i) => (i + 1) % ROLES.length);
    } else {
      const speed = isDeleting ? 30 : 50;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, isVisible]);

  // Grid lines animation
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrame;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 50;
    let offset = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const opacity = animationsStarted ? 0.08 : 0.03;

      ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = (offset % gridSize); x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = (offset % gridSize); y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw subtle dots at intersections
      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 1.5})`;
      for (let x = (offset % gridSize); x < canvas.width; x += gridSize) {
        for (let y = (offset % gridSize); y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      offset += 0.15; // Slow movement
      animationFrame = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animationsStarted]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      {/* Grid Lines Canvas */}
      <canvas
        ref={gridCanvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <StarField />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center top, rgba(139,92,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Grid container */}
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
        className="hero-grid"
      >
        {/* ---- LEFT COLUMN (Profile) ---- */}
        <div
          className="hero-left"
          style={{
            order: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '80px',
            opacity: animationsStarted ? 1 : 0,
            transform: animationsStarted ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
          }}
        >
          <CodeOrbit containerSize={360} topOffset={-100} />
        </div>

        {/* ---- RIGHT COLUMN (Text) ---- */}
        <div
          className="hero-right"
          style={{
            order: 2,
            marginTop: '-80px',
            opacity: animationsStarted ? 1 : 0,
            transition: 'opacity 0.6s ease-out 0.5s',
          }}
        >
          {/* Typewriter role */}
          <div
            className="hero-typewriter"
            style={{
              height: 32,
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
              opacity: animationsStarted ? 1 : 0,
              transform: animationsStarted ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.6s ease-out 0.6s',
            }}
          >
            <span style={{ color: '#60A5FA', fontSize: 'clamp(0.875rem, 2vw, 18px)', fontWeight: 700 }}>
              {displayText}
            </span>
            <span
              style={{
                color: '#60A5FA',
                fontSize: 'clamp(0.875rem, 2vw, 1.2rem)',
                fontWeight: 300,
                marginLeft: 2,
                animation: 'blink 0.75s step-end infinite',
              }}
            >
              |
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              lineHeight: 1.2,
              opacity: animationsStarted ? 1 : 0,
              transform: animationsStarted ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.6s ease-out 0.7s',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(3rem, 6vw, 80px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Hi, I'm
            </div>
            <h1
              className="glow-text"
              style={{
                fontSize: 'clamp(3rem, 6vw, 80px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                margin: '0',
                textShadow: '0 0 15px rgba(99,102,241,0.15), 0 0 30px rgba(139,92,246,0.05)',
                lineHeight: 1.1,
              }}
            >
              DRANREB JAY
            </h1>
          </div>

          {/* Description */}
          <p
            className="hero-description"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'clamp(0.875rem, 2vw, 18px)',
              lineHeight: 1.8,
              maxWidth: '42rem',
              marginTop: '24px',
              opacity: animationsStarted ? 1 : 0,
              transform: animationsStarted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.8s',
            }}
          >
            Computer Science student focused on building practical web
            applications and exploring machine learning. I enjoy solving
            real-world problems through code, and I'm always eager to learn
            new tools and improve my skills along the way.
          </p>

          {/* CTA button */}
          <div
            className="hero-buttons"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '32px',
              opacity: animationsStarted ? 1 : 0,
              transform: animationsStarted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 1s',
            }}
          >
            <button
              className="btn-primary"
              onClick={() => scrollTo('projects')}
              style={{ cursor: 'pointer' }}
            >
              View Projects
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollTo('contact')}
              style={{ cursor: 'pointer' }}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .hero-left {
            order: -1 !important;
            padding-left: 0 !important;
            margin-bottom: 0 !important;
          }
          .hero-right {
            order: 2 !important;
            text-align: center;
            margin-top: 0 !important;
          }
          .hero-typewriter {
            justify-content: center;
          }
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero-left {
            transform: scale(0.8) !important;
            margin-bottom: -20px !important;
          }
        }

        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        ` }} />

    </section>
  );
}