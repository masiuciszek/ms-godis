import mongoose, { Schema } from 'mongoose';
import { NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from './Documnets';

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: ['Please fill in your username', true],
    trim: true,
    lowercase: true,
    minlength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: ['Please fill in password', true],
    trim: true,
    minlength: 5,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'producer'],
    default: 'user',
  },
  godisDbId: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sessionsToken: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.pre<IUser>('save', async function(next: NextFunction) {
  const user = this;
  const salt = await bcrypt.genSalt(8);
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function(): Promise<string> {
  const user = this;

  const token = jwt.sign({ id: user._id, role: user.role }, 'secret', {
    expiresIn: '30d',
  });

  user.sessionsToken = user.sessionsToken.concat({ token });
  await user.save();
  return token;
};

UserSchema.methods.mathPasswords = async function(
  password: string
): Promise<boolean> {
  const user = this;

  const isMatchedPassword = await bcrypt.compare(password, user.password);

  return isMatchedPassword;
};
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
