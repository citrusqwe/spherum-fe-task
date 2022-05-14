import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { handleBalanceModal, setBalance } from '../../redux/slices/cartSlice';
import { handleLocalStorage } from '../../utils';
import './index.scss';

const BalanceForm = () => {
  const [balanceInput, setBalanceInput] = useState(0);
  const dispatch = useAppDispatch();
  const balanceFromStorage = handleLocalStorage('get', 'bookShopBalance');

  const rechargeBalance = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (balanceInput) {
      const newBalance = balanceFromStorage + balanceInput;
      handleLocalStorage('set', 'bookShopBalance', newBalance);
      dispatch(setBalance(newBalance));
      dispatch(handleBalanceModal(false));
    }
  };

  return (
    <form className="balance__form" onSubmit={(e) => rechargeBalance(e)}>
      <h3>Пополнение баланса</h3>
      <input
        placeholder="Введите сумму"
        type="number"
        onChange={(e) => setBalanceInput(+e.target.value)}
      />
      <button className="button" type="submit">
        Пополнить
      </button>
    </form>
  );
};

export default BalanceForm;
