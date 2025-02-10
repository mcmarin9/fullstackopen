const app = require('./app') // The Express app
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Using database: ${config.MONGODB_URI}`);
  logger.info(`Server running on port ${config.PORT}`)
})