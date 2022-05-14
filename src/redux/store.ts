import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
