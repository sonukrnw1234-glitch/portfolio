/* =========================================================
   SONE KUMAR — PORTFOLIO SCRIPTS
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Preloader ---------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('loaded'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => preloader.classList.add('loaded'), 1800);

  /* ---------------- Set current year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Custom cursor ---------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    });

    const interactiveEls = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  } else {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  }

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const scrollProgress = document.getElementById('scrollProgress');

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background
    navbar.classList.toggle('scrolled', scrollY > 30);

    // Back to top button
    backToTop.classList.toggle('show', scrollY > 400);

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  document.querySelectorAll('[data-link]').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ---------------- Back to top click ---------------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Active nav link on scroll ---------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((sec) => sectionObserver.observe(sec));

  /* ---------------- Typing effect (hero) ---------------- */
  const typedTextEl = document.getElementById('typedText');
  const roles = [
    'Software Engineer',
    'CSE Student',
    'Web Developer',
    'Problem Solver',
    'Open Source Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedTextEl.textContent = currentRole.substring(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeLoop, 1600); // pause at full word
        return;
      }
    } else {
      charIndex--;
      typedTextEl.textContent = currentRole.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = deleting ? 40 : 90;
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* ---------------- Scroll reveal animations ---------------- */
  const revealEls = document.querySelectorAll('.fade-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => entry.target.classList.add('in-view'), Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-target'));
    const duration = 1400;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + (progress === 1 ? '+' : '');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => counterObserver.observe(el));

  /* ---------------- Proficiency bar animation ---------------- */
  const bars = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach((bar) => barObserver.observe(bar));

  /* ---------------- Project filter ---------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---------------- Contact form (front-end only) ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.style.color = '#e76f51';
        formStatus.textContent = 'Please fill in all fields before sending.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formStatus.style.color = '#e76f51';
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate sending (no backend connected)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        formStatus.style.color = '#4fd1c5';
        formStatus.textContent = `Thanks, ${name}! Your message has been noted. I'll get back to you soon.`;
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 1200);
    });
  }

});