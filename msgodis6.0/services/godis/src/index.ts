import express from 'express';
import http from 'http';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { socketServer } from './config/socket';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import routes from './routes';
import errorHandlers from './middleware/errorHandlers';

let sockets

(async function startServer() {
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

      const server = http.createServer(app);
      const io = socketServer(server);
      
      sockets = io.sockets

      server.listen(5000, () => console.log('Godisapi listening on port 5000'));
    })
    .catch(error => {
      console.log('TypeORM connection error: ', error, 'Reconnecting in 30s...');
      setTimeout(() => startServer(), 30000);
    });
})();

export {
  sockets,
}

