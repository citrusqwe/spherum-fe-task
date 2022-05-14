import { Book, CartBook } from './types';

export const createCartArray = (array: CartBook[], payload: CartBook) => {
  return array.some((item: CartBook) => item.name === payload.name)
    ? array.map((book: CartBook) =>
        book.name === payload.name
          ? {
              ...book,
              price: book.price + payload.price,
              count: book.count + 1,
            }
          : book
      )
    : [...array, payload];
};

export const handleLocalStorage = (method: string, name: string, val?: any) => {
  if (method === 'get') return JSON.parse(localStorage.getItem(name) as string);
  if (method === 'set')
    localStorage.setItem('bookShopBalance', JSON.stringify(val));
};
