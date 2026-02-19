document.addEventListener('DOMContentLoaded', function () {

  // --- 1. SÉLECTION DES ÉLÉMENTS GLOBAUX ---
  const header = document.getElementById('header');
  const hero = document.querySelector('.hero');
  const sections = document.querySelectorAll('section[id]');
  const navMenu = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');

  // --- 2. GESTION DU MENU MOBILE ---
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

  // --- 3. DÉFILEMENT DOUX (SMOOTH SCROLL) ---
  // Sélectionne tous les liens d'ancre (navigation et boutons CTA)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // Ignorer les liens vides

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculer la position en tenant compte de la hauteur du header
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Fermer le menu mobile si ouvert
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
      }
    });
  });

  // --- 4. OPTIMISATION GLOBALE DU SCROLL (60 FPS) ---
  let ticking = false;

  // Cette fonction regroupe TOUS les calculs liés au scroll
  function handleScrollUpdates() {
    const scrollY = window.pageYOffset;

    // A. Ombre du header
    if (header) {
      if (scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    }

    // B. Effet parallaxe du hero
    if (contactForm) {
      // Vider les champs du formulaire à chaque rechargement de page
      contactForm.reset();

      // Charger dynamiquement l'URL Formspree depuis le fichier formspree.key
      fetch('formspree.key')
        .then(response => response.text())
        .then(url => {
          contactForm.action = url.trim();
        });
      // Vider les champs au chargement de la page
      contactForm.reset();

      contactForm.addEventListener('submit', function (e) {
        // Afficher un message de chargement
        const submitButton = this.querySelector('.btn-primary');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Vider les champs après envoi (après un court délai pour laisser le temps à Formspree)
        setTimeout(() => {
          contactForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 1500);
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
  });

// --- 5. FORMULAIRE DE CONTACT (FORMSPREE) ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  // Renseigne ton ID Formspree directement ici (C'est public, c'est normal !)
  contactForm.action = "https://formspree.io/f/TON_ID_ICI";

  contactForm.addEventListener('submit', function () {
    const submitButton = this.querySelector('.btn-primary') || this.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Envoi en cours...';
      submitButton.disabled = true;
    }
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

// --- 6. OBSERVERS (ANIMATIONS & LAZY LOADING) ---

// A. Observer pour les animations d'apparition
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries, obs) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      // On arrête d'observer l'élément une fois animé pour économiser des ressources
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.expertise-card, .realisation-card, .about-content');
animatedElements.forEach(el => {
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// B. Observer pour le Lazy Loading des images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      obs.unobserve(img); // Arrête d'observer une fois chargée
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// --- 7. MESSAGE DE BIENVENUE ---
console.log('%c🚀 Bienvenue sur Flexitronic', 'background: #667482; color: white; font-size: 18px; padding: 10px; border-radius: 5px;');
console.log('%cBureau d\'études en électronique - De la conception au produit fini', 'color: #718eaa; font-size: 14px;');

});