import { Router } from 'express'

/* IMPORT ALL YOUR ROUTERS */
import { appRouter } from '@/modules'

const router = Router()

/* ASSIGN EACH ROUTER TO DEDICATED SUBROUTE */
router.use('/', appRouter)

export { router }
