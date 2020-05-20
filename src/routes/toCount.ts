import { Express, Request, Response } from 'express';
import { ECurrency, IItem } from '../db/item.interface';
import axios from 'axios';
import toDigits from '../helpers/toDigits';

interface IValutes {
  Date: Date;
  PreviousDate: Date;
  PreviousURL: string;
  Timestamp: Date;
  Valute: IValute[];
}

interface IValute {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

export default (app: Express) => {
  app.post('/api/toCount', async (req: Request, res: Response) => {
    const body = {
      error: null,
      body: null,
    }
    try {
      const items = <IItem[]>req.body;
      const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      const valutes = <IValutes>response.data;
      const one_usd = valutes.Valute[ECurrency.USD].Value;
      const one_eur = valutes.Valute[ECurrency.EUR].Value;

      let amountRub = 0;
      let amountUsd = 0;
      let amountEur = 0;

      items.forEach((item) => {
        if (item.currency === ECurrency.RUB) {
          amountRub += item.price;
        }
        if (item.currency === ECurrency.EUR) {
          amountEur += item.price;
        }
        if (item.currency === ECurrency.USD) {
          amountUsd += item.price;
        }
      });
      body.body = {
        RUB: amountRub,
        EUR: toDigits(amountEur / one_eur),
        USD: toDigits(amountUsd / one_usd),
      }
      res.send(body);
    } catch (e) {
      body.error = 'Ошибка во время подсчета';
      res.send(body);
    }
  });
}
