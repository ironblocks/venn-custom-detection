# Custom detector service requests and responses
This document provides detailed explanations about how working with API data is structured in this web-service.

## Table of Contents
- [Introduction](#custom-detector-service-requests-and-responses)
- [Description](#description)
- [Requests:](#requests)
    - [Request instance](#request-instance)
    - [Request validation](#request-validation)
- [Responses:](#responses)
    - [Response structure](#response-structure)
    - [Response usage](#response-usage)

## Description
This service request and responses structure is rely on `class-transformer` and `class-validator` packages.

## Requests
Each request is created as a class with applied **decorators validators** from `class-validator`.
These decorators will be used during **validation** process.

Example:
```ts
import { IsString, IsNumber, IsEthereumAddress, IsOptional } from 'class-validator'

export class ExampleRequest {
    @IsString()
    @IsEthereumAddress()
    address: string

    @IsNumber()
    nonce: number

    @IsString()
    @IsOptional()
    optionalData?: string
}
```
### Request instance
Creating new request object is performed using `plainToInstance` function from `class-transformer`

Example:
```ts
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'

import { ExampleRequest } from './dtos'

export const exampleRequestHandler = (req: Request, resp: Response) => {
    const request = plainToInstance(ExampleRequest, req.body)
}
```

### Request validation
Validation is performed with `validate` function from `class-validator` that wrapped with errors formatter from `src/helpers/validation.helpers.ts`

Example:
```ts
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'

import { ExampleRequest } from './dtos'
import { validateRequest } from '@/helpers'

export const exampleRequestHandler = async (req: Request, resp: Response) => {
    const request = plainToInstance(ExampleRequest, req.body)

    try {
        await validateRequest(request) // will throw BadRequest error in case validation is failed
    } catch (error) {
        /* handle error */
    }
}
```

`validateRequest` will join all validation errors in one error message, so you can see every invalid field, **even nested ones**. 

Error message example:
```
Failed to parse request: 
'trace.from' not passed the validation: '"not valid address"' isn't a valid value. from must be an Ethereum address
'trace.to' not passed the validation: '"not valid as well"' isn't a valid value. to must be an Ethereum address
'trace.logs.0.address' not passed the validation: '"not address deeply nested"' isn't a valid value. address must be an Ethereum address
```

## Responses
### Response structure
Each response is represented by 3 entities:
1. **Plain response class**
```ts
export class ExampleResponse {
    message?: string
    address: string
    isOk: boolean
    sensetiveData: string
}
```
2. **Response DTO** with `Expose` and `Exclude` decorators applied in order to separate inner data layer from response data layer and safely manage what fields should be included to response.
``` ts
import { Expose, Exclude } from 'class-transformer'

export class ExampleResponseDTO {
    @Expose()
    message?: string

    @Expose()
    address: string

    @Expose()
    isOk: boolean

    @Exclude()
    sensetiveData: string
}
```
3. **Response trasformer** that transforms plain response to response DTO
```ts
import { plainToInstance } from 'class-transformer'

export const toExampleResponse = (exampleEntity: ExampleResponse): ExampleResponseDTO => {
    return plainToInstance(ExampleResponseDTO, exampleEntity)
}
```

### Response usage
Usage example in controller

```ts
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'

import { ExampleRequest, ExampleResponse, toExampleResponse } from './dtos'
import { ExampleService } from '@/modules/example-module'
import { validateRequest, ErrorHandler } from '@/helpers'

export const exampleRequestHandler = async (req: Request, resp: Response) => {
    /* creating request instance */
    const request = plainToInstance(ExampleRequest, req.body)

    try {
        /* validating request */
        await validateRequest(request)

        /* getting data */
        const data: ExampleResponse = await ExampleService.getData(request)

        /* transforming data */
        resp.json(toExampleResponse(data))
    } catch (error) {
        /* handling errors */
        ErrorHandler.processApiError(resp, error)
    }
}
```