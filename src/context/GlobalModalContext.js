import React, { createContext, useContext, useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import { ModalProvider } from './context/GlobalModalContext';
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ isOpen: false, message: '' });

  const openModal = (msg) => setModal({ isOpen: true, message: msg });
  const closeModal = () => setModal({ isOpen: false, message: '' });
const { openModal } = useModal();

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ConfirmationModal message={modal.message} isOpen={modal.isOpen} onClose={closeModal} />
    </ModalContext.Provider>
openModal("Score submitted successfully!");
<ModalProvider>
  <App />
</ModalProvider>

  );
};
