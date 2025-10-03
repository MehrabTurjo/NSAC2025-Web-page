// Smooth scrolling and active link handling
(function() {
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-links');
  if (toggle && list) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      list.classList.toggle('open');
    });
    list.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        list.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll behavior with target flash
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId?.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.classList.remove('flash');
          // reflow to restart animation
          void target.offsetWidth;
          target.classList.add('flash');
        }
      }
    });
  });

  // Active link highlight using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = sections.indexOf(entry.target);
      if (index >= 0) {
        const link = navLinks[index];
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });

  sections.forEach(section => observer.observe(section));

  // Observe hero and sections for in-view animation
  const animatedSections = document.querySelectorAll('.hero, .section');
  const inViewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        inViewObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  animatedSections.forEach(el => inViewObserver.observe(el));

  // Section reveal animations
  const revealItems = document.querySelectorAll('.reveal-item, .team-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  revealItems.forEach(el => revealObserver.observe(el));

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // telemetry removed

  // Hero parallax/mouse-tracking removed per request (no motion)

  // Remove old contact form handler (no longer needed)

  // CTA click placeholders
  // Removed old CTA toasts (buttons now navigate to pages)
})();


