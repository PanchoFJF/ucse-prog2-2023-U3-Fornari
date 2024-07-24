# Dockerfile for App 1 (Time API)
# Crear imagen: docker build -t app1-image -f app1.dockerfile .

# Usar una imagen de Node.js
FROM node:16

# Crear y establecer directorio
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json al directorio
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar resto del código al directorio
COPY . .

# Exponer el puerto que escucha
EXPOSE 4000

# Comando para ejecutar
CMD ["npm", "start"]
