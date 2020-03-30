import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('register');
  }
);

export const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('getme');
  }
);

export const getAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('get admin');
  }
);
