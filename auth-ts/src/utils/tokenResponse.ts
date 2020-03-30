/* eslint-disable import/no-unresolved */
import { Response } from 'express';
import { IUser } from '../models/documents';

interface ICookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
}
//
// genetarte token and send cookie
export const sendTokenResponse = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const token = await user.generateJwtToken();

  const options: ICookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
};
