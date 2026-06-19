'use client';

import { useEffect, useRef, useState } from 'react';

const CERTS = [
  {
    id: 1,
    title: 'IT Specialist - Databases',
    issuer: 'Certiport / Pearson VUE',
    issued: 'Issued May 2025',
    color: '#3B82F6',
    image: '/images/database.png',
    link: 'https://www.credly.com/your-database-link',
  },
  {
    id: 2,
    title: 'IT Specialist - Networking',
    issuer: 'Certiport / Pearson VUE',
    issued: 'Issued Mar 2026',
    color: '#8B5CF6',
    image: '/images/network.png',
    link: 'https://www.credly.com/your-network-link',
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
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: hovered
              ? `${cert.color}0D`
              : 'rgba(255,255,255,0.03)',
            border: `1px solid ${hovered ? cert.color + '66' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: hovered
              ? `0 20px 60px ${cert.color}28, 0 0 0 1px ${cert.color}33`
              : '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'all 0.35s ease',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image - clickable to enlarge */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/11',
              overflow: 'hidden',
              cursor: 'zoom-in',
              background: `linear-gradient(135deg, ${cert.color}12, ${cert.color}22)`,
              flexShrink: 0,
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
                transition: 'transform 0.35s ease, filter 0.35s ease',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                filter: hovered ? 'brightness(1.05)' : 'brightness(0.95)',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
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

          {/* Card body - clicking goes to Credly */}
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flex: 1,
            }}
          >
            {/* Title */}
            <h3
              style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: 700,
                color: hovered ? '#93C5FD' : '#fff',
                lineHeight: 1.35,
                letterSpacing: '-0.01em',
                transition: 'color 0.3s ease',
              }}
            >
              {cert.title}
            </h3>

            {/* Issuer - gradient text */}
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.01em',
              }}
            >
              {cert.issuer}
            </div>

            {/* Issued date */}
            <div
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {cert.issued}
            </div>
          </a>
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
          <h2 className="glow-text" style={{ fontSize: 'clamp(3rem, 6vw, 80px)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
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