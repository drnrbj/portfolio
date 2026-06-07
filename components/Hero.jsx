'use client';

import { useEffect, useState } from 'react';

const ROLES = ['Computer Science Student', 'Aspiring Software Developer', 'Web Developer'];

// SVG Icons
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const SOCIALS = [
  { label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { label: 'GitHub', href: '#', Icon: GitHubIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
];

// Orbital ring dot positions
const RING1_DOTS = [
  { top: '50%', left: '-4px', transform: 'translateY(-50%)' },
  { top: '-4px', left: '50%', transform: 'translateX(-50%)' },
  { top: '50%', right: '-4px', transform: 'translateY(-50%)' },
  { bottom: '-4px', left: '50%', transform: 'translateX(-50%)' },
];
const RING2_DOTS = [
  { top: '15%', left: '-4px' },
  { bottom: '15%', right: '-4px' },
  { top: '-4px', right: '15%' },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [displayText, isDeleting, currentRoleIndex]);

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
      {/* Background radial glows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 1,
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
        {/* ---- LEFT COLUMN ---- */}
        <div style={{ order: 1 }}>
          {/* Welcome pill */}
          <div
            className="glass"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '9999px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: '#06B6D4',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
              }}
            />
            <span style={{ color: '#06B6D4', fontSize: 14, fontWeight: 500 }}>
              Welcome to My Portfolio
            </span>
          </div>

          {/* Heading */}
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, fontSize: '1.5rem' }}>
              Hi, I'm
            </div>
            <h1
              className="glow-text"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                margin: '4px 0 0',
                textShadow: '0 0 40px rgba(59,130,246,0.5)',
                lineHeight: 1.1,
              }}
            >
              DRANREB JAY
            </h1>
          </div>

          {/* Typewriter role */}
          <div
            style={{
              height: 32,
              display: 'flex',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <span style={{ color: '#3B82F6', fontSize: '1.2rem', fontWeight: 500 }}>
              {displayText}
            </span>
            <span
              style={{
                color: '#3B82F6',
                fontSize: '1.2rem',
                fontWeight: 300,
                marginLeft: 2,
                animation: 'blink 0.75s step-end infinite',
              }}
            >
              |
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1rem',
              lineHeight: 1.8,
              maxWidth: '32rem',
              marginTop: '24px',
            }}
          >
            A passionate Computer Science student dedicated to building robust web
            applications, software systems, and machine learning solutions. I focus on
            creating meaningful digital experiences, guided by continuous learning and a
            deep curiosity for modern technologies.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '32px' }}>
            <button
              className="btn-primary"
              onClick={() => scrollTo('projects')}
              style={{ cursor: 'none' }}
            >
              View Projects
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollTo('contact')}
              style={{ cursor: 'none' }}
            >
              Contact Me
            </button>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '32px' }}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.color = '#3B82F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ---- RIGHT COLUMN ---- */}
        <div
          style={{
            order: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className="animate-float"
            style={{ position: 'relative', width: 360, height: 360, margin: '0 auto' }}
          >
            {/* Glow backdrop */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                boxShadow:
                  '0 0 60px rgba(59,130,246,0.2), 0 0 120px rgba(139,92,246,0.1)',
                pointerEvents: 'none',
              }}
            />

            {/* Ring 1 — outer slow spin */}
            <div
              className="animate-spin-slow"
              style={{
                position: 'absolute',
                inset: -40,
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '50%',
              }}
            >
              {RING1_DOTS.map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    background: 'rgba(59,130,246,0.6)',
                    borderRadius: '50%',
                    ...pos,
                  }}
                />
              ))}
            </div>

            {/* Ring 2 — middle dashed reverse spin */}
            <div
              className="animate-spin-reverse"
              style={{
                position: 'absolute',
                inset: -20,
                border: '1px dashed rgba(139,92,246,0.2)',
                borderRadius: '50%',
              }}
            >
              {RING2_DOTS.map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 6,
                    height: 6,
                    background: 'rgba(139,92,246,0.5)',
                    borderRadius: '50%',
                    ...pos,
                  }}
                />
              ))}
            </div>

            {/* Ring 3 — conic gradient spinning border */}
            <div
              className="animate-spin-slow"
              style={{
                position: 'absolute',
                inset: -5,
                borderRadius: '50%',
                background:
                  'conic-gradient(from 0deg, transparent, #3B82F6, transparent, #8B5CF6, transparent)',
              }}
            />

            {/* Profile image circle */}
            {/* Replace with actual photo: add <img src="/photo.jpg" ... /> inside */}
            <div
              style={{
                position: 'absolute',
                inset: 4,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1a1a3e, #0d0d2b)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Placeholder silhouette */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="rgba(255,255,255,0.2)"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 8 }}>
                Profile Photo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: stack columns on mobile */}
      <style>{`
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}