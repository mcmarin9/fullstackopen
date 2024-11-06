# Phonebook Application

Esta es una aplicación de agenda telefónica desplegada en Render.

## URL de la Aplicación

Puedes acceder a la aplicación en la siguiente dirección:
[https://fullstackopen-0dy2.onrender.com/](https://fullstackopen-0dy2.onrender.com/)

## Pasos para Construir y Desplegar la Aplicación

### Desarrollo Local

1. **Instalar Dependencias**:
   - Navega a las carpetas `backend` y `frontend` y ejecuta:
     ```sh
     cd phonebook/backend
     npm install
     cd ../frontend
     npm install
     ```

2. **Iniciar el Backend Localmente**:
   - Navega a la carpeta `backend` y ejecuta:
     ```sh
     cd phonebook/backend
     npm start
     ```
     Puedo usar 'npm run dev' si tengo nodemon

3. **Iniciar el Frontend Localmente**:
   - En una nueva terminal, navega a la carpeta `frontend` y ejecuta:
     ```sh
     cd phonebook/frontend
     npm run dev
     ```

### Despliegue en Render

1. **Construir el Frontend**:
   - Navega a la carpeta `frontend` y ejecuta:
     ```sh
     cd phonebook/frontend
     npm run build
     ```

2. **Mover la Carpeta `dist` al Backend**:
   - Navega a la carpeta `backend` y ejecuta:
     ```sh
     cd phonebook/backend
     npm run build:ui
     ```

3. **Iniciar el Backend Localmente**:
   - Asegúrate de que el backend está corriendo localmente:
     ```sh
     cd phonebook/backend
     npm start
     ```

4. **Hacer Commit y Push de los Cambios**:
   - Asegúrate de que los cambios están listos para ser desplegados y ejecuta:
     ```sh
     cd phonebook/backend
     npm run deploy:full
     ```