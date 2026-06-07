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

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
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
  { Icon: LinkedInIcon, label: 'LinkedIn', value: 'dranreb-jay-arzadon-593189414', href: 'https://linkedin.com/in/dranreb-jay-arzadon-593189414' },
  { Icon: FacebookIcon, label: 'Facebook', value: 'dranrebjay.arzadon', href: 'https://facebook.com/dranrebjay.arzadon' },
  { Icon: InstagramIcon, label: 'Instagram', value: '@drnrbj', href: 'https://instagram.com/drnrbj' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input field with focus-glow
function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 500, marginBottom: 8 }}>
        {label}
      </label>
      {children}
      {error && <div style={{ color: '#f87171', fontSize: '0.75rem', marginTop: 4 }}>{error}</div>}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

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
    const e = { name: '', email: '', subject: '', message: '' };
    let ok = true;
    if (!formData.name.trim() || formData.name.trim().length < 2) { e.name = 'Name must be at least 2 characters.'; ok = false; }
    if (!formData.email.trim() || !EMAIL_RE.test(formData.email)) { e.email = 'Please enter a valid email address.'; ok = false; }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) { e.subject = 'Subject must be at least 3 characters.'; ok = false; }
    if (!formData.message.trim() || formData.message.trim().length < 10) { e.message = 'Message must be at least 10 characters.'; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus(null);
      }, 3000);
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
          <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 9999 }}>
            <span style={{ color: '#3B82F6', fontSize: 14, fontWeight: 500 }}>Get In Touch</span>
          </div>
          <h2 className="glow-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: 16, lineHeight: 1.2 }}>
            Contact Me
          </h2>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', margin: '16px auto 0', borderRadius: 2 }} />
        </div>

        {/* Two-column grid */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gap: '4rem', alignItems: 'start' }} className="contact-grid">

          {/* LEFT — Info */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>Let's Connect</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Whether you have a project in mind, an opportunity to share, or just want to say hello — my inbox is always open.
            </p>

            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
              {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
                <ContactItem key={label} Icon={Icon} label={label} value={value} href={href} />
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="glass"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 9999, marginTop: 32 }}
            >
              <div style={{ position: 'relative', width: 10, height: 10 }}>
                <div style={{ position: 'absolute', inset: 0, background: '#4ade80', borderRadius: '50%', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.75 }} />
                <div style={{ position: 'relative', width: 10, height: 10, background: '#4ade80', borderRadius: '50%' }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                Available for OJT &amp; Internship Opportunities
              </span>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="glass" style={{ padding: 32, borderRadius: 24 }}>
            <Field label="Your Name" error={errors.name}>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={set('name')}
                onFocus={focusStyle}
                onBlur={blurStyle}
                style={inputStyle}
              />
            </Field>
            <Field label="Your Email" error={errors.email}>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={set('email')}
                onFocus={focusStyle}
                onBlur={blurStyle}
                style={inputStyle}
              />
            </Field>
            <Field label="Subject" error={errors.subject}>
              <input
                type="text"
                placeholder="What's on your mind?"
                value={formData.subject}
                onChange={set('subject')}
                onFocus={focusStyle}
                onBlur={blurStyle}
                style={inputStyle}
              />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                rows={5}
                placeholder="Tell me more..."
                value={formData.message}
                onChange={set('message')}
                onFocus={focusStyle}
                onBlur={blurStyle}
                style={{ ...inputStyle, resize: 'none' }}
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
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: isSubmitting ? 'wait' : 'none',
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
        padding: '16px 24px',
        borderRadius: 12,
        textDecoration: 'none',
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.3s',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3B82F6',
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500, marginTop: 2 }}>{value}</div>
      </div>
    </a>
  );
}