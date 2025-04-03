import nodemailer from 'nodemailer'
import { env } from './env.util'
import log from './logger.util'

export interface MailInterface {
    from?: string
    to: string | string[]
    cc?: string | string[]
    bcc?: string | string[]
    subject: string
    text?: string
    html: string
}

export interface MailSendResponse {
    accepted: string[]
    ehlo: string[]
    envelope: {
        from: string
        to: string[]
    }
    envelopeTime: number
    messageId: string
    messageSize: number
    messageTime: number
    rejected: string[]
    response: string
}

export default class MailService {
    private static instance: MailService
    private transporter: nodemailer.Transporter | undefined

    private constructor() {
        this.transporter = undefined
    }

    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService()
        }
        return MailService.instance
    }

    // CREATE CONNECTION FOR LOCAL
    async createLocalConnection() {
        const account = await nodemailer.createTestAccount()
        this.transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        })
    }

    async createConnection() {
        this.transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: Number(env.SMTP_PORT),
            secure: true,
            auth: {
                user: env.SMTP_USERNAME,
                pass: env.SMTP_PASSWORD,
            },
        })
    }

    async sendMail(options: MailInterface): Promise<MailSendResponse> {
        if (!this.transporter) {
            throw new Error('Transporter not initialized.')
        }

        return await this.transporter
            .sendMail({
                from: `"TEST" ${env.SMTP_USERNAME || options.from}`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
            .then((info) => {
                if (env.NODE_ENV === 'test' || env.NODE_ENV === 'dev') {
                    log.info(`Mail sent successfully`)
                    log.info(
                        `[MailResponse]=${info.response} [MessageID]=${info.messageId}`,
                    )
                    console.log(
                        `Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
                            info,
                        )}`,
                    )
                }
                return info
            })
    }

    async verifyConnection() {
        if (!this.transporter) {
            throw new Error('Transporter not initialized.')
        }

        return this.transporter.verify()
    }

    getTransporter() {
        if (!this.transporter) {
            throw new Error('Transporter not initialized.')
        }

        return this.transporter
    }
}