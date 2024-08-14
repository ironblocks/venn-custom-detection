import { name, version } from '@root/package.json'
import { Request, Response } from 'express'

export const getAppVersion = (req: Request, res: Response) => {
    res.json({ name, version })
}
