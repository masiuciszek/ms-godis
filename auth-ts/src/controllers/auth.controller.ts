import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('login');
  }
);

export const logoutSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('logout session');
  }
);

export const clearSessionList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('clear sessions');
  }
);

export const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('is admin');
  }
);
