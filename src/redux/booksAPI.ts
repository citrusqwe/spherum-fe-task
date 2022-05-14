import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export function getBooks(filters = {}) {
  try {
    const books = instance.post('/books', { filters });
    return books;
  } catch (e) {
    throw e;
  }
}

export function getCategories() {
  try {
    const categories = instance.get('/books/categories');
    return categories;
  } catch (e) {
    throw e;
  }
}
