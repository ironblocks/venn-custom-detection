import { HTTP_STATUS_CODES } from '@/types'

type RequestErrorProps = { message?: string; code: HTTP_STATUS_CODES }

/* 
    BASIC HTTP ERRORS CLASSES
    
    EXTEND TO YOUR NEEDS IN CASE YOUR APP USES MORE ERROR STATUSES
*/

export class RequestError extends Error {
    code: HTTP_STATUS_CODES

    constructor({ message, code }: RequestErrorProps) {
        super(message)
        this.code = code
    }
}

export class BadRequestError extends RequestError {
    constructor(message?: string) {
        super({
            message,
            code: HTTP_STATUS_CODES.BAD_REQUEST,
        })
    }
}

export class InternalError extends RequestError {
    constructor(message?: string) {
        super({
            message,
            code: HTTP_STATUS_CODES.INTERNAL_ERROR,
        })
    }
}

export class UnauthorizedError extends RequestError {
    constructor(message?: string) {
        super({
            message,
            code: HTTP_STATUS_CODES.UNAUTHORIZED,
        })
    }
}

export class NotFoundError extends RequestError {
    constructor(message?: string) {
        super({
            message,
            code: HTTP_STATUS_CODES.NOT_FOUND,
        })
    }
}

export class ForbiddenError extends RequestError {
    constructor(message?: string) {
        super({
            message,
            code: HTTP_STATUS_CODES.FORBIDDEN,
        })
    }
}
