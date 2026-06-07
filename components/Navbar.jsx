'use client';

import { useEffect, useState, useRef } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function DJLogo() {
  return (
    <>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dj-logo"
        aria-label="DJ logo"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="hexClip">
            <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" />
          </clipPath>
        </defs>

        {/* Outer hex glow */}
        <polygon
          points="22,2 40,12 40,32 22,42 4,32 4,12"
          fill="none"
          stroke="url(#glowGrad)"
          strokeWidth="1"
          className="dj-hex-outer"
        />

        {/* Hex background */}
        <polygon
          points="22,2 40,12 40,32 22,42 4,32 4,12"
          fill="rgba(10,10,26,0.9)"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
        />

        {/* D letterform — two vertical strokes + arc */}
        <g filter="url(#glow)">
          {/* D stem */}
          <rect x="9" y="13" width="2.5" height="18" rx="1" fill="url(#logoGrad)" />
          {/* D arc body */}
          <path
            d="M11.5 13 Q23 13 23 22 Q23 31 11.5 31"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Divider slash */}
        <line
          x1="25"
          y1="11"
          x2="21"
          y2="33"
          stroke="#8B5CF6"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />

        {/* J letterform */}
        <g filter="url(#glow)">
          {/* J top bar */}
          <rect x="27" y="13" width="8" height="2.5" rx="1" fill="url(#logoGrad)" />
          {/* J stem */}
          <rect x="31.5" y="13" width="2.5" height="15" rx="1" fill="url(#logoGrad)" />
          {/* J curve */}
          <path
            d="M34 28 Q34 33 29 33 Q26 33 26 30"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Corner accent dots */}
        <circle cx="22" cy="2" r="1.5" fill="#3B82F6" className="dj-dot" />
        <circle cx="40" cy="22" r="1.5" fill="#8B5CF6" className="dj-dot dj-dot--2" />
        <circle cx="22" cy="42" r="1.5" fill="#3B82F6" className="dj-dot dj-dot--3" />
      </svg>

      <style>{`
        .dj-logo {
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .dj-logo:hover {
          transform: rotate(15deg) scale(1.08);
        }
        .dj-hex-outer {
          animation: hexPulse 3s ease-in-out infinite;
        }
        .dj-dot {
          animation: dotBlink 2.4s ease-in-out infinite;
        }
        .dj-dot--2 {
          animation-delay: 0.8s;
        }
        .dj-dot--3 {
          animation-delay: 1.6s;
        }
        @keyframes hexPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 0.3; r: 1.5px; }
          50% { opacity: 1; r: 2.2px; }
        }
      `}</style>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled past 50px
      setScrolled(currentScrollY > 50);
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
        setMobileMenuOpen(false); // Close mobile menu when hiding
      } else {
        setVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrolledStyle = {
    background: 'rgba(10, 10, 26, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          transition: 'all 0.3s ease',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          ...(scrolled ? scrolledStyle : { background: 'transparent' }),
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '72px',
          }}
        >
          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <DJLogo />
          </a>

          {/* Desktop nav links */}
          <div
            style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: 15,
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="show-mobile"
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 2,
                  background: '#fff',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  transform:
                    mobileMenuOpen && i === 0
                      ? 'translateY(7px) rotate(45deg)'
                      : mobileMenuOpen && i === 2
                      ? 'translateY(-7px) rotate(-45deg)'
                      : mobileMenuOpen && i === 1
                      ? 'opacity 0'
                      : 'none',
                  opacity: mobileMenuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              background: 'rgba(10, 10, 26, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '16px 24px',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: 15,
                  borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive helper styles */}
      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}