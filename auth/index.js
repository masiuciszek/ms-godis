const express = require('express');

const cookieParser = require('cookie-parser');
const { connectDb } = require('./config/db');

connectDb();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
require('colors');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use('/authapi/auth', authRouter);
app.use('/authapi/user', userRouter);

app.listen(port, () =>
  console.log('Auth service listening on port 4000'.bgMagenta.white)
);
