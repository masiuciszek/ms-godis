import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import { HTTP400Error } from '../utils/httpErrors';

export async function validateConsumer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  const request = await fetch(
    'http://authapi:4000/authapi/auth/validateToken',
    {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }
  );

  const response = await request.json();

  if (!response.isValid || response.role !== 'user') {
    throw new HTTP400Error('Unauthorized.');
  }

  req.headers.user = response;

  next();
};

export async function validateProducer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  const request = await fetch(
    'http://authapi:4000/authapi/auth/validateToken',
    {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }
  );

  const response = await request.json();

  if (!response.isValid || response.role !== 'producer') {
    throw new HTTP400Error('Unauthorized.');
  }

  req.headers.user = response;

  next();
};

export async function validateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  const request = await fetch(
    'http://authapi:4000/authapi/auth/validateToken',
    {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }
  );

  const response = await request.json();

  if (!response.isValid || response.role !== 'admin') {
    throw new HTTP400Error('Unauthorized.');
  }

  req.headers.user = response;

  next();
};
