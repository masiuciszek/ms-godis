/* eslint-disable import/no-unresolved */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import asyncHandler from './asyncHandler';
import { IAuthRequest } from './authHandler';
import ErrorResponse from '../utils/ErrorResponse';

dotenv.config();
const secret: any = process.env.SECRET_KEY;

export const roleHandler = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    // const loggedInUser = req.user;
    const token: any = req.header('Authorization')?.split(' ')[1];

    const decoded: any = jwt.verify(token, secret);
    console.log('role handler'.bgGreen.white.bold, decoded);
    if (decoded.role !== 'admin') {
      return next(new ErrorResponse(`only for admins`, 404));
    }
    next();
  }
);
