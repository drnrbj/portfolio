'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'Hotel Employee Management System',
    description: 'A comprehensive HR and workforce management platform built to streamline hotel operations — covering employee scheduling, attendance tracking, payroll processing, and performance evaluations across departments.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'React', 'TypeScript'],
    color: '#3B82F6',
    icon: '🏛️',
    github: '#',
    images: [
      { src: '/images/projects/hotel-1.jpg', alt: 'Dashboard overview' },
      { src: '/images/projects/hotel-2.jpg', alt: 'Employee scheduling' },
      { src: '/images/projects/hotel-3.jpg', alt: 'Payroll module' },
    ],
  },
  {
    id: 2,
    title: 'Network Intrusion Detection System',
    description: 'A machine learning-powered system that analyzes network traffic patterns to identify and classify potential security threats in real-time.',
    tags: ['Python', 'Machine Learning', 'Jupyter Notebook', 'Scikit-learn'],
    color: '#8B5CF6',
    icon: '🔐',
    github: '#',
    images: [
      { src: '/images/projects/nids-1.jpg', alt: 'Detection dashboard' },
      { src: '/images/projects/nids-2.jpg', alt: 'Threat analysis' },
      { src: '/images/projects/nids-3.jpg', alt: 'Alert configuration' },
    ],
  },
  {
    id: 3,
    title: 'Dental Clinic CRMS',
    description: 'A web-based clinic management system built for dental practices — streamlining patient registration, appointment scheduling, treatment recording, and billing with role-based access for admin, receptionist, and dentist users.',
    tags: ['Laravel', 'React', 'Inertia.js', 'TailwindCSS', 'SQLite'],
    color: '#06B6D4',
    icon: '🦷',
    github: '#',
    images: [
      { src: '/images/projects/dental-1.jpg', alt: 'Patient dashboard' },
      { src: '/images/projects/dental-2.jpg', alt: 'Appointment scheduler' },
      { src: '/images/projects/dental-3.jpg', alt: 'Treatment records' },
      { src: '/images/projects/dental-4.jpg', alt: 'Billing module' },
    ],
  },
  {
    id: 4,
    title: 'Salon Booking System',
    description: 'A lightweight appointment booking system for salons — allowing customers to browse services, select stylists, and book time slots with an intuitive interface.',
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    color: '#10B981',
    icon: '💇',
    github: '#',
    images: [
      { src: '/images/projects/salon-1.jpg', alt: 'Booking homepage' },
      { src: '/images/projects/salon-2.jpg', alt: 'Service selection' },
      { src: '/images/projects/salon-3.jpg', alt: 'Appointment confirmation' },
    ],
  },
  {
    id: 5,
    title: 'Email Phishing Detection System',
    description: 'An AI-driven tool that uses natural language processing to analyze email content and headers, accurately identifying phishing attempts.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Flask'],
    color: '#F59E0B',
    icon: '🎣',
    github: '#',
    images: [
      { src: '/images/projects/phishing-1.jpg', alt: 'Detection interface' },
      { src: '/images/projects/phishing-2.jpg', alt: 'Email analysis results' },
      { src: '/images/projects/phishing-3.jpg', alt: 'Threat report' },
    ],
  },
];

const GitHubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// Colour swatch placeholder for missing images
function ImageSwatch({ alt, color, style = {} }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <span style={{ color: `${color}99`, fontSize: 11 }}>{alt}</span>
    </div>
  );
}

