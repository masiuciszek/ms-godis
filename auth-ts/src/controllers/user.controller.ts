/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import User from '../models/User';
import { sendTokenResponse } from '../utils/tokenResponse';
import { IAuthRequest } from '../middlewares/authHandler';

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newUser = await User.create(req.body);

    const token = await newUser.generateJwtToken();
    res
      .status(200)
      .json({ success: true, msg: 'user created', data: newUser, token });
    sendTokenResponse(newUser, 200, res);
    // res.send(newUser);
  }
);

// get profile
export const getProfile = asyncHandler(
  async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const loggedInUser = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      msg: `${loggedInUser?.username} profile`,
      data: loggedInUser,
    });
  }
);

// update

// delete
