import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { useAppDispatch } from '../../redux/hooks';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { CartBook } from '../../types';
import './index.scss';

const CartItem: React.FC<CartBook> = ({ id, name, price, count }) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-item">
      <div>
        <h5 className="cart-item__title">{name}</h5>
        <span className="cart-item__count">{count} шт.</span>
        <span className="cart-item__price">{price} руб.</span>
      </div>
      <button className="cart-item__delete" onClick={handleRemoveFromCart}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default React.memo(CartItem);
