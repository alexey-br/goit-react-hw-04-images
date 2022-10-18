import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, children }) {
  useEffect(() => {
    const handleClose = e => {
      if (e.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWrapper>{children}</ModalWrapper>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element,
};
