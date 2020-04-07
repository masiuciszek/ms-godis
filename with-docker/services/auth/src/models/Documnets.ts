import { Document } from 'mongoose';


enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PRODUCER = 'PRODUCER'
}
export interface IToken {
  token: string;
}
export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  godisDbId: number;
  createdAt: Date;
  sessionsToken: IToken[];
  generateAuthToken: () => Promise<string>;
  mathPasswords: (password: string) => Promise<boolean>;
}
