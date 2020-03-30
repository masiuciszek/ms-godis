/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import asyncHandler from './asyncHandler';
import ErrorResponse from '../utils/ErrorResponse';
import User from '../models/User';
import { IUser, IToken } from '../models/documents';

dotenv.config();
const secret: any = process.env.SECRET_KEY;

export interface IAuthRequest extends Request {
  user: IUser;
  token?: IToken;
}

export const authHandler = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    // const token: any = req.header('Authorization').split(' ')[1];
    let token: any;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ErrorResponse(`Authorization error`, 404));
    }

    const decoded: any = jwt.verify(token, secret);
    const user = await User.findOne({
      _id: decoded.id,
      'tokensSessions:token': token,
    });

    if (!user) {
      return next(new ErrorResponse(`Authorization error`, 404));
    }

    req.user = user;
    req.token = token;

    next();
  }
);

// access for different roles

export const authorizeByRole = (...roles: any) => async (
  req: IAuthRequest | any,
  res: Response,
  next: NextFunction
) => {
  const userRole = await req.user.role;
  if (!roles.includes(userRole)) {
    return next(
      new ErrorResponse(
        `Not able to use this action with role of ${req.user.role}`,
        404
      )
    );
  }
  next();
};
