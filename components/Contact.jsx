'use client';

import { useEffect, useRef, useState } from 'react';

// ---- SVG Icons ----
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ animation: 'spin 1s linear infinite' }}>
    <circle cx="12" cy="12" r="10" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

const CONTACT_ITEMS = [
  { Icon: EmailIcon, label: 'Email', value: 'jayarzadon213@gmail.com', href: 'mailto:jayarzadon213@gmail.com' },
  { Icon: LinkedInIcon, label: 'LinkedIn', value: 'Dranreb Jay Arzadon', href: 'https://linkedin.com/in/dranreb-jay-arzadon-593189414' },
  { Icon: FacebookIcon, label: 'Facebook', value: 'Dranreb Jay Arzadon', href: 'https://facebook.com/dranrebjay.arzadon' },
  { Icon: GitHubIcon, label: 'GitHub', value: 'drnrbj', href: 'https://github.com/drnrbj' },
];

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 500, marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#fff',
    fontSize: '0.875rem',
    border: '1px solid rgba(255,255,255,0.1)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const set = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));

  const focusStyle = (e) => {
    e.target.style.borderColor = '#3B82F6';
    e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
  };

  const blurStyle = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.boxShadow = 'none';
  };

  const validateForm = () => {
    if (!formRef.current) return false;
    return formRef.current.checkValidity();
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'bee2b1ef-3e10-4f01-a5dc-e4df7d7e68c6',
          from_name: formData.name,
          replyto: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '120px 0', position: 'relative' }}>
      <div
        ref={sectionRef}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="glow-text" style={{
            fontSize: 'clamp(3rem, 6vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.2
          }}>
            Get In Touch
          </h2>
          <div style={{ width: 120, height: 2, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', margin: '16px auto 0', borderRadius: 2 }} />
        </div>

        {/* Two-column grid */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gap: '2rem', alignItems: 'start' }} className="contact-grid">

          {/* LEFT — Contact Info + Availability */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Contact Information */}
            <div style={{
              padding: 32,
              borderRadius: 24,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
                  <ContactItem key={label} Icon={Icon} label={label} value={value} href={href} />
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass" style={{ padding: 32, borderRadius: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 4.5 }}>
                  Let's Collaborate!
                </h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.875rem' }}>
                I'm currently open to OJT opportunities, internships, freelance projects, and collaborations. If you have something in mind, let's make it happen!
              </p>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="glass" style={{ padding: 32, borderRadius: 24 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
              Send Me a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <Field label="Your Name">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={set('name')}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={inputStyle}
                  required
                  minLength={2}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('');
                    if (!e.target.value) {
                      e.target.setCustomValidity('Please enter your name');
                    } else if (e.target.value.length < 2) {
                      e.target.setCustomValidity('Name must be at least 2 characters');
                    }
                  }}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </Field>

              <Field label="Your Email">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={set('email')}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={inputStyle}
                  required
                  onInvalid={(e) => {
                    e.target.setCustomValidity('');
                    if (!e.target.value) {
                      e.target.setCustomValidity('Please enter your email address');
                    } else {
                      e.target.setCustomValidity('Please enter a valid email (e.g., name@example.com)');
                    }
                  }}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </Field>

              <Field label="Subject">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={formData.subject}
                  onChange={set('subject')}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={inputStyle}
                  required
                  minLength={3}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('');
                    if (!e.target.value) {
                      e.target.setCustomValidity('Please enter a subject');
                    } else if (e.target.value.length < 3) {
                      e.target.setCustomValidity('Subject must be at least 3 characters');
                    }
                  }}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </Field>

              <Field label="Message">
                <textarea
                  rows={5}
                  placeholder="Tell me more..."
                  value={formData.message}
                  onChange={set('message')}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{ ...inputStyle, resize: 'none' }}
                  required
                  minLength={10}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('');
                    if (!e.target.value) {
                      e.target.setCustomValidity('Please enter your message');
                    } else if (e.target.value.length < 10) {
                      e.target.setCustomValidity(`Message needs ${10 - e.target.value.length} more characters (minimum 10)`);
                    }
                  }}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </Field>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div
                  className="glass"
                  style={{ border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.05)', padding: '12px 16px', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}
                >
                  <span style={{ color: '#4ade80', fontSize: 18 }}>✓</span>
                  <span style={{ color: '#86efac', fontSize: '0.875rem' }}>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  className="glass"
                  style={{ border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.05)', padding: '12px 16px', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}
                >
                  <span style={{ color: '#f87171', fontSize: 18 }}>!</span>
                  <span style={{ color: '#fca5a5', fontSize: '0.875rem' }}>Something went wrong. Please try again or email me directly.</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  opacity: isSubmitting ? 0.8 : 1,
                  marginTop: 8,
                  border: 'none',
                }}
              >
                {isSubmitting ? (
                  <>
                    <SpinnerIcon />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <SendIcon />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

function ContactItem({ Icon, label, value, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 20px',
        borderRadius: 12,
        textDecoration: 'none',
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.3s',
        background: hovered
          ? 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))'
          : 'rgba(255, 255, 255, 0.05)',
        boxShadow: hovered
          ? '0 0 20px rgba(59, 130, 246, 0.3)'
          : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: hovered
            ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
            : 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: hovered ? '#fff' : '#3B82F6',
          flexShrink: 0,
          transition: 'all 0.3s',
          boxShadow: hovered ? '0 0 15px rgba(59,130,246,0.5)' : 'none',
        }}
      >
        <Icon />
      </div>
      <div>
        <div style={{
          color: hovered ? '#60A5FA' : 'rgba(255,255,255,0.4)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'color 0.3s'
        }}>
          {label}
        </div>
        <div style={{
          color: '#fff',
          fontSize: '0.875rem',
          fontWeight: 500,
          marginTop: 2,
        }}>
          {value}
        </div>
      </div>
    </a>
  );
}