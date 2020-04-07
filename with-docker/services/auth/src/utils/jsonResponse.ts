/* eslint-disable import/no-unresolved */
import { Response } from 'express';
import { IUser } from '../models/Documnets';

interface IOptions {
  expires: Date;
  httpOnly: boolean;
}

const jsonResponse = async (user: IUser, statusCode: number, res: Response) => {
  const token = await user.generateAuthToken();

  const options: IOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: false,
  };

  res
    .status(statusCode)
    .cookie('token', token, options) // name of token, token value , adn options
    .json({ success: true, token });
};

export default jsonResponse;
