import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import ErrorResponse from '../utils/ErroroResponse';
import User from '../models/User';
import jsonResponse from '../utils/jsonResponse';

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new ErrorResponse(`password and username is required`, 404));
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(new ErrorResponse(`invalid credentials`, 404));
    }

    const isMatched = await user.mathPasswords(password);
    if (!isMatched) {
      return next(new ErrorResponse(`invalid credentials`, 404));
    }
    jsonResponse(user, 200, res);
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
