import { Expose, plainToInstance } from 'class-transformer'

export class DetectorResponse {
    requestId!: string
    chainId!: number
    detected!: boolean
    error?: boolean
    message?: string
    protocolAddress?: string
    protocolName?: string
    additionalData?: Record<string, unknown>
}

class DetectorResponseDTO {
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

export const toDetectorResponse = (detectorEntity: DetectorResponse): DetectorResponseDTO => {
    return plainToInstance(DetectorResponseDTO, detectorEntity)
}
