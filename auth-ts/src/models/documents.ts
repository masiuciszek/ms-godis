import { Document } from 'mongoose';

export enum UserRole {
  ADMIN  = 'ADMIN',
  USER  = 'USER',
}

export interface IToken {
  token: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  tokensSessions: IToken[];
  validatePassword: (inputPassword:string) => Promise<boolean>
  generateJwtToken: () => Promise<string>
}



