# Instrucciones para ejecutar la aplicación (Frontend y Backend)

Este README detalla los pasos para clonar, configurar y ejecutar tanto el frontend como el backend de la aplicación, así como los pasos para ejecutar ambos en contenedores Docker.

## Requisitos previos

- Node.js (versión 18 o superior)
- Docker (opcional para contenedores)

## Clonar los repositorios

Clona los repositorios del frontend y backend:

```bash
git clone https://github.com/AndersonR96/op-front-end.git
git clone https://github.com/AndersonR96/op-back-end.git
```
## Iniciar el Backend
Navega al directorio del backend y sigue estos pasos:

```bash
npm install
npm start
```
El backend estará corriendo en http://localhost:3001/.

## Iniciar el Frontend en modo desarrollo

Configurar el archivo .env
Crea un archivo .env en la raíz del proyecto op-front-end con el siguiente contenido:
VITE_API_URL=http://localhost:3001/items/

En una nueva terminal, navega al directorio del frontend y ejecuta los siguientes comandos:

```bash
npm install
npm run dev
```

El frontend estará corriendo en http://localhost:3000/.


## Ejecutar el Frontend en modo producción
Para ejecutar el frontend en modo producción, utiliza los siguientes comandos:

```bash
npm run build
npm run preview
```

La aplicación seguirá estando disponible en http://localhost:3000/.

# Ejecución con Docker
Para ejecutar tanto el frontend como el backend utilizando Docker, sigue estos pasos:

Coloca ambos repositorios en un mismo directorio. Por ejemplo, crea una carpeta llamada proyecto:

```bash
mkdir proyecto
cd proyecto
```

## Clona los repositorios dentro de esta carpeta.

Crea un archivo docker-compose.yml en el mismo directorio y agrega el siguiente contenido:

```yaml 
version: '3'
services:
  frontend:
    build: ./op-front-end
    ports:
      - "3000:3000"
    networks:
      - app-network

  backend:
    build: ./op-back-end
    ports:
      - "3001:3001"
    networks:
      - app-network
    volumes:
      - ./op-back-end/data:/app/data

networks:
  app-network:
    driver: bridge
```

Modifica el archivo Dockerfile en op-front-end para agregar la siguiente variable de entorno:

```dockerfile
ENV VITE_API_URL=http://localhost:3001/items/
```

Ejecuta el siguiente comando para construir y levantar los servicios de Docker:

```bash
docker-compose up --build
```

La aplicación estará disponible en http://localhost:3000/ una vez que ambos contenedores estén en funcionamiento.