import 'dotenv/config'

import { z } from 'zod'

// coerce converts the value to the specified coerce.number() converts no number

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    FRONTEND_URL: z.string().url(),
    SERVER_PORT: z.coerce.string().default('3005'),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_TLS: z.string().transform((value) => value === 'true'),
    SMTP_USERNAME: z.string().email(),
    SMTP_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Invalid enviroment variable', _env.error.format())

    throw new Error('Invalid enviroment variables.')
}

export const env = _env.data