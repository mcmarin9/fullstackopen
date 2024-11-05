## URL de la Aplicación

Puedes acceder a la aplicación en la siguiente dirección:
[https://fullstackopen-example.onrender.com](https://fullstackopen-example.onrender.com/)

## Pasos para Construir y Desplegar la Aplicación

### Desarrollo Local

1. **Iniciar el Backend Localmente**:
   - Navega a la carpeta `backend` y ejecuta:
     ```sh
     cd example/backend
     npm start
     ```

2. **Iniciar el Frontend Localmente**:
   - Navega a la carpeta `frontend` y ejecuta:
     ```sh
     cd ../frontend
     npm run dev
     ```

### Despliegue en Render

1. **Construir el Frontend**:
   - Navega a la carpeta `frontend` y ejecuta:
     ```sh
     cd ../frontend
     npm run build
     ```

2. **Mover la Carpeta `dist` al Backend**:
   - Navega a la carpeta `backend` y ejecuta:
     ```sh
     cd ../backend
     npm run build:ui
     ```

3. **Hacer Commit y Push de los Cambios**:
   - Asegúrate de que los cambios están listos para ser desplegados y ejecuta:
     ```sh
        npm run deploy:full
     ```