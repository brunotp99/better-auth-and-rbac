import { ErrorKeys } from '@/errors/api.error'
import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

const validate =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (error: any) {
            res.status(400).json({
                error: true,
                errorKey: ErrorKeys.SCHEMA_ERROR,
                message: error.errors,
            })
        }
    }

export default validate