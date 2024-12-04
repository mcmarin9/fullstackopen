require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Agregar mensajes de depuración para verificar las variables de entorno
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('TEST_MONGODB_URI:', process.env.TEST_MONGODB_URI);

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

// Mostrar la URI de la base de datos que se está utilizando
console.log('Using MONGODB_URI:', MONGODB_URI);

module.exports = {
  PORT,
  MONGODB_URI
};