import { ApiError, ErrorKeys } from './api.error'

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404, ErrorKeys.NOT_FOUND)
    }
}