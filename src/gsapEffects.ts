export function initGsapEffects() {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    initMobileAnimations();
    return;
  }

  // Only load GSAP on desktop
  const scripts = [
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollSmoother.min.js'
  ];

  let loaded = 0;
  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      loaded++;
      if (loaded === scripts.length) {
        initGSAP();
      }
    };
    document.head.appendChild(script);
  });
}

function initGSAP() {
  const { gsap, ScrollTrigger, SplitText, ScrollSmoother } = window as any;
  if (!gsap || !ScrollTrigger || !SplitText || !ScrollSmoother) return;

  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

  try {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.4,
      effects: true,
      smoothTouch: 0.1
    });
  } catch (e) {
    console.warn("ScrollSmoother not available", e);
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

  // Let React completely mount before querying specific DOM nodes
  setTimeout(() => {
    // Effect 2: Hero Headline Split Text Reveal
    const heroH1Rows = document.querySelectorAll('h1 > div');
    if (heroH1Rows.length > 0) {
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
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
       const l = link as HTMLElement;
       const underline = l.querySelector('.nav-underline');
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
          if(underline) {
             gsap.to(underline, { width: 0, duration: 0.3, ease: 'power2.inOut' });
          }
       });
       l.addEventListener('mouseenter', () => {
          if(underline) {
             gsap.to(underline, { width: '100%', duration: 0.3, ease: 'power2.out' });
          }
       });
    });

    // Effect 4: Marquee Strip Speed on Scroll
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

    // Effect 9: Counter Animation (enhanced)
    const counters = document.querySelectorAll('.counter, [data-counter]');
    counters.forEach(counter => {
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
    });

    // Effect 5: Problem Section Rows
    const problemRows = document.querySelectorAll('.problem-row');
    if(problemRows.length > 0) {
      gsap.fromTo(problemRows, 
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "expo.out",
          scrollTrigger: {
            trigger: problemRows[0].parentElement,
            start: "top 80%",
            once: true
          }
        }
      );
      document.querySelectorAll('.problem-number').forEach((num) => {
        const target = (num as HTMLElement).dataset.number || "0";
        gsap.to(num, {
          textContent: target,
          duration: 1,
          delay: 0.1,
          snap: { textContent: 1 },
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: num,
            start: "top 80%",
            once: true
          }
        });
      });
    }

    // Effect 8: Testimonials Horizontal Scroll
    const testContainer = document.querySelector('.testimonials-container');
    const testWrapper = document.querySelector('.testimonials-wrapper');
    const testProgress = document.querySelector('.testimonial-progress');
    if (testContainer && testWrapper && testProgress) {
      const scrollDist = testWrapper.scrollWidth - testContainer.clientWidth;
      const tScroll = gsap.to(testWrapper, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: testContainer,
          pin: true,
          scrub: 1.2,
          end: () => "+=" + scrollDist
        }
      });
      gsap.to(testProgress, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: testContainer,
          scrub: 1.2,
          start: "center center",
          end: () => "+=" + scrollDist
        }
      });
      
      const cards = document.querySelectorAll('.testimonial-card');
      cards.forEach(card => {
        gsap.fromTo(card, { x: 50, opacity: 0 }, {
           x: 0, opacity: 1, duration: 0.8,
           scrollTrigger: {
             trigger: card,
             containerAnimation: tScroll,
             start: "left 80%"
           }
        });
      });
    }

    // Effect 10: Final CTA Magnetic Button
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
       const b = btn as HTMLElement;
       let split: any = null;
       if (SplitText) {
          split = new SplitText(b, {type: "chars"});
       }
       b.addEventListener('mousemove', (e) => {
         const rect = b.getBoundingClientRect();
         const centerX = rect.left + rect.width / 2;
         const centerY = rect.top + rect.height / 2;
         const deltaX = (e.clientX - centerX) * 0.3;
         const deltaY = (e.clientY - centerY) * 0.3;
         gsap.to(b, { x: deltaX, y: deltaY, duration: 0.3, ease: "power2.out", boxShadow: "0 0 30px rgba(255,255,255,0.15)" });
       });
       b.addEventListener('mouseleave', () => {
         gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", boxShadow: "0 0 0px rgba(255,255,255,0)" });
         if (split) {
            gsap.to(split.chars, { y: 0, stagger: 0.02, duration: 0.2 });
         }
       });
       b.addEventListener('mouseenter', () => {
         if (split) {
            gsap.to(split.chars, { y: -3, stagger: 0.02, duration: 0.2 });
         }
       });
    });

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

  }, 100);
}

function initMobileAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        (entry.target as HTMLElement).style.opacity = '1';
        (entry.target as HTMLElement).style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  setTimeout(() => {
    document.querySelectorAll('.counter, [data-counter]').forEach(counter => {
      const el = counter as HTMLElement;
      // Note: This matches the user's specific text logic
      // In the React app, these numbers are hardcoded HTML text, we need to extract the target visually if there's no data-counter
      const text = el.textContent || '';
      const targetMatch = text.match(/\d+/);
      const targetStr = el.getAttribute('data-counter') || (targetMatch ? targetMatch[0] : null);
      if (!targetStr) return;
      const target = parseInt(targetStr, 10);
      
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let count = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              el.textContent = text.replace(targetStr, target.toString());
              clearInterval(timer);
            } else {
              el.textContent = text.replace(targetStr, Math.floor(count).toString());
            }
          }, 16);
          obs.unobserve(el);
        }
      });
      obs.observe(el);
    });
  }, 100);
}
