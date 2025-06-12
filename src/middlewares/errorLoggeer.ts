import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`Error on ${req.method} ${req.originalUrl} - ${err.message}`)
  res.status(500).json({ message: 'Internal Server Error' })
}
