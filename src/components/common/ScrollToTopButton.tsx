import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      setIsVisible(currentScroll > 280);

      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, (currentScroll / totalHeight) * 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Ooper jayein (Scroll to top)"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-slate-900/90 text-cyan-400 hover:text-white border border-cyan-500/40 hover:border-cyan-400 shadow-lg shadow-cyan-950/40 backdrop-blur-md flex items-center justify-center group btn-animated cursor-pointer transition-all hover:scale-110 active:scale-95 animate-page-entrance"
    >
      {/* Circular Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
        <circle
          cx="20"
          cy="20"
          r="17"
          className="stroke-slate-800"
          strokeWidth="2"
          fill="transparent"
        />
        <circle
          cx="20"
          cy="20"
          r="17"
          className="stroke-cyan-400 transition-all duration-100"
          strokeWidth="2.5"
          strokeDasharray={107}
          strokeDashoffset={107 - (scrollProgress / 100) * 107}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      <ArrowUp className="w-5 h-5 text-cyan-400 group-hover:-translate-y-1 transition-transform relative z-10" />
    </button>
  );
};
