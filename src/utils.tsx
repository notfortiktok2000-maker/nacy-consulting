import { useEffect, useRef, useState, ReactNode } from 'react';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode, delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-[600ms] ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
}

export function Counter({ target, duration = 1500 }: { target: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    let hasRun = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        let startTime: number | null = null;
        let raf: number;
        
        const update = (time: number) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(Math.floor(ease * target));
          if (progress < 1) {
            raf = requestAnimationFrame(update);
          }
        };
        raf = requestAnimationFrame(update);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function MouseGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
      }}
    />
  );
}

export const WHATSAPP_BASE = "https://wa.me/212710900502";
export const getWhatsappLink = (message: string) => `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
