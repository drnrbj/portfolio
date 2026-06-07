'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorEffect() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Detect touch/coarse pointer — return early, no custom cursor on mobile
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      isTouchRef.current = true;
      return;
    }

    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [data-hover]');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (isTouchRef.current) return null;

  const baseStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    left: cursorPos.x,
    top: cursorPos.y,
  };

  return (
    <>
      {/* Outer ring */}
      <div
        style={{
          ...baseStyle,
          width: 40,
          height: 40,
          border: '1px solid rgba(59, 130, 246, 0.4)',
          transition: 'left 0.1s ease, top 0.1s ease, transform 0.2s ease, opacity 0.2s ease',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          ...baseStyle,
          width: 8,
          height: 8,
          background: 'radial-gradient(circle, #06B6D4, #3B82F6)',
          transition: 'left 0.05s ease, top 0.05s ease, transform 0.2s ease',
          transform: `translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}