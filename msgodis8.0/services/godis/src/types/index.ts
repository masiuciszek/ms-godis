import { Request } from 'express';

interface IUser {
  godisDbId: number,
  isValid: boolean,
  role: string,
};

export interface MyRequest extends Request {
  user: IUser, 
};

export interface ProductObject {
  id: number,
  qty: number
};
