import React, { useEffect } from 'react';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { buyBooks, selectCart, setCart } from '../../redux/slices/cartSlice';
import { CartBook } from '../../types';
import CartItem from '../CartItem';
import './index.scss';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, cartLength, cartPrice } = useAppSelector(selectCart);
  const cartFromStorage = useLocalStorage('bookShopCart', cart);

  useEffect(() => {
    dispatch(setCart(cartFromStorage));
  }, []);

  const handleByuing = () => dispatch(buyBooks());

  return (
    <div className="cart">
      <h3 className="cart__title">
        Корзина
        <CartIcon />
      </h3>
      {cartLength > 0 ? (
        <>
          <div className="cart__list">
            {cart?.map((c: CartBook) => (
              <CartItem key={c.id} {...c} />
            ))}
          </div>

          <div className="cart__footer">
            <span>{cartPrice} руб.</span>
            <button className="button" onClick={handleByuing}>
              Купить
            </button>
          </div>
        </>
      ) : (
        <p>Нет добавленных книг</p>
      )}
    </div>
  );
};

export default Cart;
