import { DetectionRequest, DetectionResponse } from './dtos'

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
    public static detect(request: DetectionRequest): DetectionResponse {
        /**
         * For this "Hello World" style boilerplate
         * we're mocking detection results using
         * some random value
         */
        const detectionResult = Math.random() < 0.5

        /**
         * Wrap our response in a `DetectionResponse` object
         */
        return new DetectionResponse({
            request,
            detectionInfo: {
                detected: detectionResult,
            },
        })
    }
}
