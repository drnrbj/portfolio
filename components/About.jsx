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
    skills: ['PHP', 'Laravel', 'Java', 'Python'],
  },
  {
    name: 'Database',
    color: '#06B6D4',
    skills: ['MySQL'],
  },
  {
    name: 'Tools',
    color: '#10B981',
    skills: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Figma', 'Jupyter Notebook'],
  },
];

const STATS = [
  { number: '5+', label: 'Projects' },
  { number: '2+', label: 'Years Learning' },
  { number: '10+', label: 'Technologies' },
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
            style={{
              fontSize: '80px',
              // fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              marginTop: '16px',
              lineHeight: 1.2,
            }}
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
            gap: '4rem',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* LEFT — Biography */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                `I'm Dranreb Jay Arzadon, a Computer Science student at the University of Mindanao with a passion for turning complex problems into elegant software solutions. My journey in tech started with curiosity and has grown into a deep commitment to crafting high-quality digital experiences.`,
                `I specialize in full-stack web development, working across modern JavaScript frameworks, PHP-based backend systems, and database design. I also have hands-on experience with machine learning concepts, which I've applied in academic projects including intrusion detection and phishing detection systems.`,
                `Beyond coding, I'm driven by collaboration, clean design, and the belief that the best software solves real human problems. I am always looking for my next challenge.`,
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '18px',
                    lineHeight: 1.8,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '32px',
                flexWrap: 'wrap',
              }}
            >
              {STATS.map(({ number, label }) => (
                <div key={label}>
                  <div
                    className="glow-text"
                    style={{ fontSize: '1.875rem', fontWeight: 900, lineHeight: 1 }}
                  >
                    {number}
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.875rem',
                      marginTop: '4px',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Tech Stack */}
          <div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '24px',
              }}
            >
              Tech Stack
            </h3>

            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.name}
                className="glass"
                style={{
                  padding: '20px',
                  marginBottom: '16px',
                  borderRadius: '12px',
                  borderLeft: `3px solid ${category.color}`,
                }}
              >
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      background: category.color,
                      borderRadius: '50%',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    {category.name}
                  </span>
                </div>

                {/* Skill pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '12px',
                  }}
                >
                  {category.skills.map((skill) => (
                    <SkillPill key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive grid breakpoint */}
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

function SkillPill({ skill }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="glass"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '4px 12px',
        fontSize: '0.75rem',
        borderRadius: '9999px',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.7)',
        borderColor: hovered ? 'rgba(59,130,246,0.5)' : undefined,
        transition: 'all 0.2s',
        cursor: 'default',
      }}
    >
      {skill}
    </span>
  );
}