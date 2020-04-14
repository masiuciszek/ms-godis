/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable import/no-unresolved */
import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import { asyncHandler } from '../middleware/asyncHandler';
import User from '../models/User';
import jsonResponse from '../utils/jsonResponse';
import { IAuthRequest } from '../middleware/authHandler';
import ErrorResponse from '../utils/ErroroResponse';
import getToken from '../config/token';

async function sendData(url: string, data: any) {
  const tokenObj = await getToken;
  const token = tokenObj.token;
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    if (user.role === 'user') {
      const resData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        adress: req.body.adress,
      };

      sendData('http://godisapi:5000/godisapi/admin/consumer', resData)
        .then(response => {
          if (response.status !== 200) {
            throw Error('didnt work')
          } else {
            return response.json()
          }
        })
        .then(async response => {
          user.godisDbId = response.consumer.id;
          await user.save();
          console.log(response);
        })
        .catch(err => console.log(err));
    }

    if (user.role === 'producer') {
      const resData = { name: user.username };
      sendData('http://godisapi:5000/godisapi/admin/producer', resData)
        .then(response => {
          if (response.status !== 200) {
            throw Error('didnt work')
          } else {
            return response.json()
          }
        })
        .then(async response => {
          user.godisDbId = response.producer.id;
          await user.save();
          console.log(response);
        })
        .catch(err => console.log(err));
    }

    // await user.save();
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
    // res.send('ddd');
    res.status(200).json({ success: true, data: req.user });
  }
);
