import { Express, Request, Response } from 'express';
import { items } from '../db';

export default (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.render('home', {items});
  })
}
