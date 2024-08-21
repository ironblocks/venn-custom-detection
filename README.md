![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

# Venn Custom Detector boilerplate
A boilerplate for getting started with Venn as a Security Provider. Use is as a starting point to build your own custom detectors on Venn Network.

> 📚 [What is Venn?](https://docs.venn.build/)

## Table of Contents
- [Introduction](#venn-custom-detector-boilerplate)
- [Quick Start](#quick-start)
- [Description](#description)
- [Usage:](#usage)
    - [Own implementation](#own-implementation)
    - [Env](#env)
    - [Development](#development)
    - [Production](#production)

## ✨ Quick start
1. Clone or fork this repo and install dependencies using `yarn install` _(or `npm install`)_
2. Find the detection service under: `src/modules/detection-module/service.ts`

    ```ts
    import { plainToInstance } from 'class-transformer'
    import { DetectorResponse, DetectRequest } from './dtos'

    /**
     * DetectionService
     *
     * Implements a `detect` method that receives an enriched view of an
     * EVM compatible transaction (i.e. `DetectionRequest`)
     * and returns a `DetectionResponse`
     *
     * API Reference:
     * https://github.com/ironblocks/venn-custom-detection/blob/master/docs/requests-responses.docs.md
     */
    export class DetectionService {
        /**
         * Update this implementation code to insepct the `DetectionRequest`
         * based on your custom business logic
         */
        public static detect(request: DetectRequest): DetectorResponse {
            
            /**
             * For this "Hello World" style boilerplate
             * we're mocking detection results using
             * some random value
             */
            const detectionResult = Math.random() < 0.5;


            /**
             * Wrap our response in a `DetectionResponse` object
             */
            return new DetectionResponse({
                requestRef: request,
                detected: detectionResponse
            });
        }
    }
    ```

3. Implement your own logic in the `detect` method
4. Run `yarn dev` _(or `npm run dev`)_
5. That's it! Your custom detector service is now ready to inspect transaction

## 📦 What's inside?
This boilerplate is built using `Express.js`, and written in `TypeScript` using `NodeJS`.  
You can use it as-is by adding your own security logic to it, or as a reference point when using a different programming language.

**Notes on the API**
1. Venn expects your detector to be available on port `80`
2. Venn expects your detector to be available at: `$HOST/detect/:detectorName`
3. Your detector will get a `DetectionRequest`, and is expected to respond with a `DetectionResponse`

See our [API Reference](https://github.com/ironblocks/venn-custom-detection/blob/master/docs/requests-responses.docs.md) for more information.

## 🛠️ Local Development

**Environment Setup**

Create a `.env` file with:

```bash
PORT=3000
HOST=localhost
LOG_LEVEL=debug
```

**Runing In Dev Mode**
```bash
yarn        # or npm install
yarn dev    # or npm run dev
```

## 🚀 Deploy To Production

**Manual Build**

```bash
yarn build      # or npm run build
yarn start      # or npm run start
```


**Using Docker**
```bash
docker build -f Dockerfile . -t my-custom-detector
```

