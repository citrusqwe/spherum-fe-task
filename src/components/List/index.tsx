import React from 'react';
import { Loader, ListItem } from '../';
import { selectBooks } from '../../redux/slices/booksSlice';
import { useAppSelector } from '../../redux/hooks';
import { Book } from '../../types';
import './index.scss';

const List = () => {
  const { books, status } = useAppSelector(selectBooks);

  if (status === 'loading') return <Loader />;

  return (
    <div className="list__body">
      {books.map((b: Book) => (
        <ListItem key={b.name} {...b} />
      ))}
    </div>
  );
};

export default List;
