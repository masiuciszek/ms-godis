const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const morgan = require('morgan');
const { connectDb } = require('./config/db');

connectDb();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
require('colors');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use('/authapi/auth', authRouter);
app.use('/authapi/user', userRouter);

// app.get('/gettoken', (req, res) => {
//   fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       res.send(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.listen(port, () =>
  console.log('Auth service listening on port 4000'.bgMagenta.white)
);
