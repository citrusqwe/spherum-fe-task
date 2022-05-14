import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice';
import { Book } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import './index.scss';

const ListItem: React.FC<Book> = ({ name, authorName, price, coverUrl }) => {
  const dispatch = useAppDispatch();

  const hadndleAddToCart = () => {
    const item = { id: uuidv4(), name, price, count: 1 };
    dispatch(addToCart(item));
  };

  return (
    <div className="item">
      <img src={coverUrl} alt="book" className="item__img" />
      <div className="item__body">
        <h3 className="item__title">{name}</h3>
        <span className="item__author">{authorName}</span>
        <div className="item__footer">
          <span>
            <span>{price}</span>
            руб.
          </span>
          <button className="item__button button" onClick={hadndleAddToCart}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ListItem);
