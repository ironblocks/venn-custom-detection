import { Response } from 'express'

import { logger } from '@/app'
import { errors } from '@/errors'
import { RequestError } from '@/errors/http.errors'

/* Singleton Error Handler class to process every error in app. Extend logic to your needs */

export class ErrorHandler {
    /**
     * Processes API errors, logs them, and sends an appropriate response to the client.
     *
     * @param res - The Express `Response` object used to send a response back to the client.
     * @param error - The error that was thrown and needs to be processed. It can be of any type.
     * @param additionalInfo - Optional. Additional information that should be included in the error response.
     *
     * @remarks
     * - If the error is not an instance of `RequestError`, it is wrapped in an `InternalError`.
     * - The error is logged using the application's logger.
     * - A JSON response is sent to the client with the appropriate HTTP status code and error message.
     *
     * @example
     * ```typescript
     * try {
     *     // some code that might throw an error
     * } catch (error) {
     *     ErrorHandler.processApiError(res, error, 'Additional details about the error');
     * }
     * ```
     */
    public static processApiError(res: Response, error: unknown, additionalInfo?: string) {
        let _error = error as RequestError

        if (!(error instanceof RequestError)) {
            _error = new errors.InternalError(String(error))
        }

        const errorResponse = {
            message: _error.message,
            code: _error.code,
            ...(additionalInfo && { details: additionalInfo }),
        }

        logger.error({ ...errorResponse })

        res.status(_error.code).json(errorResponse)
    }
}
