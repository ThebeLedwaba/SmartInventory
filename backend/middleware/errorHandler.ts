import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};