function ProjectCard({ project, onOpenLightbox }) {
  const [hovered, setHovered] = useState(false);
  const visibleThumbs = project.images.slice(0, 3);
  const extraCount = project.images.length - 3;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: '100%',
      }}
    >
      <div
        className="glass"
        style={{
          padding: '28px',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${hovered ? project.color + '80' : project.color + '26'}`,
          transition: 'border-color 0.3s',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Corner glow */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${project.color}26 0%, transparent 70%)`,
            filter: 'blur(20px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.5s',
            pointerEvents: 'none',
          }}
        />

        {/* Image thumbnail strip */}
        <div
          onClick={() => onOpenLightbox(project)}
          style={{
            width: '100%',
            height: 48,
            display: 'flex',
            gap: 4,
            marginBottom: 20,
            borderRadius: 8,
            overflow: 'hidden',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {visibleThumbs.map((img, i) => {
            const isLast = i === 2 && extraCount > 0;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 48,
                  position: 'relative',
                  overflow: 'hidden',
                  filter: hovered ? 'brightness(1.1)' : 'brightness(1)',
                  transition: 'filter 0.3s',
                }}
              >
                <ImageSwatch alt={img.alt} color={project.color} style={{ height: 48 }} />
                {isLast && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.6)',
                      fontSize: 10,
                      padding: '2px 6px',
                      borderTopLeftRadius: 4,
                      color: '#fff',
                    }}
                  >
                    +{extraCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Top row: icon + github */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: `${project.color}26`,
              border: `1px solid ${project.color}4d`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
            }}
          >
            {project.icon}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="glass"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)';
              e.currentTarget.style.color = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            <GitHubIcon />
          </a>
        </div>

        {/* Title */}
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          {project.title}
        </div>

        {/* Description — 3-line clamp */}
        <div
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.875rem',
            lineHeight: 1.7,
            marginBottom: 20,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {project.description}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 12px',
                fontSize: '0.75rem',
                borderRadius: 9999,
                background: `${project.color}1a`,
                border: `1px solid ${project.color}4d`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Lightbox({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx) => {
      setFading(true);
      setTimeout(() => {
        setCurrentIndex(idx);
        setFading(false);
      }, 150);
    },
    []
  );

  const prev = useCallback(
    () => goTo(currentIndex === 0 ? project.images.length - 1 : currentIndex - 1),
    [currentIndex, project.images.length, goTo]
  );

  const next = useCallback(
    () => goTo(currentIndex === project.images.length - 1 ? 0 : currentIndex + 1),
    [currentIndex, project.images.length, goTo]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  const hasMany = project.images.length > 1;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="glass"
        style={{
          position: 'absolute',
          top: 96,
          right: 32,
          width: 44,
          height: 44,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: 20,
          cursor: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.05)',
          transition: 'color 0.2s',
          zIndex: 10,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
      >
        ×
      </button>

      {/* Content — stops propagation so clicking image doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '56rem',
          width: '100%',
          padding: '0 1rem',
          position: 'relative',
        }}
      >
        {/* Prev arrow */}
        {hasMany && (
          <button
            onClick={prev}
            className="glass"
            style={{
              position: 'absolute',
              left: -8,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'none',
              transition: 'all 0.2s',
              zIndex: 10,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <ArrowLeft />
          </button>
        )}

        {/* Main image */}
        <div
          style={{
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.15s ease',
            width: '100%',
            minHeight: 300,
            maxHeight: '70vh',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <ImageSwatch
            alt={project.images[currentIndex].alt}
            color={project.color}
            style={{ width: '100%', height: '60vh', maxHeight: '70vh' }}
          />
        </div>

        {/* Next arrow */}
        {hasMany && (
          <button
            onClick={next}
            className="glass"
            style={{
              position: 'absolute',
              right: -8,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'none',
              transition: 'all 0.2s',
              zIndex: 10,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <ArrowRight />
          </button>
        )}

        {/* Counter */}
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: 16 }}>
          Image {currentIndex + 1} of {project.images.length}
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
          {project.images.map((img, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: 64,
                height: 48,
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'none',
                border: `2px solid ${i === currentIndex ? project.color : 'transparent'}`,
                opacity: i === currentIndex ? 1 : 0.5,
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              <ImageSwatch alt={img.alt} color={project.color} style={{ height: 48 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  const firstRow = PROJECTS.slice(0, 3);
  const secondRow = PROJECTS.slice(3);

  return (
    <section id="projects" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '30%', right: '5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />
      </div>

      <div
        ref={sectionRef}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 9999 }}>
            <span style={{ color: '#3B82F6', fontSize: 14, fontWeight: 500 }}>My Work</span>
          </div>
          <h2 className="glow-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: 16, lineHeight: 1.2 }}>
            Featured Projects
          </h2>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', margin: '16px auto 0', borderRadius: 2 }} />
        </div>

        {/* First row — 3 cards */}
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="projects-grid-3">
            {firstRow.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenLightbox={openLightbox} />
            ))}
          </div>

          {/* Second row — 2 cards centered */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {secondRow.map((project) => (
              <div key={project.id} style={{ maxWidth: '24rem', width: '100%' }}>
                <ProjectCard project={project} onOpenLightbox={openLightbox} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedProject && <Lightbox project={selectedProject} onClose={closeLightbox} />}

      <style>{`
        .projects-grid-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .projects-grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .projects-grid-3 { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}