import React, { useEffect } from 'react';
import { BalanceForm, Cart, Filters, Header, List, Modal } from '../components';
import {
  getBooksAsync,
  getCategoriesAsync,
  selectBooks,
} from '../redux/slices/booksSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ToastContainer, toast } from 'react-toastify';
import { clearMessage, selectCart } from '../redux/slices/cartSlice';
import 'react-toastify/dist/ReactToastify.css';

const messages = {
  error: 'У вас недостаточно средств для совершения покупки',
  success: 'Вы успешно совершили покупку',
};

const Home = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(selectBooks);
  const { message } = useAppSelector(selectCart);

  useEffect(() => {
    Promise.all([
      dispatch(getBooksAsync(filters)),
      dispatch(getCategoriesAsync()),
    ]);
  }, [filters]);

  useEffect(() => {
    if (message === 'error') toast.error(messages[message]);
    if (message === 'success') toast.success(messages[message]);
    dispatch(clearMessage());
  }, [message]);

  return (
    <div className="container">
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      <Header />
      <div className="wrapper">
        <div className="list">
          <Filters />
          <List />
        </div>
        <Cart />
      </div>
      <Modal>
        <BalanceForm />
      </Modal>
    </div>
  );
};

export default Home;
