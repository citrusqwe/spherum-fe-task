import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Book, Category } from '../../types';
import { getBooks, getCategories } from '../booksAPI';
import { RootState } from '../store';

export interface CounterState {
  books: Book[];
  categories: Category[];
  status: 'idle' | 'loading' | 'failed';
  filters: {
    sortPrice: string;
    categoryId: number;
    search: string;
  };
}

const initialState: CounterState = {
  books: [],
  categories: [],
  status: 'loading',
  filters: {
    sortPrice: 'ASC',
    categoryId: 0,
    search: '',
  },
};

export const getBooksAsync = createAsyncThunk(
  'books/getBooks',
  async (filters: {}) => {
    const response = await getBooks(filters);
    return response.data;
  }
);

export const getCategoriesAsync = createAsyncThunk(
  'books/getCategories',
  async () => {
    const response = await getCategories();
    return response.data;
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    sortByPrice: (state, action) => {
      state.filters.sortPrice = action.payload;
    },
    selectCurrentCategory: (state, action) => {
      state.filters.categoryId = action.payload;
    },
    searchBooks: (state, action) => {
      state.filters.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBooksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.books = action.payload;
      })
      .addCase(getBooksAsync.rejected, (state) => {
        state.status = 'failed';
      });
    builder.addCase(getCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload.concat([{ id: 0, name: 'Все' }]);
    });
  },
});

export const { sortByPrice, selectCurrentCategory, searchBooks } =
  booksSlice.actions;
export const selectBooks = (state: RootState) => state.books;
export default booksSlice.reducer;
