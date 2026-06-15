'use client';

import StarField from '@/components/StarField';
import CodeOrbit from '@/components/CodeOrbit';
import { useEffect, useState } from 'react';

const ROLES = ['WELCOME TO MY PORTFOLIO', 'WELCOME TO MY PORTFOLIO', 'WELCOME TO MY PORTFOLIO'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);

  // Entrance animation after loading screen
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    const raf = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Trigger animations after visible state is set
        requestAnimationFrame(() => {
          setAnimationsStarted(true);
        });
      }, 300); // Slightly increased delay for smoother transition
      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Safety fallback - ensure animations play even if something delays the initial trigger
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
        requestAnimationFrame(() => {
          setAnimationsStarted(true);
        });
      }
    }, 5000); // Failsafe: show after 5 seconds max
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
      }}
    >
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
                textShadow: '0 0 40px rgba(59,130,246,0.5)',
                lineHeight: 1.1,
              }}
            >
              DRANREB JAY
            </h1>
          </div>

          {/* Description */}
          <p
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

          {/* CTA buttons */}
          <div 
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
          }
          .hero-left {
            order: -1 !important;
            margin-bottom: 1rem;
            padding-left: 0 !important;
          }
          .hero-right {
            order: 2 !important;
            text-align: center;
          }
          .hero-right > div:first-child {
            justify-content: center;
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