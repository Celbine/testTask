export interface IItem {
  id: number,
  img: string,
  quantity: number,
  name: string,
  currency?: ECurrency | string,
  price: number,
}
export enum ECurrency {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR'
}
