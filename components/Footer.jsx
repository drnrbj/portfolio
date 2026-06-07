'use client';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0A0A1A',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
          © 2026 <span style={{ color: 'rgba(255,255,255,0.8)' }}>Dranreb Jay Arzadon</span>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}