import { config } from 'dotenv'
config()
import { app } from './app'
import { logger } from './logger'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason))
console.log(port);

app.listen(Number(port)).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
