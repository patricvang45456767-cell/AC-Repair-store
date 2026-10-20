import React, { useEffect, useRef, useState } from 'react';

export type ScrollAnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'flip-up';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.12,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            // Once revealed, unobserve to keep element visible
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [threshold]);

  let animationClass = 'reveal-on-scroll';
  if (animation === 'fade-down') animationClass = 'reveal-fade-down';
  if (animation === 'fade-left') animationClass = 'reveal-fade-left';
  if (animation === 'fade-right') animationClass = 'reveal-fade-right';
  if (animation === 'zoom') animationClass = 'reveal-zoom';
  if (animation === 'flip-up') animationClass = 'reveal-flip-up';

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${animationClass} ${isRevealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
