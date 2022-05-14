import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as SortIcon } from '../../assets/sort.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  searchBooks,
  selectBooks,
  sortByPrice,
} from '../../redux/slices/booksSlice';
import Select from '../Select';
import './index.scss';

const filter = new Map([
  ['ASC', 'DESC'],
  ['DESC', 'ASC'],
]);

const Filters = () => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();
  const {
    filters: { sortPrice },
  } = useAppSelector(selectBooks);

  const handleSortToggle = () => {
    dispatch(sortByPrice(filter.get(sortPrice)));
  };

  const searchBooksByValue = () => {
    dispatch(searchBooks(searchInput));
  };

  return (
    <div className="filters">
      <div className="filters__form form">
        <div className="form__header">
          <button className="form__sort" onClick={handleSortToggle}>
            Сортировать по цене
            <span>
              <SortIcon />
            </span>
          </button>
          <Select />
        </div>
        <div className="form__search">
          <button onClick={searchBooksByValue}>
            <SearchIcon />
          </button>
          <input
            placeholder="Введите название книги"
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') searchBooksByValue();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Filters);
