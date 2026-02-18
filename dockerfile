# Image de base Nginx
FROM nginx:alpine

# Copie des fichiers du site web
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Port exposé
EXPOSE 80

# Commande de démarrage (celle par défaut de nginx)
CMD ["nginx", "-g", "daemon off;"]