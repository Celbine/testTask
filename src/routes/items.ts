import { Express, Request, Response } from 'express';
import { items } from '../db';
import { ECurrency, IItem } from '../db/item.interface';

interface IItemResponseBody {
  error: string;
  body: IItem;
}

export default (app: Express) => {
  app.get('/api/items', (req: Request, res: Response) => {
    const id = Number(req.query.id);
    const currency = String(req.query.currency);

    const body: IItemResponseBody = {
      error: null,
      body: null,
    };


    if(!currency){
      body.error = 'Ошибка валюты';
      return res.send(body);
    }

    const item = items.find((item)=>{
      if(item.id === id) {
        item.currency = currency;
        return item;
      }
    });

    if(item) {
      if (item.quantity > 0) {
        body.body = item;
      } else {
        body.error = 'Товара на складе нет!';
      }
    } else {
      body.error = 'Такого товара не существует!';
    }
    return res.send(body);
  });
}
