import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import User from '../models/User';
import jsonResponse from '../utils/jsonResponse';
import { IAuthRequest } from '../middleware/authHandler';
import ErrorResponse from '../utils/ErroroResponse';

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    await user.save();
    // res.status(200).json({ success: true, data: user, msg: 'user created' });
    jsonResponse(user, 201, res);
  }
);

export const getMe = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ErrorResponse('Not authorized', 404));
    }

    res.status(200).json({ success: true, data: req.user });
  }
);

export const getAdmin = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, data: req.user });
  }
);
