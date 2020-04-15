import { createConnection } from 'typeorm';

export async function connectToDb() {
  createConnection()
    .then(async connection => {
      process.on('uncaughtException', error => {
        console.log(error);
        process.exit(1);
      });

      process.on('unhandledRejection', error => {
        console.log(error);
        process.exit(1);
      });
    })
    .catch(error => {
      console.log('TypeORM connection error: ', error, 'Reconnecting in 30s...');
      setTimeout(() => connectToDb(), 30000);
    });
}
