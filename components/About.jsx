'use client';

import { useEffect, useRef, useState } from 'react';

const SKILL_CATEGORIES = [
  {
    name: 'Frontend',
    color: '#3B82F6',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    color: '#8B5CF6',
    skills: ['PHP', 'Laravel', 'Java', 'Python', 'MySQL'],
  },
  {
    name: 'Tools',
    color: '#10B981',
    skills: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Figma', 'Jupyter Notebook'],
  },
];

const SOFT_SKILLS = [
  { label: 'Problem Solving', icon: '◈', color: '#3B82F6' },
  { label: 'Collaboration', icon: '◈', color: '#8B5CF6' },
  { label: 'Adaptability', icon: '◈', color: '#10B981' },
  { label: 'Attention to Detail', icon: '◈', color: '#F59E0B' },
  { label: 'Communication', icon: '◈', color: '#EC4899' },
  { label: 'Self-Motivated', icon: '◈', color: '#06B6D4' },
];

const EDUCATION = [
  {
    level: 'College',
    school: 'University of Mindanao',
    detail: 'Bachelor of Science in Computer Science',
    color: '#3B82F6',
  },
  {
    level: 'Senior High School',
    school: 'Batangas Eastern Colleges',
    detail: 'STEM Strand',
    color: '#8B5CF6',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Subtle background radial */}
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
          <h2
            className="glow-text"
            style={{ fontSize: 'clamp(3rem, 6vw, 80px)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}
          >
            About Me
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

        {/* Two column layout */}
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'grid',
            gap: '2rem',
            alignItems: 'stretch',
          }}
          className="about-grid"
        >
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Biography card */}
            <div
              className="glass"
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.8, margin: 0 }}>
                I'm{' '}
                <span style={{ color: '#fff', fontWeight: 700 }}>Dranreb Jay Arzadon</span>
                , a Computer Science student at{' '}
                <span
                  style={{
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  University of Mindanao
                </span>{' '}
                with a passion for turning complex problems into elegant software solutions.
                My journey in tech started with curiosity and has grown into a deep commitment
                to crafting high-quality digital experiences.
              </p>

              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.8, margin: 0 }}>
                I specialize in full-stack web development, working across modern JavaScript
                frameworks, PHP-based backend systems, and database design. I also have
                hands-on experience with machine learning concepts, which I've applied in
                academic projects. I'm driven by collaboration, clean design, and the belief that
                the best software solves real human problems. I am always looking for my next
                challenge.
              </p>
            </div>

            {/* Education card */}
            <div
              className="glass"
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                flex: 1,
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 20px 0',
                  letterSpacing: '0.03em',
                }}
              >
                Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {EDUCATION.map((edu, i) => (
                  <div key={edu.level} style={{ display: 'flex', gap: '16px' }}>
                    {/* Timeline dot + line */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 20,
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: edu.color,
                          boxShadow: `0 0 8px ${edu.color}`,
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      {i < EDUCATION.length - 1 && (
                        <div
                          style={{
                            width: 2,
                            flex: 1,
                            minHeight: 32,
                            background: `linear-gradient(180deg, ${edu.color}60, transparent)`,
                            marginTop: 4,
                          }}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ paddingBottom: i < EDUCATION.length - 1 ? '20px' : 0 }}>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.4)',
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          marginBottom: 4,
                        }}
                      >
                        {edu.level}
                      </div>
                      <div
                        style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}
                      >
                        {edu.school}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                        {edu.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Two stacked cards matching left column height */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Technical Skills card */}
            <div
              className="glass"
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 20px 0',
                  letterSpacing: '0.03em',
                }}
              >
                Technical Skills
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SKILL_CATEGORIES.map((category) => (
                  <div
                    key={category.name}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      background: `${category.color}09`,
                      border: `1px solid ${category.color}22`,
                      borderLeft: `3px solid ${category.color}`,
                    }}
                  >
                    {/* Category header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {category.name}
                      </span>
                    </div>

                    {/* Skill chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {category.skills.map((skill) => (
                        <SkillChip key={skill} skill={skill} color={category.color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills + Quote card */}
            <div
              className="glass"
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                  letterSpacing: '0.03em',
                }}
              >
                Soft Skills
              </h3>

              {/* Soft skill chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SOFT_SKILLS.map((s) => (
                  <SoftSkillChip key={s.label} label={s.label} color={s.color} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function SkillChip({ skill, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        fontSize: '0.72rem',
        borderRadius: '5px',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
        background: hovered ? `${color}1e` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? `${color}55` : 'rgba(255,255,255,0.07)'}`,
        fontWeight: 600,
        letterSpacing: '0.03em',
        transition: 'all 0.15s ease',
        cursor: 'default',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? `0 4px 10px ${color}28` : 'none',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: '1px',
          background: hovered ? color : `${color}80`,
          flexShrink: 0,
          transition: 'background 0.15s ease',
        }}
      />
      {skill}
    </span>
  );
}

function SoftSkillChip({ label, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '6px 12px',
        fontSize: '0.78rem',
        borderRadius: '20px',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
        background: hovered ? `${color}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? `${color}50` : 'rgba(255,255,255,0.08)'}`,
        fontWeight: 600,
        letterSpacing: '0.02em',
        transition: 'all 0.15s ease',
        cursor: 'default',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? `0 4px 12px ${color}22` : 'none',
        userSelect: 'none',
      }}
    >
      {/* Pill dot */}
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: hovered ? color : `${color}70`,
          flexShrink: 0,
          transition: 'background 0.15s ease',
          boxShadow: hovered ? `0 0 6px ${color}` : 'none',
        }}
      />
      {label}
    </span>
  );
}