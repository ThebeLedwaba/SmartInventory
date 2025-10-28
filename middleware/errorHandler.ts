import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let appError = error;

  if (!(appError instanceof AppError)) {
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values((error as any).errors).map((val: any) => val.message);
      appError = new AppError(messages.join(', '), 400);
    }
    // Handle mongoose duplicate key errors
    else if ((error as any).code === 11000) {
      const field = Object.keys((error as any).keyValue)[0];
      appError = new AppError(`${field} already exists`, 400);
    }
    // Handle mongoose cast errors
    else if (error.name === 'CastError') {
      appError = new AppError('Resource not found', 404);
    }
    else {
      appError = new AppError('Internal server error', 500);
    }
  }

  const statusCode = (appError as AppError).statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message: appError.message,
      ...(process.env.NODE_ENV === 'development' && { stack: appError.stack })
    }
  });
};
