import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import routes from './routes';
import errorHandlers from './middleware/errorHandlers';

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

    const app = express();

    applyMiddleware(middleware, app);
    applyRoutes(routes, app);
    applyMiddleware(errorHandlers, app);

    app.listen(5000, () => console.log('Godisapi listening on port 5000'));
  })
  .catch(error => {
    console.log('TypeORM connection error: ', error);
  });
