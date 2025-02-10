## URL de la Aplicación

Puedes acceder a la aplicación en la siguiente dirección:
[https://fullstackopen-example.onrender.com](https://fullstackopen-example.onrender.com/)

## Pasos para Construir y Desplegar la Aplicación

### Desarrollo Local

1. **Iniciar la Aplicación Localmente**:
   - Navega a la carpeta raíz del proyecto y ejecuta:
     ```sh
     npm start
     ```

### Despliegue en Render

1. **Construir el Frontend**:
   - Navega a la carpeta raíz del proyecto y ejecuta:
     ```sh
     npm run build
     ```

2. **Mover la Carpeta `dist` al Backend**:
   - La carpeta `dist` ya está en la estructura unificada, por lo que este paso no es necesario.

3. **Hacer Commit y Push de los Cambios**:
   - Asegúrate de que los cambios están listos para ser desplegados y ejecuta:
     ```sh
     npm run deploy:full
     ```