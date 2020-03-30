import { Document } from 'mongoose';


enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
export interface IToken {
  token: string;
}
export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  createdAt: Date;
  sessionsToken: IToken[];
  generateAuthToken: () => Promise<string>;
  mathPasswords: (password: string) => Promise<boolean>;
}
