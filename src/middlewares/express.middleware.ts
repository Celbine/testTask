import express, { Express } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import * as path from 'path';
import { errorHandler } from './errorHandler.middleware';
import { Routes } from '../routes';

export default (app: Express): void => {
  app.set('views', process.cwd() + '/views');
  app.set('view engine', 'pug');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(process.cwd(), 'public')));

  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler);
  }

  Routes(app);
}
