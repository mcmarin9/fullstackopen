const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

// Mostrar la URI de la base de datos que se está utilizando
logger.info(`Using database: ${config.MONGODB_URI}`);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});