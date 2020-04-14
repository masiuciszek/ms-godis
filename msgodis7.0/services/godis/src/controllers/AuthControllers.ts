import { Response, NextFunction } from 'express';
import { MyRequest } from '../types';
import fetch from 'node-fetch';
import { HTTP401Error } from '../utils/httpErrors';

export async function validateConsumer(
  req: MyRequest,
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
    throw new HTTP401Error('Unauthorized.');
  }
  req.user = response;

  next();
};

export async function validateProducer(
  req: MyRequest,
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

  console.log('Response!!!', response)

  if (!response.isValid || response.role !== 'producer') {
    throw new HTTP401Error('Unauthorized.');
  }
  req.user = response;

  next();
};

export async function validateAdmin(
  req: MyRequest,
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
    throw new HTTP401Error('Unauthorized.');
  }
  req.user = response;

  next();
};
