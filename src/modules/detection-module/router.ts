import { Router } from 'express'

import * as DetectionController from './controller'

const detectionRouter = Router()

detectionRouter.post('/', DetectionController.detect)

export { detectionRouter }
