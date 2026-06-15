'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState('intro'); // 'intro' | 'loading' | 'complete'
  const [progress, setProgress] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Phase 1: Name appears
    setTimeout(() => setNameVisible(true), 300);
    
    // Phase 2: Loading bar appears after name
    setTimeout(() => {
      setPhase('loading');
      setShowLoading(true);
    }, 1200);

    // Phase 3: Start progress
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setPhase('complete');
            // Fade out everything
            setTimeout(() => setIsLoading(false), 600);
            return 100;
          }
          const increment = prev < 50 ? 5 : prev < 80 ? 3 : 1.5;
          return Math.min(prev + increment, 100);
        });
      }, 40);
    }, 1500);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a1a',
        transition: 'opacity 0.6s ease-out',
        opacity: phase === 'complete' ? 0 : 1,
      }}
    >
      {/* Name with pop animation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: nameVisible ? 1 : 0,
          transform: nameVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <span
          style={{
            color: '#F472B6',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 300,
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            opacity: nameVisible ? 1 : 0,
            transform: nameVisible ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.5s ease-out 0.4s',
          }}
        >
          {'<'}
        </span>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-0.02em',
            opacity: nameVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.2s',
          }}
        >
          DRANREB JAY
        </h1>
        <span
          style={{
            color: '#F472B6',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 300,
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            opacity: nameVisible ? 1 : 0,
            transform: nameVisible ? 'translateX(0)' : 'translateX(20px)',
            transition: 'all 0.5s ease-out 0.4s',
          }}
        >
          {'/>'}
        </span>
      </div>

      {/* Loading section */}
      <div
        style={{
          marginTop: '48px',
          opacity: showLoading ? 1 : 0,
          transform: showLoading ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.5s ease-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Loading text */}
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            letterSpacing: '0.1em',
            margin: 0,
          }}
        >
          {phase === 'complete' ? 'READY' : 'LOADING'}
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: '280px',
            height: '3px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              borderRadius: '4px',
              transition: 'width 0.15s ease-out',
              boxShadow: '0 0 20px rgba(59,130,246,0.5)',
            }}
          />
        </div>

        {/* Progress percentage */}
        <span
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.75rem',
            fontFamily: "'SF Mono', 'Fira Code', monospace",
          }}
        >
          {progress}%
        </span>
      </div>

      {/* Floating dots at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          display: 'flex',
          gap: '8px',
          opacity: showLoading ? 1 : 0,
          transition: 'opacity 0.5s ease-out 0.3s',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: phase === 'complete' ? '#34D399' : '#3B82F6',
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
}