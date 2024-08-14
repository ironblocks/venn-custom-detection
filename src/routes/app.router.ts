import { Router } from 'express'

import { AppController } from '@/controllers'

const appRouter = Router()

appRouter.get('/version', AppController.getAppVersion)
appRouter.get('/health-check', AppController.healthCheck)

export { appRouter }
