import { NextFunction, Request, Response } from 'express'

import { ApiError, ErrorKeys } from '@/errors/api.error'
import log from '@/utils/logger.util'
import { env } from '@/utils/env.util'

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    _: NextFunction,
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'
    const errorKey = error.errorKey ?? ErrorKeys.INTERNAL_SERVER_ERROR

    if (env.NODE_ENV === 'test') {
        console.log(error)
    }
    log.error(error.message ?? error)

    res.status(statusCode).json({
        error: true,
        errorKey,
        message,
    })
}