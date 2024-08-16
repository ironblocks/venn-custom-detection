import { plainToInstance } from 'class-transformer'

import { DetectorResponse, DetectRequest } from './dtos'

// For this example, we'll just return a mock response, you can implement any logic
export class DetectionService {
    public static detect(request: DetectRequest): DetectorResponse {
        return plainToInstance(DetectorResponse, {
            requestId: request.id,
            chainId: request.chainId,
            detected: Math.random() < 0.5, // Random detection for demonstration
            protocolAddress: request.protocolAddress,
            protocolName: request.protocolName,
            message: 'Example message',
            error: false,
        })
    }
}
