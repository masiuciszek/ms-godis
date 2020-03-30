const mongoose = require('mongoose');
const mysql = require('mysql2');

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/masiu-godis', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('mongo db is on and connected '.bgGreen.white.bold);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'marcell',
  password: 'rootroot',
  database: 'godis',
  multipleStatements: true,
});

function connectSQL() {
  connection.connect(err => {
    if (err) throw new Error(err);
    console.log('mySql is connected'.bgBlue.white.bold);
  });
}

async function connectToDb() {
  await mongoose
    .connect('mongodb://authdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    })
    .then(() => console.log('connection to db working'.bgGreen));
}

module.exports = { connectToDb, connectDb, connectSQL, connection };
