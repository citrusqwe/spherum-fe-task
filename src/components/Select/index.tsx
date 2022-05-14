import React, { useRef, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down.svg';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectBooks,
  selectCurrentCategory,
} from '../../redux/slices/booksSlice';
import { Category } from '../../types';
import './index.scss';

const Select = () => {
  const [currentValue, setCurrentValue] = useState({ id: 0, name: 'Все' });
  const [isOpen, setIsOpen] = useState(false);
  const select = useRef(null);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(selectBooks);

  const handleSelectOpen = () => setIsOpen(!isOpen);
  const closeSelect = () => setIsOpen(false);
  const selectCurrentValue = (c: Category) => {
    dispatch(selectCurrentCategory(c.id));
    setCurrentValue(c);
    closeSelect();
  };

  useOutsideClick(select, closeSelect);

  return (
    <div className="select" ref={select}>
      <div className="select__current" onClick={handleSelectOpen}>
        {currentValue.name}
        <span>
          <ArrowDownIcon />
        </span>
      </div>
      {isOpen && (
        <div className="select__list">
          {categories.map((c: Category) => (
            <button
              key={c.id}
              className="select__option"
              onClick={() => selectCurrentValue(c)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Select);
