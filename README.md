# Flexitronic

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## 📌 À propos du projet

Flexitronic est un site vitrine pour un bureau d'etudes en electronique, specialise dans la conception, le prototypage, l'industrialisation et le developpement logiciel embarque. Le site est statique, rapide et concu pour presenter clairement l'activite de l'entreprise.

## ✨ Fonctionnalites principales

- Site vitrine clair et professionnel
- Design responsive (mobile, tablette, desktop)
- Formulaire de contact operationnel via Formspree
- Pages legales : Mentions legales et Politique de confidentialite

## 🛠️ Technologies utilisees

- HTML5
- CSS3
- JavaScript (vanilla)
- Docker (Nginx Alpine)

## ✅ Prerequis

- Git
- Docker

## 🚀 Installation et lancement en local

1) Cloner le depot

```bash
git clone https://github.com/Dxctor-Sl3ep/docker-flexitronic.git
cd docker-flexitronic
```

2) Configurer Formspree

- Renommer `formspree.key.example` en `formspree.key`
- Coller votre cle API Formspree dans `formspree.key`

3) Build de l'image Docker

```bash
docker build -t site-flexitronic .
```

4) Lancer le conteneur

```bash
docker run -d -p 80:80 --name flexitronic-container site-flexitronic
```

Le site est accessible sur : `http://localhost`

## 🗂️ Structure du projet

```
.
├── .dockerignore
├── .gitignore
├── dockerfile
├── formspree.key
├── formspree.key.example
├── index.html
├── logo.jpeg
├── mentions-legales.html
├── politique-confidentialite.html
├── README.md
├── script.js
└── styles.css
```

## 🌍 Deploiement en production (VPS + Nginx Proxy Manager)

1) Creer le reseau Docker utilise par Nginx Proxy Manager

```bash
docker network create npm-network
```

2) Lancer le site sur ce reseau

```bash
docker run -d --name flexitronic-site --network npm-network site-flexitronic
```

3) Configurer Nginx Proxy Manager

- Nginx Proxy Manager assure le reverse proxy
- Le certificat SSL/HTTPS est gere via Nginx Proxy Manager



