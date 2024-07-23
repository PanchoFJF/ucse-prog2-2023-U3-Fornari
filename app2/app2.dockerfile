# Dockerfile for App 2 (API)

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
EXPOSE 4001

# Comando para ejecutar
CMD ["npm", "start"]
