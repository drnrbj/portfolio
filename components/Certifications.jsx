'use client';

import { useEffect, useRef, useState } from 'react';

const CERTS = [
  {
    id: 1,
    title: 'MTA: Database Fundamentals',
    issuer: 'Microsoft | Certiport',
    date: '2024',
    badge: '🗄️',
    color: '#3B82F6',
    tags: ['SQL', 'Relational Databases', 'Database Design', 'Data Manipulation'],
    image: '/images/database.png',
  },
  {
    id: 2,
    title: 'MTA: Networking Fundamentals',
    issuer: 'Microsoft | Certiport',
    date: '2024',
    badge: '🌐',
    color: '#8B5CF6',
    tags: ['TCP/IP', 'Network Security', 'Protocols', 'Infrastructure'],
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
          maxWidth: '72rem', width: '100%', borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 0 80px rgba(59,130,246,0.1)',
        }}
      >
        <img src={image} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
}

function CertCard({ cert }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setLightboxOpen(true)}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          cursor: 'pointer',
        }}
      >
        <div style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${hovered ? cert.color + '55' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 16,
          overflow: 'hidden',
          transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? `0 16px 48px ${cert.color}22` : '0 4px 24px rgba(0,0,0,0.3)',
        }}>

          {/* Certificate image */}
          <div style={{
            aspectRatio: '16/10',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${cert.color}12, ${cert.color}22)`,
          }}>
            <img
              src={cert.image}
              alt={cert.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'filter 0.3s, transform 0.3s',
                filter: hovered ? 'brightness(1.05)' : 'brightness(0.9)',
                transform: hovered ? 'scale(1.02)' : 'scale(1)',
              }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {/* Bottom accent bar */}
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${cert.color}, #8B5CF6)`,
          }} />

          {/* Card info */}
          <div style={{ padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Badge */}
            <div style={{
              width: 42, height: 42, borderRadius: 10, flexShrink: 0,
              background: `${cert.color}18`, border: `1px solid ${cert.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>
              {cert.badge}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontWeight: 700, fontSize: '0.92rem', color: '#fff',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {cert.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                {cert.issuer} · Issued {cert.date}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{
            padding: '0 1.25rem 1.1rem',
            display: 'flex', flexWrap: 'wrap', gap: 6,
          }}>
            {cert.tags.map((tag) => (
              <span key={tag} style={{
                padding: '3px 10px', fontSize: '0.7rem', fontWeight: 600,
                borderRadius: 5,
                background: `${cert.color}12`, border: `1px solid ${cert.color}30`,
                color: cert.color,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* View hint on hover */}
          {hovered && (
            <div style={{
              position: 'absolute', top: 10, right: 10,
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6, padding: '3px 9px',
              fontSize: '0.68rem', fontWeight: 600, color: '#fff',
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              View
            </div>
          )}
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
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" style={{ padding: '120px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center', marginBottom: '64px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9999,
            padding: '8px 16px', marginBottom: 16,
          }}>
            <span style={{ color: '#3B82F6', fontSize: 14, fontWeight: 500 }}>Credentials</span>
          </div>
          <h2 className="glow-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            Certifications
          </h2>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', margin: '16px auto 0', borderRadius: 2 }} />
        </div>

        {/* Two cards side by side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '52rem',
          margin: '0 auto',
        }}>
          {CERTS.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}