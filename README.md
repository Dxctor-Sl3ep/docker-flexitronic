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

## 🧭 Resume du deploiement de A a Z

### Etape 1 : Preparation du VPS et installation de Docker

- Connexion au serveur (SSH) :
	```bash
	ssh ubuntu@adresse_ip_du_vps
	```
- Mise a jour du systeme :
	```bash
	sudo apt update && sudo apt upgrade -y
	```
- Installation de Docker (script officiel) :
	```bash
	curl -fsSL https://get.docker.com -o get-docker.sh
	sudo sh get-docker.sh
	```
- Permissions (eviter sudo) :
	```bash
	sudo usermod -aG docker $USER
	```
	Reconnexion requise pour appliquer les droits.

### Etape 2 : Recuperation du projet et dockerisation

- Clonage du depot Git :
	```bash
	git clone https://github.com/Dxctor-Sl3ep/docker-flexitronic.git
	cd docker-flexitronic
	```
- Configuration de la cle Formspree :
	```bash
	nano formspree.key
	```
- Dockerfile (copie du projet dans Nginx) :
	```dockerfile
	COPY . /usr/share/nginx/html/
	```
- Build de l'image :
	```bash
	docker build -t site-flexitronic .
	```

### Etape 3 : Configuration du nom de domaine (DNS chez OVH)

- Nettoyage des anciennes redirections (ex: Webflow) tout en conservant les enregistrements email.
- Creation de deux entrees A :
	- flexitronic.fr -> IP du VPS
	- www.flexitronic.fr -> IP du VPS

### Etape 4 : Preparation du HTTPS (Reverse Proxy)

- Creation du reseau interne :
	```bash
	docker network create npm-network
	```
- Lancement du site sur ce reseau (sans exposition directe en 80) :
	```bash
	docker run -d --name flexitronic-site --network npm-network site-flexitronic
	```
- Lancement de Nginx Proxy Manager (ports 80/81/443 exposes) :
	```bash
	docker run -d \
		--name nginx-proxy \
		--network npm-network \
		-p 80:80 -p 81:81 -p 443:443 \
		-v npm_data:/data \
		-v npm_letsencrypt:/etc/letsencrypt \
		jc21/nginx-proxy-manager:latest
	```

### Etape 5 : Generation du cadenas SSL (HTTPS)

- Acces a l'interface NPM : `http://ip_de_ton_vps:81`
- Creation d'un Proxy Host pour :
	- flexitronic.fr
	- www.flexitronic.fr
- Cible interne : conteneur `flexitronic-site` sur le port 80
- Onglet SSL : certificat Let's Encrypt + option "Force SSL"

## 🔄 Mise a jour du site en production

Une fois le site deploye, mettre a jour le contenu est tres simple. Nginx Proxy Manager conserve automatiquement la configuration HTTPS et le domaine tant que le nouveau conteneur a le meme nom et reseau.

### Etape 1 : Se placer dans le dossier du projet

```bash
cd ~/docker-flexitronic
```

### Etape 2 : Recuperer le nouveau code

Si vous avez modifie le code sur votre ordinateur et pousse les changements sur GitHub :

```bash
git pull
```

Si vous avez modifie directement sur le VPS avec `nano`, cette etape n'est pas necessaire.

### Etape 3 : Reconstruire l'image Docker

Integrez vos modifications dans une nouvelle image (Docker utilise son cache pour accelerer) :

```bash
docker build -t site-flexitronic .
```

### Etape 4 : Remplacer l'ancien conteneur

Supprimez l'ancien conteneur et lancez le nouveau avec le meme nom :

```bash
docker rm -f flexitronic-site
docker run -d --name flexitronic-site --network npm-network site-flexitronic
```

Le site est immediatement mis a jour sur `https://flexitronic.fr`. Pensez a rafraichir avec `Ctrl + F5` pour vider le cache du navigateur.
