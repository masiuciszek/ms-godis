/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-const */
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/ErroroResponse';

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let error = { ...err };

  console.log(Object.entries(err));
  if (err.statusCode === 404) {
    const message = 'invalid credentials';
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    const message = 'No duplicate values';
    error = new ErrorResponse(message, 404);
  }
  if (err.message === 'jwt malformed' || err.name === 'JsonWebTokenError') {
    const message = 'Authorization error';
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'SERVER ERROR' });
  next();
};
