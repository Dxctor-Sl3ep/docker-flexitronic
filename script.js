/* ========================================
   FLEXITRONIC - JavaScript Interactions
   Single Page Application
   ======================================== */

// ========================================
// WAIT FOR DOM TO BE LOADED
// ========================================
document.addEventListener('DOMContentLoaded', function() {

  /* ========================================
     NAVIGATION STICKY & SCROLL EFFECT
     ======================================== */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Ajouter une ombre au header lors du scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });

  /* ========================================
     SMOOTH SCROLLING POUR LES LIENS D'ANCRE
     ======================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
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

  /* ========================================
     MENU HAMBURGER (MOBILE)
     ======================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animation du hamburger
      this.classList.toggle('active');
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  /* ========================================
     HIGHLIGHT ACTIVE SECTION IN NAVIGATION
     ======================================== */
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

  /* ========================================
     ANIMATION AU SCROLL (FADE IN)
     ======================================== */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
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

  /* ========================================
     FORMULAIRE DE CONTACT - VALIDATION
     ======================================== */
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Le formulaire Formspree gère l'envoi
      // Afficher un message de chargement
      const submitButton = this.querySelector('.btn-primary');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Envoi en cours...';
      submitButton.disabled = true;
      
      // Note: Formspree redirigera vers sa page de confirmation
      // Pour une meilleure UX, vous pouvez utiliser leur API pour rester sur la page
    });
    
    // Validation en temps réel des champs
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#dee2e6';
        }
      });
      
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.style.borderColor = '#28a745';
        }
      });
    });
  }

  /* ========================================
     PARALLAX EFFECT SUR LE HERO
     ======================================== */
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      // Effet parallaxe sur l'image de fond
      hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
    });
  }

  /* ========================================
     BOUTONS "SMOOTH SCROLL"
     ======================================== */
  const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
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

  /* ========================================
     COMPTEUR ANIMÉ (OPTIONNEL)
     Si vous ajoutez des statistiques
     ======================================== */
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

  // Exemple d'utilisation :
  // const statsElements = document.querySelectorAll('.stat-number');
  // statsElements.forEach(el => {
  //   const target = parseInt(el.getAttribute('data-target'));
  //   animateCounter(el, target);
  // });

  /* ========================================
     AFFICHER UN MESSAGE DE BIENVENUE
     ======================================== */
  console.log('%c🚀 Bienvenue sur Flexitronic', 'background: #1a3c5e; color: white; font-size: 18px; padding: 10px; border-radius: 5px;');
  console.log('%cBureau d\'études en électronique - De la conception au produit fini', 'color: #1a3c5e; font-size: 14px;');

  /* ========================================
     PRÉCHARGEMENT DES IMAGES
     ======================================== */
  const images = document.querySelectorAll('img[data-src]');
  
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

  /* ========================================
     DÉTECTION DU SCROLL POUR ANIMATIONS
     ======================================== */
  let isScrolling = false;
  
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        // Vos animations personnalisées ici
        
        isScrolling = false;
      });
      
      isScrolling = true;
    }
  });

});

/* ========================================
   FONCTIONS UTILITAIRES
   ======================================== */

// Fonction pour détecter si un élément est visible
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Fonction pour obtenir la position d'un élément
function getOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

// Debounce function pour optimiser les performances
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
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
window.addEventListener('scroll', debounce(function() {
  // Vos fonctions de scroll optimisées
}, 15));
