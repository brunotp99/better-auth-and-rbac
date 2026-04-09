import type { NextFunction, Request, Response } from 'express'

import { type ApiError, ErrorKeys } from '@/errors/api.error'
import { env } from '@/utils/env.util'
import log from '@/utils/logger.util'

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,
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
