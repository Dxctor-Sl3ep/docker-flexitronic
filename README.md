# Flexitronic - Site Web Docker

Site web vitrine de présentation pour Flexitronic, bureau d'études spécialisé en conception et fabrication de produits électroniques.

## 🎯 Caractéristiques

- **Single Page Application (SPA)** - Navigation fluide en une seule page
- **Design Clean Tech** - Interface moderne et professionnelle
- **Responsive** - Adapté à tous les appareils (mobile, tablette, desktop)
- **Smooth Scroll** - Navigation fluide entre les sections
- **Formulaire de contact** - Intégré avec Formspree
- **Optimisé et léger** - Prêt pour la production

## 🚀 Démarrage rapide

### Construire l'image Docker

```bash
docker build -t flexitronic-web .
```

### Lancer le conteneur

```bash
docker run -d -p 80:80 --name flexitronic flexitronic-web
```

Le site sera accessible sur : **http://localhost**

### Arrêter et supprimer le conteneur

```bash
docker stop flexitronic
docker rm flexitronic
```

## 📁 Structure du projet

```
flexitronic/
├── index.html      # Structure HTML de la SPA
├── styles.css      # Styles CSS Clean Tech
├── script.js       # JavaScript pour interactions
├── dockerfile      # Configuration Docker
├── .dockerignore   # Fichiers exclus de l'image
└── README.md       # Documentation
```

## 🎨 Sections du site

1. **Header (Sticky)** - Navigation fixe avec menu responsive
2. **Hero** - Section d'accueil avec image de fond et call-to-action
3. **Expertises** - Grille de 4 cartes présentant les services
4. **Notre Approche** - Section texte + image explicative
5. **Réalisations** - Galerie de projets réalisés
6. **Contact** - Formulaire fonctionnel + informations de contact
7. **Footer** - Navigation et informations légales

## ✨ Fonctionnalités techniques

### CSS
- Variables CSS pour une personnalisation facile
- Système de grille responsive (Flexbox + CSS Grid)
- Animations et transitions fluides
- Effet parallaxe sur le hero
- Design adaptatif mobile-first

### JavaScript
- Smooth scroll natif entre sections
- Menu hamburger pour mobile
- Highlight de section active
- Animations au scroll (Intersection Observer)
- Validation de formulaire en temps réel
- Optimisations de performance (debounce)

## 📧 Configuration du formulaire

Le formulaire utilise **Formspree**. Pour le configurer :

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire
3. Remplacez `YOUR_FORMSPREE_ID` dans [index.html](index.html#L245) par votre ID Formspree
4. Exemple : `action="https://formspree.io/f/xwkgpppp"`

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec variables et animations
- **JavaScript (ES6+)** - Interactivité et smooth scroll
- **Docker** - Conteneurisation
- **Nginx Alpine** - Serveur web léger

## 🎨 Palette de couleurs

- **Primaire** : #1a3c5e (Bleu marine)
- **Accent** : #007bff (Bleu roi)
- **Neutre** : #f8f9fa (Gris clair)
- **Texte** : #343a40 (Gris foncé)

## 📞 Contact

**Flexitronic**  
Bureau d'études en électronique

**Email :** quentin.valenti@flexitronic.fr  
**Téléphone :** +33 (0)6 67 07 11 05  
**Localisation :** 33600 Pessac, France

## 📝 Licence

© 2026 Flexitronic. Tous droits réservés.

