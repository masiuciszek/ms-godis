/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';

import { sendTokenResponse } from '../utils/tokenResponse';
import { IAuthRequest } from '../middlewares/authHandler';

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse(`please fill in email and password`, 404));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse(`something went wrong, can't log in`, 404));
    }

    const isMatched = await user.validatePassword(password);

    if (!isMatched) {
      return next(new ErrorResponse(`something went wrong, can't log in`, 404));
    }

    sendTokenResponse(user, 200, res);
  }
);

// testing for candy company profilepage
export const companyProfile = asyncHandler(
  async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      msg: `user is with role ${req.user.role}`,
      data: user,
    });
  }
);
// testing for new admin middleware
export const getAdminProfile = asyncHandler(
  async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      msg: `user is with role ${req.user.role}`,
      data: user,
    });
  }
);

// logout
export const logout = asyncHandler(
  async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // res.clearCookie('token');
    // res.send('clear cookie');
    // res.status(200).send();

    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      msg: `${req.user.username} is now logged out`,
      loggedOut: true,
    });
  }
);
