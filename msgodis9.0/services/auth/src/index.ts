/* eslint-disable import/no-unresolved */
import express, { Application } from 'express';
import 'colors';
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
import { router as authRouter } from './routes/auth';
import { router as userRouter } from './routes/user';
import db from './config/db';
import { errorHandler } from './middleware/errorHandler';

db();
const app: Application = express();

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));
app.use('/authapi/auth', authRouter);
app.use('/authapi/user', userRouter);
app.use('/authapi/test', (req, res) => {
  res.send('test')
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`port is running on port ${port}`.bgWhite.black.bold);
});
