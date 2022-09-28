import React from 'react';
import { Modal } from '../../context/Modal';
import UserMenu from './UserMenu'

function UserModal({ setShowUserModal }) {


  return (
    <>
      <Modal onClose={() => setShowUserModal(false)}>
        <UserMenu setShowUserModal={setShowUserModal} />
      </Modal>
    </>
  );
}

export default UserModal;
