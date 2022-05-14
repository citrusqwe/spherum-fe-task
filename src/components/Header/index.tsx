import React, { useEffect } from 'react';
import { ReactComponent as BookIcon } from '../../assets/book.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  handleBalanceModal,
  selectCart,
  setBalance,
} from '../../redux/slices/cartSlice';
import './index.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const { balance } = useAppSelector(selectCart);

  const balanceFromStorage = useLocalStorage('bookShopBalance', balance);

  const openModal = () => dispatch(handleBalanceModal(true));

  useEffect(() => {
    dispatch(setBalance(balanceFromStorage));
  }, []);

  return (
    <div className="header">
      <a href="/" className="header__logo">
        <span>
          <BookIcon />
        </span>
        Магазин книг
      </a>
      <div className="header__balance">
        <div>
          <span className="balance-name">Баланс:</span>
          <span className="balance">{balance}</span>
          руб.
        </div>
        <button className="button" onClick={openModal}>
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
