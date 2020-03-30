/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/ErrorResponse';

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let error = { ...err };

  if (err.message === 'please fill in email and password') {
    const message = 'please fill in email and password';
    error = new ErrorResponse(message, 404);
  }

  if (err.kind === 'minlength' && err.name === 'ValidatorError') {
    const message = 'Username with at least 6 characters';
    error = new ErrorResponse(message, 404);
  }

  if (err.message === "something went wrong, can't log in") {
    const message = 'not correct values';
    error = new ErrorResponse(message, 404);
  }
  if (err.name === 'JsonWebTokenError') {
    const message = 'token expired';
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = 'no duplicate values';
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'SERVER ERROR' });
  next();
};
