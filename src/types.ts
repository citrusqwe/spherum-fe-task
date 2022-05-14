export type Book = {
  name: string;
  authorName: string;
  price: number;
  coverUrl: string;
  categoryId: number;
};

export type CartBook = {
  id: string;
  name: string;
  price: number;
  count: number;
};

export type Category = {
  id: number;
  name: string;
};
