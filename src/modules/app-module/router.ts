import { Router } from 'express'

import * as AppController from './controller'

const appRouter = Router()

appRouter.get('/version', AppController.getAppVersion)
appRouter.get('/health-check', AppController.healthCheck)

export { appRouter }
