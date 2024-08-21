import { Type } from 'class-transformer'
import {
    IsArray,
    IsEthereumAddress,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

export type DetectionRequestParams = {
    detectorName: string
}

export class DetectionRequestTraceLog {
    @IsEthereumAddress()
    @IsString()
    address!: string

    @IsString()
    data!: string

    @IsArray()
    @IsString({ each: true })
    topics!: string[]
}

export class DetectionRequestTraceCall {
    @IsEthereumAddress()
    @IsString()
    from!: string

    @IsEthereumAddress()
    @IsString()
    to!: string

    @IsString()
    input!: string

    @IsString()
    output!: string

    @IsString()
    value!: string

    @IsString()
    gasUsed!: string
}

export class DetectionRequestTrace {
    @IsString()
    transactionHash!: string

    @IsNumber()
    blockNumber!: number

    @IsEthereumAddress()
    @IsString()
    from!: string

    @IsEthereumAddress()
    @IsString()
    to!: string

    @IsString()
    value!: string

    @IsString()
    gas!: string

    @IsString()
    gasUsed!: string

    @IsString()
    input!: string

    @IsString()
    output!: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetectionRequestTraceCall)
    calls!: DetectionRequestTraceCall[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetectionRequestTraceLog)
    logs!: DetectionRequestTraceLog[]
}

export class DetectionRequest {
    @IsString()
    detectorName!: string

    @IsString()
    id!: string

    @IsNumber()
    chainId!: number

    @IsString()
    hash!: string

    @IsString()
    protocolName!: string

    @IsEthereumAddress()
    @IsString()
    protocolAddress!: string

    @ValidateNested()
    @Type(() => DetectionRequestTrace)
    trace!: DetectionRequestTrace

    @IsObject()
    @IsOptional()
    additionalData?: Record<string, unknown>
}
