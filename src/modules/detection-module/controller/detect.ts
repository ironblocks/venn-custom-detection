import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'

import { logger } from '@/app'
import { ErrorHandler, validateRequest } from '@/helpers'
import {
    DetectorRequestParams,
    DetectRequest,
    getDetectorResponse,
} from '@/modules/detection-module/dtos'
import { DetectionService } from '@/modules/detection-module/service'
import { PublicClassFields } from '@/types'

export const detect = async (
    req: Request<DetectorRequestParams, PublicClassFields<DetectRequest>>,
    res: Response,
) => {
    const request = plainToInstance(DetectRequest, { ...req.body, ...req.params })

    logger.debug(`detect request started. Request id: ${request.id}`)

    try {
        // validate request
        await validateRequest(request)

        // HERE YOU WOULD IMPLEMENT YOUR DETECTION LOGIC
        // YOUR CODE HERE

        const result = DetectionService.detect(request)

        logger.debug('detect request finished succesfully')

        // return response
        res.json(getDetectorResponse(result))
    } catch (error) {
        // handle errors
        ErrorHandler.processApiError(res, error)
    }
}
