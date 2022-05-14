import React from 'react';
import { ReactComponent as CloseIcon } from '../../assets/delete.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handleBalanceModal, selectCart } from '../../redux/slices/cartSlice';
import './index.scss';

interface ModalProps {
  children: React.ReactNode | React.ReactNode[];
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { balanceModal } = useAppSelector(selectCart);

  const closeModal = () => {
    dispatch(handleBalanceModal(false));
  };

  if (!balanceModal) return <></>;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
