import React from 'react';
import { Modal } from '../../context/Modal';
import Menu from './Menu'

function MenuModal({ setShowMenuModal }) {


  return (
    <>
      <Modal onClose={() => setShowMenuModal(false)}>
        <Menu setShowMenuModal={setShowMenuModal} />
      </Modal>
    </>
  );
}

export default MenuModal;
