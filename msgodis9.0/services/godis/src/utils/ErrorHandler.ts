import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './httpErrors';

export const notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send({ message: err.message });
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: err.stack });
};
