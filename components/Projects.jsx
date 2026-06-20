'use client';

import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'Hotel Employee Management System',
    description:
      'A comprehensive HR and workforce management platform designed to streamline hotel operations. It supports employee scheduling, attendance tracking, payroll processing, and performance evaluation across different departments.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'React', 'TypeScript'],
    image: { src: '/images/employee.jpg', alt: 'Hotel Employee Management System dashboard' },
    github: 'https://github.com/drnrbj/Hotel-Employee-Management-System',
  },
  {
    id: 2,
    title: 'Dental Clinic CRMS',
    description:
      'A web-based clinic management system for dental practices that simplifies patient registration, appointment scheduling, treatment records, and billing. It includes role-based access for administrators, receptionists, and dentists.',
    tags: ['Laravel', 'React', 'Inertia.js', 'TailwindCSS', 'SQLite'],
    image: { src: '/images/dentalcrms.png', alt: 'Dental Clinic patient dashboard' },
    github: 'https://github.com/drnrbj/Dental-Clinic-CRMS',
  },
  {
    id: 3,
    title: 'Network Intrusion Detection System',
    description:
      'A machine learning-based system that analyzes network traffic to detect and classify potential security threats. It generates alerts and provides detailed reports for monitoring and analysis.',
    tags: ['Python', 'Machine Learning', 'Jupyter Notebook', 'Scikit-learn'],
    image: { src: '/images/networkintrusion.png', alt: 'Network Intrusion Detection System interface' },
    github: 'https://github.com/drnrbj/A-Hybrid-Random-Forest-TabNet-Approach-for-Network-Intrusion-Detection',
  },
  {
    id: 4,
    title: 'Lung Cancer Detection System',
    description:
      'A machine learning-based diagnostic tool that analyzes patient health data to detect and classify lung cancer risk levels. Built with Python and Streamlit, it features an interactive web interface where users can input symptoms and risk factors to receive real-time predictions using a Random Forest model.',
    tags: ['Python', 'Jupyter Notebook', 'Scikit-learn'],
    image: { src: '/images/lungcancer.png', alt: 'Lung Cancer Detection System interface' },
    github: 'https://github.com/drnrbj/LungCancerDetection',
  },
  {
    id: 5,
    title: 'Salon Booking System',
    description:
      'A simple appointment booking system for salons that allows customers to browse services, select stylists, and schedule appointments through an easy-to-use and responsive interface.',
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    image: { src: '/images/salon.png', alt: 'Salon Booking System homepage' },
    github: 'https://github.com/airo-coder/salon',
  },
  {
    id: 6,
    title: 'Collaboration Room Booking System',
    description:
      'A web-based library room reservation system where students can browse available collaboration rooms, check real-time availability, and book time slots. Admins can manage room schedules, approve/reject booking requests, and monitor room utilization.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS'],
    image: { src: '/images/collab.png', alt: 'Library Collaboration Room Booking System interface' },
    github: 'https://github.com/airo-coder/Library-Collaboration-Room-Booking-System',
  },
];

/* ── Icons ───────────────────────────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Project Card ─────────────────────────────────────────────────────── */
function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
        { threshold: 0.1 }
      );
      if (cardRef.current) observer.observe(cardRef.current);
      return () => observer.disconnect();
    }, index * 80);
    return () => clearTimeout(timer);
  }, [index, mounted]);

  const SHORT_LIMIT = 115;
  const isTruncatable = project.description.length > SHORT_LIMIT;
  const shortDesc = isTruncatable
    ? project.description.slice(0, SHORT_LIMIT).trimEnd() + '…'
    : project.description;

  if (!mounted) {
    return <div className="project-card-skeleton" />;
  }

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease-out ${index * 0.08}s, transform 0.55s ease-out ${index * 0.08}s`,
      }}
    >
      <div
        onClick={() => onClick(project)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`project-card ${hovered ? 'project-card-hovered' : ''}`}
      >
        {/* Screenshot */}
        <div className="project-card-image">
          {!imgError ? (
            <img
              src={project.image.src}
              alt={project.image.alt}
              onError={() => setImgError(true)}
              className={`project-card-img ${hovered ? 'project-card-img-hovered' : ''}`}
            />
          ) : (
            <div className="project-card-img-fallback">
              {project.title}
            </div>
          )}
          <div className={`project-card-accent ${hovered ? 'project-card-accent-hovered' : ''}`} />
          {hovered && (
            <div className="project-card-overlay">
              <span>Click to view</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="project-card-body">
          <h3 className={`project-card-title ${hovered ? 'project-card-title-hovered' : ''}`}>
            {project.title}
          </h3>

          <div>
            <p className="project-card-desc">
              {expanded ? project.description : shortDesc}
            </p>
            {isTruncatable && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                className="project-card-readmore"
              >
                {expanded ? 'Show less' : 'Read more...'}
              </button>
            )}
          </div>

          <div className="project-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className={`project-tag ${hovered ? 'project-tag-hovered' : ''}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className={`project-card-divider ${hovered ? 'project-card-divider-hovered' : ''}`} />

          <div className="project-card-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`project-link ${hovered ? 'project-link-hovered' : ''}`}
              >
                <GitHubIcon />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Modal ────────────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!mounted) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Image - flush with top, rounded only at top corners */}
        <div className="modal-image-wrapper">
          <img
            src={project.image.src}
            alt={project.image.alt}
            className="modal-image"
          />
        </div>

        {/* Title + Close button on same row */}
        <div className="modal-header-row">
          <h2 className="modal-title">{project.title}</h2>
          <button onClick={onClose} className="modal-close-btn">
            <CloseIcon />
          </button>
        </div>

        {/* Rest of content */}
        <div className="modal-body">
          <p className="modal-desc">{project.description}</p>

          <div className="modal-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="modal-tag">{tag}</span>
            ))}
          </div>

          <div className="modal-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-github-btn"
              >
                <GitHubIcon />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Projects() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-glow-top" />
      <div className="projects-glow-bottom" />

      <div className="projects-container">
        <div
          ref={headerRef}
          className={`projects-header ${headerVisible ? 'projects-header-visible' : ''}`}
        >
          <h2 className="glow-text projects-heading">Featured Projects</h2>
          <div className="projects-underline" />
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}