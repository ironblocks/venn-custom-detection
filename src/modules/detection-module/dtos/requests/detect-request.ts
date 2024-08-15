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

export type DetectorRequestParams = {
    detectorName: string
}

export class DetectRequestTraceLog {
    @IsEthereumAddress()
    @IsString()
    address!: string

    @IsString()
    data!: string

    @IsArray()
    @IsString({ each: true })
    topics!: string[]
}

export class DetectRequestTraceCall {
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

export class DetectRequestTrace {
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
    @Type(() => DetectRequestTraceCall)
    calls!: DetectRequestTraceCall[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetectRequestTraceLog)
    logs!: DetectRequestTraceLog[]
}

export class DetectRequest {
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
    @Type(() => DetectRequestTrace)
    trace!: DetectRequestTrace

    @IsObject()
    @IsOptional()
    additionalData?: Record<string, unknown>
}
