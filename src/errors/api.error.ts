export enum ErrorKeys {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',
    SCHEMA_ERROR = 'SCHEMA_ERROR',
}

export class ApiError extends Error {
    public readonly statusCode: number
    public readonly errorKey: ErrorKeys

    constructor(message: string, statusCode: number, errorKey: ErrorKeys) {
        super(message)
        this.statusCode = statusCode
        this.errorKey = errorKey
    }
}