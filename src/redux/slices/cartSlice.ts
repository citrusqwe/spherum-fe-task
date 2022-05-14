import { createSlice } from '@reduxjs/toolkit';
import { CartBook } from '../../types';
import { RootState } from '../store';
import { createCartArray } from '../../utils';

export interface CounterState {
  balance: number;
  cart: CartBook[];
  cartLength: number;
  cartPrice: number;
  message: string;
  balanceModal: boolean;
}

const initialState: CounterState = {
  balance: 15000,
  cart: [],
  cartLength: 0,
  cartPrice: 0,
  message: '',
  balanceModal: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartArray = createCartArray(state.cart, action.payload);
      state.cart = cartArray;
      state.cartLength = cartArray.length;
      state.cartPrice = cartArray.reduce(
        (prev: number, item: CartBook) => prev + item.price,
        0
      );
    },
    removeFromCart: (state, action) => {
      const cartArray = state.cart.filter(
        (item: CartBook) => item.id !== action.payload
      );
      state.cart = cartArray;
      state.cartLength = cartArray.length;
      state.cartPrice = cartArray.reduce(
        (prev: number, item: CartBook) => prev + item.price,
        0
      );
    },
    buyBooks: (state) => {
      if (state.cartPrice > state.balance) {
        state.message = 'error';
        return;
      }
      state.balance = state.balance - state.cartPrice;
      state.message = 'success';
      state.cart = [];
      state.cartLength = 0;
      state.cartPrice = 0;
    },
    clearMessage: (state) => {
      state.message = '';
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setCart: (state, action) => {
      const cartArray = action.payload;
      state.cart = cartArray;
      state.cartLength = cartArray.length;
      state.cartPrice = cartArray.reduce(
        (prev: number, item: CartBook) => prev + item.price,
        0
      );
    },
    handleBalanceModal: (state, action) => {
      state.balanceModal = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  buyBooks,
  clearMessage,
  setBalance,
  setCart,
  handleBalanceModal,
} = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
