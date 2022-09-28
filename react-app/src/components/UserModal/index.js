import React from 'react';
import { Modal } from '../../context/Modal';
import UserMenu from './UserMenu'

function UserModal({ setShowUserModal, sessionUser }) {


  return (
    <>
      <Modal onClose={() => setShowUserModal(false)}>
        <UserMenu setShowUserModal={setShowUserModal} sessionUser={sessionUser} />
      </Modal>
    </>
  );
}

export default UserModal;
