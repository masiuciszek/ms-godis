import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import User from '../models/User';
import jsonResponse from '../utils/jsonResponse';

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    await user.save();
    // res.status(200).json({ success: true, data: user, msg: 'user created' });
    jsonResponse(user, 201, res);
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
