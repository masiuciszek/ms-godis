/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import ErrorResponse from '../utils/ErroroResponse';
import User from '../models/User';
import jsonResponse from '../utils/jsonResponse';
import { IAuthRequest } from '../middleware/authHandler';

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
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    req.user.sessionsToken = req.user.sessionsToken.filter(
      t => t.token !== req.token
    );
    await req.user.save();
    // res.clearCookie('token')
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: false,
    });
    res
      .status(200)
      .json({ success: true, msg: `user ${req.user.username} is logged out` });
  }
);

export const clearSessionList = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    req.user.sessionsToken = [];
    await req.user.save();
    res.status(200).json({ success: true, msg: `session cleared` });
  }
);

export const validateAdmin = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    let isAdmin = false;
    if (req.user.role === 'admin') {
      isAdmin = true;
    }
    res.status(200).json({ success: true, isAdmin });
  }
);

export const validateToken = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    console.log(req.body);

    res.json({
      isValid: true,
      role: req.user.role,
      godisDbId: req.user.godisDbId,
    });
  }
);
