export function initGsapEffects() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const { gsap, ScrollTrigger, SplitText, ScrollSmoother } = window as any;

  // Ensure plugins are registered
  if (ScrollTrigger && SplitText && ScrollSmoother) {
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
  } else if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Effect 1: Smooth Scroll (only on desktop and if plugin is defined)
  const isMobile = window.innerWidth < 768;
  let smoother = null;
  if (!isMobile && ScrollSmoother) {
    try {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.4,
        effects: true,
        smoothTouch: 0.1
      });
    } catch (e) {
      console.warn("ScrollSmoother not available", e);
    }
  }

  // Effect 11: Page Transition Curtain
  if (!sessionStorage.getItem('visited_gsap')) {
    sessionStorage.setItem('visited_gsap', 'true');
    const curtain = document.createElement('div');
    curtain.style.cssText = 'position:fixed;inset:0;background:black;z-index:99999;display:flex;align-items:center;justify-content:center;color:white;font-family:serif;font-size:3rem;flex-direction:column;';
    curtain.innerHTML = '<div>NACY.</div>';
    document.body.appendChild(curtain);
    
    gsap.to(curtain, {
      y: '-100%',
      duration: 1.2,
      delay: 0.8,
      ease: "expo.inOut",
      onComplete: () => curtain.remove()
    });
    gsap.from('#smooth-content', { opacity: 0, duration: 1.2, delay: 0.8 });
  }

  // Effect 12: Scroll progress indicator
  const progress = document.createElement('div');
  progress.style.cssText = 'position:fixed;top:0;left:0;height:1px;background:white;z-index:9999;width:0%;pointer-events:none;';
  document.body.appendChild(progress);

  if (ScrollTrigger) {
    gsap.to(progress, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }

  // Let React completely mount before querying specific DOM nodes
  setTimeout(() => {
    // Effect 2: Hero Headline Split Text Reveal
    const heroH1Rows = document.querySelectorAll('h1 > div');
    if (heroH1Rows.length > 0 && SplitText) {
      try {
         heroH1Rows.forEach((row, i) => {
            const split = new SplitText(row, { type: "chars" });
            const isItalic = (row as HTMLElement).style.fontStyle === 'italic' || row.querySelector('span.italic');
            gsap.from(split.chars, {
               opacity: 0, 
               y: 120, 
               rotationX: -90, 
               transformOrigin: "top center",
               duration: 1,
               stagger: 0.018,
               ease: "expo.out",
               delay: isItalic ? 0.3 : 0
            });
         });
      } catch(e) { console.warn("SplitText error", e); }
    }

    // Effect 3: Navbar Magnetic Links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
       const l = link as HTMLElement;
       l.addEventListener('mousemove', (e) => {
          const rect = l.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.2;
          const deltaY = (e.clientY - centerY) * 0.2;
          gsap.to(l, { x: deltaX, y: deltaY, duration: 0.3, ease: 'power2.out' });
       });
       l.addEventListener('mouseleave', () => {
          gsap.to(l, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
       });
    });

    // Effect 4: Marquee Strip Speed on Scroll
    if (ScrollTrigger) {
       ScrollTrigger.create({
         onUpdate: (self: any) => {
           const velocity = self.getVelocity();
           gsap.to(".animate-marquee", {
             timeScale: 1 + Math.abs(velocity) / 300,
             duration: 0.5,
             ease: "power2.out",
             overwrite: "auto"
           });
         }
       });
    }

    // Effect 9: Counter Animation (enhanced)
    const counters = document.querySelectorAll('.counter, [data-counter]');
    counters.forEach(counter => {
       if (ScrollTrigger) {
          gsap.from(counter, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              once: true
            },
            onComplete: () => {
               gsap.fromTo(counter, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "back.out(1.7)" });
            }
          });
       }
    });

    // Effect 10: Final CTA Magnetic Button
    const ctaButton = document.querySelector('a[href*="calendly"]');
    if (ctaButton) {
       const btn = ctaButton as HTMLElement;
       btn.addEventListener('mousemove', (e) => {
         const rect = btn.getBoundingClientRect();
         const centerX = rect.left + rect.width / 2;
         const centerY = rect.top + rect.height / 2;
         const deltaX = (e.clientX - centerX) * 0.3;
         const deltaY = (e.clientY - centerY) * 0.3;
         gsap.to(btn, { x: deltaX, y: deltaY, duration: 0.3, ease: "power2.out" });
       });
       btn.addEventListener('mouseleave', () => {
         gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
       });
    }

    if (ScrollTrigger) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

  }, 100);
}
