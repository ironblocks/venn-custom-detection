import { Expose, plainToInstance } from 'class-transformer'

import { DetectionRequest } from '@/modules/detection-module/dtos/requests'

export type DetectionResponseInitOpts = {
    request: DetectionRequest
    detectionInfo: {
        error?: boolean
        message?: string
        detected: boolean
    }
}

export class DetectionResponse {
    requestId: string
    chainId: number
    detected: boolean
    error?: boolean
    message?: string
    protocolAddress?: string
    protocolName?: string
    additionalData?: Record<string, unknown>

    constructor({
        request,
        detectionInfo: { error, message, detected },
    }: DetectionResponseInitOpts) {
        this.requestId = request.id ?? ''
        this.chainId = request.chainId
        this.protocolAddress = request.protocolAddress ?? ''
        this.protocolName = request.protocolName ?? ''
        this.additionalData = request.additionalData
        this.error = error
        this.message = message
        this.detected = detected
    }
}

class DetectionResponseDTO {
    @Expose()
    requestId!: string

    @Expose()
    chainId!: number

    @Expose()
    detected!: boolean

    @Expose()
    error?: boolean

    @Expose()
    message?: string

    @Expose()
    protocolAddress?: string

    @Expose()
    protocolName?: string

    @Expose()
    additionalData?: Record<string, unknown>
}

export const toDetectionResponse = (detectorEntity: DetectionResponse): DetectionResponseDTO => {
    return plainToInstance(DetectionResponseDTO, detectorEntity)
}
