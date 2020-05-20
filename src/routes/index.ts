import { Express } from 'express';
import home from './home';
import items from './items';
import toCount from './toCount';

export const Routes = (app: Express) => {
  home(app);
  items(app);
  toCount(app);
}
