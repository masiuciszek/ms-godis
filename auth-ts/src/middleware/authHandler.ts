/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { IToken, IUser } from '../models/Documnets';
import ErrorResponse from '../utils/ErroroResponse';
import { asyncHandler } from './asyncHandler';
import User from '../models/User';

dotenv.config();
const secret: any = process.env.JWT_SECRET;

export interface IAuthRequest extends Request {
  user: IUser;
  token: IToken | any;
}

export const authHandler = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    // let token: any;
    //
    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith('Bearer')
    // ) {
    //   token = req.headers.authorization.split(' ')[1];
    // } else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }
    const token:any =
  req.header('Authorization')?.split(' ')[1] || req.header('x-auth-token');

    if (!token) {
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
    const decoded: any = jwt.verify(token, secret);

    try {
      const user = await User.findOne({
        _id: decoded.id,
        'sessionsToken.token': token,
      });
      if (!user) {
        return next(
          new ErrorResponse('Not authorized to access this route', 401)
        );
      }
      req.user = user;
      req.token = token;
      // console.log(decoded);
      // console.log(user);
      next();
    } catch (err) {
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
  }
);
