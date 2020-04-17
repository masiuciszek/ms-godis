import express from 'express';
import http from 'http';
import 'reflect-metadata';
import { connectToDb } from './config/db';
import { socketServer } from './config/socket';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import routes from './routes';
import errorHandlers from './middleware/errorHandlers';

const app = express();

applyMiddleware(middleware, app);
applyRoutes(routes, app);
applyMiddleware(errorHandlers, app);

const server = http.createServer(app);
export const io = socketServer(server);

connectToDb();

server.listen(5000, () => console.log('Godisapi listening on port 5000'));
