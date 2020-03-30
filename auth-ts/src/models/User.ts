/* eslint-disable import/no-unresolved */
import mongoose, { Schema } from 'mongoose';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import * as dotenv from 'dotenv';
import { IUser } from './documents';

dotenv.config();

const secret: any = process.env.SECRET_KEY;

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'please enter a valid username'],
      minlength: 5,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'please enter a valid email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'please fill in a valid password'],
      minlength: 5,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tokensSessions: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  }
  // { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// user middleware
// hash password when save to database
UserSchema.pre<IUser>('save', async function(next: NextFunction) {
  const user = this;
  const salt = await bcryptjs.genSalt(8);
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, salt);
  }

  next();
});

UserSchema.methods.generateJwtToken = async function(): Promise<string> {
  const user = this;

  const token = jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn: '30d',
  });

  // user.tokensSessions = user.tokensSessions.concat({ token });

  await user.save();
  return token;
};

UserSchema.methods.validatePassword = async function(
  inputPassword: string
): Promise<boolean> {
  const user = this;

  const isMatched = await bcryptjs.compare(inputPassword, user.password);

  return isMatched;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
