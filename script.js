// ==========================================================================
// Page Load & Initialization
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initScrollAnimations();
  initHeroSlider();
  initNavigation();
  initParticles();
  initCounters();
  initFormHandling();
  initSmoothScroll();
  initParallaxEffects();
});

// ==========================================================================
// Navigation
// ==========================================================================

function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active link highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  });
}

// ==========================================================================
// Hero Slider
// ==========================================================================

function initHeroSlider() {
  const heroSwiper = new Swiper(".hero-slider", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 2000,
  });

  // Hero text animations
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");

  if (heroTitle && heroSubtitle) {
    gsap.set([heroTitle, heroSubtitle], { opacity: 0, y: 30 });

    // Title animation - simple fade in
    gsap.to(heroTitle, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power2.out",
    });

    // Subtitle animation
    gsap.to(heroSubtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.8,
      ease: "power2.out",
    });
  }
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Section title animations
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Feature cards staggered animation
  gsap.utils.toArray(".feature-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Mission & Vision cards
  gsap.utils.toArray(".mission-card, .vision-card").forEach((card, index) => {
    const direction = index % 2 === 0 ? -100 : 100;
    gsap.fromTo(
      card,
      { opacity: 0, x: direction },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Values cards masonry animation
  gsap.utils.toArray(".value-item").forEach((item, index) => {
    const text = item.querySelector(".value-text");
    const visual = item.querySelector(".value-visual");
    const isEven = index % 2 === 0;

    gsap.fromTo(
      text,
      { opacity: 0, x: isEven ? -100 : 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      visual,
      { opacity: 0, x: isEven ? 100 : -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Service cards hover reveal
  gsap.utils.toArray(".service-card").forEach((card) => {
    const image = card.querySelector(".service-image img");
    const content = card.querySelector(".service-content");

    gsap.fromTo(
      card,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Commitment items alternating animation
  gsap.utils.toArray(".commitment-item").forEach((item, index) => {
    const image = item.querySelector(".commitment-image");
    const content = item.querySelector(".commitment-content");
    const isReverse = item.classList.contains("reverse");

    gsap.fromTo(
      image,
      { opacity: 0, x: isReverse ? 100 : -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      content,
      { opacity: 0, x: isReverse ? -100 : 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Area features reveal
  gsap.utils.toArray(".area-feature").forEach((feature, index) => {
    gsap.fromTo(
      feature,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: feature,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Company section reveal
  const companyInfo = document.querySelector(".company-info");
  const companyVisual = document.querySelector(".company-visual");

  if (companyInfo && companyVisual) {
    gsap.fromTo(
      companyInfo,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: companyInfo,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      companyVisual,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: companyVisual,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Contact form reveal
  const contactForm = document.querySelector(".contact-form");
  const contactInfo = document.querySelector(".contact-info");

  if (contactForm && contactInfo) {
    gsap.fromTo(
      contactInfo,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactInfo,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      contactForm,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactForm,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
}

// ==========================================================================
// Parallax Effects
// ==========================================================================

function initParallaxEffects() {
  // Parallax images
  gsap.utils.toArray(".parallax-image, .parallax-img").forEach((img) => {
    gsap.to(img, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Background parallax for hero
  const heroBgs = document.querySelectorAll(".hero-bg");
  heroBgs.forEach((bg) => {
    gsap.to(bg, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: bg,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Area background parallax
  const areaBg = document.querySelector(".area-bg-image");
  if (areaBg) {
    gsap.to(areaBg, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".area",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

// ==========================================================================
// Particle Effects
// ==========================================================================

function initParticles() {
  const particleContainer = document.querySelector(".floating-particles");
  if (!particleContainer) return;

  // Create floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
    particleContainer.appendChild(particle);

    // Animate particle
    gsap.to(particle, {
      y: `random(-100, 100)`,
      x: `random(-50, 50)`,
      duration: `random(4, 8)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(particle, {
      opacity: `random(0.1, 0.5)`,
      duration: `random(2, 4)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

// ==========================================================================
// Number Counters
// ==========================================================================

function initCounters() {
  // カウントアップエフェクトを削除 - 静的な数字表示のみ
}

// ==========================================================================
// Smooth Scroll
// ==========================================================================

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: targetSection,
            offsetY: 80,
          },
          ease: "power2.inOut",
        });
      }
    });
  });
}

// ==========================================================================
// Form Handling
// ==========================================================================

function initFormHandling() {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.querySelector(".submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add loading state
      submitBtn.style.opacity = "0.7";
      submitBtn.style.pointerEvents = "none";

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        gsap.to(contactForm, {
          scale: 0.95,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        });

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.style.opacity = "1";
        submitBtn.style.pointerEvents = "auto";

        // Show success notification
        showNotification(
          "お問い合わせありがとうございます。後日ご連絡いたします。"
        );
      }, 1500);
    });

    // Form field animations
    const formInputs = contactForm.querySelectorAll("input, select, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        gsap.to(this, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }
}

// ==========================================================================
// Utility Functions
// ==========================================================================

function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        z-index: 10000;
        font-size: 16px;
        max-width: 300px;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  gsap.fromTo(
    notification,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    }
  );

  setTimeout(() => {
    gsap.to(notification, {
      opacity: 0,
      x: 100,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        notification.remove();
      },
    });
  }, 4000);
}

// ==========================================================================
// Image Hover Effects
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    const image = card.querySelector(".service-image img");

    card.addEventListener("mouseenter", () => {
      gsap.to(image, {
        scale: 1.15,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  });

  // Feature card shimmer effect
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.setProperty("--shimmer-delay", "0s");
    });
  });

  // Value card tilt effect
  const valueCards = document.querySelectorAll(".value-card");
  valueCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
});

// ==========================================================================
// Window Resize Handler
// ==========================================================================

window.addEventListener("resize", function () {
  ScrollTrigger.refresh();
});

// ==========================================================================
// Performance Optimizations
// ==========================================================================

// Preload critical images
const criticalImages = [
  "img/main01.png",
  "img/mansion01.png",
  "img/main02.png",
];

criticalImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Lazy loading for non-critical images
const lazyImages = document.querySelectorAll("img[data-src]");
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
}
