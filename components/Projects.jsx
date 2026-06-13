'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'Hotel Employee Management System',
    description:
      'A comprehensive HR and workforce management platform built to streamline hotel operations — covering employee scheduling, attendance tracking, payroll processing, and performance evaluations across departments.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'React', 'TypeScript'],
    image: { src: '/images/employee.jpg', alt: 'Hotel Employee Management System dashboard' },
  },
  {
    id: 2,
    title: 'Network Intrusion Detection System',
    description:
      'A machine learning-powered system that analyzes network traffic patterns to identify and classify potential security threats in real-time, providing actionable alerts and detailed threat reports.',
    tags: ['Python', 'Machine Learning', 'Jupyter Notebook', 'Scikit-learn'],
    image: { src: '/images/networkintrusion.png', alt: 'Network Intrusion Detection System interface' },
  },
  {
    id: 3,
    title: 'Dental Clinic CRMS',
    description:
      'A web-based clinic management system built for dental practices — streamlining patient registration, appointment scheduling, treatment recording, and billing with role-based access for admin, receptionist, and dentist users.',
    tags: ['Laravel', 'React', 'Inertia.js', 'TailwindCSS', 'SQLite'],
    image: { src: '/images/dentalcrms.png', alt: 'Dental Clinic patient dashboard' },
  },
  {
    id: 4,
    title: 'Salon Booking System',
    description:
      'A lightweight appointment booking system for salons — allowing customers to browse services, select stylists, and book time slots with an intuitive interface designed for ease of use on any device.',
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    image: { src: '/images/salon.png', alt: 'Salon Booking System homepage' },
  },
];

// Theme colors
const THEME = {
  blue: '#3B82F6',
  purple: '#8B5CF6',
  gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
};

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: 22,
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 10,
        }}
        onMouseEnter={(e) => { 
          e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; 
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
          e.currentTarget.style.color = '#3B82F6'; 
        }}
        onMouseLeave={(e) => { 
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; 
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; 
        }}
      >
        ×
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '72rem',
          width: '100%',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 0 80px rgba(59,130,246,0.1), 0 0 120px rgba(139,92,246,0.05)',
        }}
      >
        <img
          src={project.image.src}
          alt={project.image.alt}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))';
            e.currentTarget.parentElement.style.minHeight = '420px';
            e.currentTarget.parentElement.style.display = 'flex';
            e.currentTarget.parentElement.style.alignItems = 'center';
            e.currentTarget.parentElement.style.justifyContent = 'center';
          }}
        />
      </div>
    </div>
  );
}

/* ── Project Row ──────────────────────────────────────────────────────── */
function ProjectRow({ project, index }) {
  const rowRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  const isEven = index % 2 === 0; // even → image left; odd → image right

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback(() => {
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  /* Slide direction: even rows slide from left, odd from right */
  const slideFrom = isEven ? '-60px' : '60px';

  return (
    <>
      <div
        ref={rowRef}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : `translateX(${slideFrom})`,
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          transitionDelay: '0.05s',
        }}
      >
        <div
          className="project-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            direction: isEven ? 'ltr' : 'rtl', // flip column order for odd rows
          }}
        >
          {/* Image side */}
          <div
            style={{ direction: 'ltr' }}
            onClick={openLightbox}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'zoom-in',
                border: `1px solid ${imgHovered ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: imgHovered
                  ? '0 20px 60px rgba(59,130,246,0.15), 0 0 30px rgba(139,92,246,0.1)'
                  : '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'all 0.35s ease',
                transform: imgHovered ? 'scale(1.015)' : 'scale(1)',
                aspectRatio: '16/10',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
              }}
            >
              <img
                src={project.image.src}
                alt={project.image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'filter 0.35s ease',
                  filter: imgHovered ? 'brightness(1.05)' : 'brightness(0.95)',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              {/* Zoom hint overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, transparent 60%, rgba(59,130,246,0.1), rgba(139,92,246,0.15))',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  padding: '14px 16px',
                  opacity: imgHovered ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(6px)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: '1px solid rgba(59,130,246,0.3)',
                  }}
                >
                  View image
                </span>
              </div>

              {/* Blue-purple accent bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                }}
              />
            </div>
          </div>

          {/* Content side */}
          <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Accent line + index */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: 32,
                  height: 2,
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                  borderRadius: 2,
                  boxShadow: '0 0 8px rgba(59,130,246,0.5)',
                }}
              />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Project {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: 'clamp(1.3rem, 2vw, 1.75rem)',
                fontWeight: 800,
                color: '#fff',
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              style={{
                color: 'rgba(255,255,255,0.58)',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {project.description}
            </p>
            
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '5px 13px',
                    fontSize: '0.73rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    borderRadius: 6,
                    background: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    color: '#60A5FA',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(59,130,246,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)';
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && <Lightbox project={project} onClose={closeLightbox} />}
    </>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Projects() {
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
    <section id="projects" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '0%', width: '45%', height: '55%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '0%', width: '45%', height: '55%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <h2
            className="glow-text"
            style={{ fontSize: '80px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}
          >
            Featured Projects
          </h2>
          <div
            style={{
              width: 120,
              height: 2,
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              margin: '16px auto 0',
              borderRadius: 2,
            }}
          />
        </div>

        {/* Project rows */}
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '6rem',
          }}
        >
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}