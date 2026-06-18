'use client';

import { useEffect, useRef, useState } from 'react';

// ─── SKILL_CATEGORIES: fix icon slugs + unify to blue/purple palette ───
const SKILL_CATEGORIES = [
  {
    name: 'Frontend',
    color: '#3B82F6',           // blue-500 — unchanged
    skills: [
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css' },          // was 'css3' → fixed
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Tailwind', icon: 'tailwindcss' },
    ],
  },
  {
    name: 'Backend',
    color: '#8B5CF6',           // violet-500 — unchanged
    skills: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Java', icon: 'openjdk' },
      { name: 'Python', icon: 'python' },
      { name: 'MySQL', icon: 'mysql' },
    ],
  },
  {
    name: 'Tools',
    color: '#6366F1',           // was '#10B981' (green) → now indigo to stay blue/purple
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Jupyter', icon: 'jupyter' },
    ],
  },
];

const EDUCATION = [
  {
    level: 'College',
    school: 'University of Mindanao',
    detail: 'Bachelor of Science in Computer Science',
    period: '2023 - Present',
    focus: 'Machine Learning, Software Engineering, Cybersecurity',
    color: '#3B82F6',
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
            maxWidth: '1280px',
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
                who enjoys building software that solves practical problems.
                What began as curiosity about how technology works has grown into a
                commitment to developing reliable, user-focused applications and continuously
                improving my skills as a developer.
              </p>

              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.8, margin: 0 }}>
                My interests include{' '}
                <span style={{ color: 'rgb(255, 255, 255)', fontWeight: 700 }}>
                  full-stack web development, software engineering, and machine learning
                </span>
                , with experience gained through academic and personal projects.
                I enjoy turning ideas into functional solutions, refining them through testing
                and iteration, and writing code that is both efficient and maintainable.
                I value continuous learning, collaboration, and the challenge of creating
                technology that delivers meaningful impact.
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
                {EDUCATION.map((edu) => (
                  <div key={edu.level} style={{ display: 'flex', gap: '16px' }}>
                    {/* Content */}
                    <div style={{ paddingBottom: '8px' }}>
                      <div
                        style={{
                          fontSize: '0.80rem',
                          color: edu.color,
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          marginBottom: 8,
                        }}
                      >
                        {edu.period}
                      </div>
                      <div
                        style={{
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          marginBottom: 4,
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {edu.detail}
                      </div>
                      <div style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.95rem',
                        marginBottom: 12,
                      }}>
                        {edu.school}
                      </div>
                      <div
                        style={{
                          width: 40,
                          height: 1,
                          background: 'rgba(255,255,255,0.1)',
                          marginBottom: 12,
                        }}
                      />
                      <div style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.95rem',
                      }}>
                        <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Focus: </span>
                        {edu.focus}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Technical Skills card fills full height */}
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
                Technical Skills
              </h3>

              {/* Changed: Removed flex: 1 from parent, using grid for equal heights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '14px',
                flex: 1,
              }}>
                {SKILL_CATEGORIES.map((category) => (
                  <div
                    key={category.name}
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      background: `${category.color}09`,
                      border: `1px solid ${category.color}22`,
                      borderLeft: `3px solid ${category.color}`,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Category header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '12px',
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
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {category.skills.map((skill) => (
                        <SkillChip key={skill.name} skill={skill.name} icon={skill.icon} color={category.color} />
                      ))}
                    </div>
                  </div>
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

function SkillChip({ skill, icon, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 14px',
        minWidth: '76px',
        fontSize: '0.7rem',
        borderRadius: '10px',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
        background: hovered ? `${color}1e` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? `${color}55` : 'rgba(255,255,255,0.07)'}`,
        fontWeight: 600,
        letterSpacing: '0.02em',
        textAlign: 'center',
        transition: 'all 0.15s ease',
        cursor: 'default',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 4px 10px ${color}28` : 'none',
        userSelect: 'none',
      }}
    >
      <img
        src={`https://cdn.simpleicons.org/${icon}/${hovered ? color.replace('#', '') : 'ffffff'}`}
        alt=""
        width={28}
        height={28}
        style={{
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.15s ease',
          flexShrink: 0,
        }}
      />
      {skill}
    </span>
  );
}