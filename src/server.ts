import { app } from '@/app'
import log from '@/utils/logger.util'

const SERVER_PORT = process.env.SERVER_PORT

app.listen(SERVER_PORT, () => {
    log.info(`The server is running at: ${SERVER_PORT}`)
})