'use client';

import { useEffect, useRef, useState } from 'react';

const CERTS = [
  {
    id: 1,
    title: 'MTA: Database Fundamentals',
    color: '#3B82F6',
    image: '/images/database.png',
  },
  {
    id: 2,
    title: 'MTA: Networking Fundamentals',
    color: '#8B5CF6',
    image: '/images/network.png',
  },
];

function Lightbox({ image, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 24, right: 32,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%', width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)', fontSize: 22, cursor: 'pointer', zIndex: 10,
        }}
      >×</button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 0 80px rgba(59,130,246,0.1)',
        }}
      >
        <img
          src={image}
          alt={alt}
          style={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            width: 'auto',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
}

function CertCard({ cert, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const slideFrom = index % 2 === 0 ? '-40px' : '40px';

  return (
    <>
      <div
        ref={cardRef}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : `translateX(${slideFrom})`,
          transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
        }}
      >
        <div
          onClick={() => setLightboxOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            cursor: 'pointer',
            border: `1px solid ${hovered ? cert.color + '66' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: hovered
              ? `0 20px 60px ${cert.color}28, 0 0 0 1px ${cert.color}33`
              : '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'all 0.35s ease',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            aspectRatio: '16/11',
            background: `linear-gradient(135deg, ${cert.color}12, ${cert.color}22)`,
          }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'filter 0.35s ease',
              filter: hovered ? 'brightness(1.05)' : 'brightness(0.95)',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Bottom gradient overlay with title */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.95))',
              padding: '16px 20px 12px',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.02em',
                textShadow: '0 2px 2px rgba(0,0,0,0.8)',
              }}
            >
              {cert.title}
            </div>
          </div>

          {/* Accent bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${cert.color}, #8B5CF6)`,
            }}
          />

          {/* View hint on hover */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'none',
            }}
          >
            View
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox image={cert.image} alt={cert.title} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}

export default function Certifications() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" style={{ padding: 'clamp(60px, 10vw, 120px) 0', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 64px)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <h2 className="glow-text" style={{ fontSize: 'clamp(2rem, 8vw, 80px)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            Certifications
          </h2>
          <div style={{ width: 'clamp(80px, 15vw, 120px)', height: 2, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', margin: '16px auto 0', borderRadius: 2 }} />
        </div>

        {/* Two cards side by side */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)',
            maxWidth: '68rem',
            margin: '0 auto',
          }}
        >
          {CERTS.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}