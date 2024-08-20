![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

# Venn Custom Detector boilerplate
Template for easy integration with Venn Security Network as Security Provider. Venn comes with own detectors built-in, but it is also allowed to Security Providers to write own security logic.

[What is Venn?](https://docs.venn.build/)

## Table of Contents
- [Introduction](#venn-custom-detector-boilerplate)
- [Quick Start](#quick-start)
- [Description](#description)
- [Usage:](#usage)
    - [Own implementation](#own-implementation)
    - [Env](#env)
    - [Development](#development)
    - [Production](#production)

## Quick start
1. Clone this repo
2. Open `src/modules/detection-module/service.ts`
```ts
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
```
3. Implement own `detect` method that will accept `DetectRequest` and return `DetectorResponse`. More detailed info about requests-responses structure can be find here. INSERT LINK
4. Run `yarn dev`
5. That's it! Custom detector service is up and running in dev mode.

## Description
Template is pre-configured as `Node.js` + `Express.js` web-service, that can be used to write own security logic. Main goal of this repo is to ease this process.

Templates includes:
- `eslint` configuration
- `prettier` configuration
- `jest` testing setup
- `Dockerfile`
- `ErrorHandler` for processing errors
- `class-validator` validations
- `logger` configured with log levels and timestamp. Log example:
```bash
[2024-08-16 11:18:31] debug: detect request started. Request id: unique-id
```


## Usage
### Own implementation
As an example you can find `src/modules/detection-module` where your security logic should be implemented.

**Crucial moments:**
- Custom detector **endpoint** is standardized and **ALWAYS** should be `$BASE_URL/detect/:detectorName`
- Custom detector **request and response payloads** are **immutable** and should remain as they declared

### Env
`.env` file may contain following variables. Can be extended to match your needs.
```
PORT=3000
HOST=localhost
LOG_LEVEL=debug
```

### Development
Service is using `nodemon`
```bash
yarn        # install dependencies
yarn dev    # start dev server
```

### Production
You can build production release in to ways:
1. **Regular build**
```bash
yarn build      # compiling typescript to javascript
yarn preview    # test start of production server
```
2. **Docker build**
```bash
docker build -f Dockerfile . -t venn-custom-detector-svc # creating docker image
```


