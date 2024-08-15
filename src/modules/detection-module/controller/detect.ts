import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'

import { logger } from '@/app'
import { ErrorHandler, validateRequest } from '@/helpers'
import {
    DetectorRequestParams,
    DetectorResponse,
    DetectRequest,
    getDetectorResponse,
} from '@/modules/detection-module/dtos'
import { PublicClassFields } from '@/types'

// For this example, we'll just return a mock response, you can implement any logic
const getDetectionResult__MOCKED = (request: DetectRequest): DetectorResponse => {
    return {
        requestId: request.id,
        chainId: request.chainId,
        detected: Math.random() < 0.5, // Random detection for demonstration
        protocolAddress: request.protocolAddress,
        protocolName: request.protocolName,
        message: 'Example message',
        error: false,
        additionalData: {
            detectorName: request.detectorName,
            detectionTimestamp: new Date().toISOString(),
        },
    }
}

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

        const result = getDetectionResult__MOCKED(request)

        logger.debug('detect request finished succesfully')

        // return response
        res.json(getDetectorResponse(result))
    } catch (error) {
        // handle errors
        ErrorHandler.processApiError(res, error)
    }
}
