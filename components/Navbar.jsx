'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
        setMobileMenuOpen(false);
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
            <Image
              src="/images/logo.png"
              alt="DJ Logo"
              width={44}
              height={44}
              className="logo-img"
              priority
            />
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

      <style>{`
        .logo-img {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .logo-img:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.6));
        }
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