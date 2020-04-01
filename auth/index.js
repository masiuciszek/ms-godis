const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const { connectDb, connectSQL } = require('./config/db');

connectDb();
connectSQL();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const candyRouter = require('./routes/candies');
const companyRouter = require('./routes/company');
require('colors');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use('/authapi/auth', authRouter);
app.use('/authapi/user', userRouter);
app.use('/goidisapi/godis', candyRouter);
app.use('/goidisapi/company', companyRouter);

// app.get('/',(req,res) => {
//   console.log(req.cookies)
// })

app.listen(port, () =>
  console.log('Auth service listening on port 4000'.bgMagenta.white)
);
