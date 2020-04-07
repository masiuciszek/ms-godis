import mongoose from 'mongoose';

// export const mongoUri = 'mongodb://127.0.0.1:27017/msgodis-ts';
const { DB_USER, DB_HOST, DB_PASSWORD } = process.env;
const mongoUri: any = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/admin`;

export default async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MONGO DB IS CONNECTED '.bgMagenta.white.bold);
  } catch (err) {
    console.error(err.message, 'Db error'.bgRed.white);
    process.exit(1);
  }
};
