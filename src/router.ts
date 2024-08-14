import { Router } from 'express'

import { appRouter } from '@/routes'

const router = Router()

router.use('/', appRouter)

export { router }
