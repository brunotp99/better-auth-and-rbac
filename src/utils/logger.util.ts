import logger from 'pino'
import dayjs from 'dayjs'

const log = logger({
    transport: {
        target: 'pino-pretty',
    },
    level: 'trace',
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default log