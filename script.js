document.addEventListener('DOMContentLoaded', function () {

  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    // Ajouter une ombre au header lors du scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
  });

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Vérifier si c'est un lien d'ancre
      if (href.startsWith('#')) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Calculer la position en tenant compte du header
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          // Scroll fluide vers la section
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Fermer le menu mobile si ouvert
          navMenu.classList.remove('active');
        }
      }
    });
  });

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }


  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - header.offsetHeight - 50;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // Animation de scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observer les cartes et sections
  const animatedElements = document.querySelectorAll('.expertise-card, .realisation-card, .about-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Formulaire de contact
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Afficher un message de chargement
      const submitButton = this.querySelector('.btn-primary');
      const originalText = submitButton.textContent;

      submitButton.textContent = 'Envoi en cours...';
      submitButton.disabled = true;
    });

    // Validation en temps réel des champs
    const inputs = contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#dee2e6';
        }
      });

      input.addEventListener('input', function () {
        if (this.value.trim()) {
          this.style.borderColor = '#28a745';
        }
      });
    });
  }

  const hero = document.querySelector('.hero');

  if (hero) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      // Effet parallaxe sur l'image de fond
      hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
    });
  }

  const ctaButtons = document.querySelectorAll('.btn[href^="#"]');

  ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // Anime un compteur numérique de 0 à la valeur cible sur une durée donnée
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);

      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }


  // Message de bienvenue
  console.log('%c🚀 Bienvenue sur Flexitronic', 'background: #667482; color: white; font-size: 18px; padding: 10px; border-radius: 5px;');
  console.log('%cBureau d\'études en électronique - De la conception au produit fini', 'color: #718eaa; font-size: 14px;');


  const images = document.querySelectorAll('img[data-src]');

  // Détecte quand une image entre dans la fenêtre d'affichage pour charger sa source
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));


  let isScrolling = false;

  window.addEventListener('scroll', function () {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        // Vos animations personnalisées ici

        isScrolling = false;
      });

      isScrolling = true;
    }
  });

});


// Vérifie si un élément est entièrement visible dans la fenêtre d'affichage
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Calcule la position absolue d'un élément dans la page
function getOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

// Limite la fréquence d'exécution d'une fonction pour optimiser les performances (anti-rebond)
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Optimisation du scroll avec debounce
window.addEventListener('scroll', debounce(function () {
  // Vos fonctions de scroll optimisées
}, 15));
