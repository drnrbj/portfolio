'use client';

import { useState, useEffect } from 'react';

const UpArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: isHovered 
              ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' 
              : 'rgba(59, 130, 246, 0.2)',
            border: isHovered 
              ? 'none' 
              : '1px solid rgba(59, 130, 246, 0.4)',
            color: isHovered ? '#fff' : '#3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 50,
            boxShadow: isHovered 
              ? '0 0 20px rgba(59, 130, 246, 0.5)' 
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <UpArrowIcon />
        </button>
      )}
    </>
  );
}