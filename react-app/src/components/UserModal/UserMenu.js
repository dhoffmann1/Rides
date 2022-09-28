import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './UserMenu.css';

function UserMenu({ setShowUserModal }) {

  function closeModal() {
    setShowUserModal(false)
  }


  return (
    <div id="usermenu-overall-container">
      <div id="user-text">User</div>
      <div id="user-your-saved-cars" onClick={closeModal}>SavedCars</div>
      <div id="user-your-garage" onClick={closeModal}>Garage</div>
      <div id="user-logout-button"  onClick={closeModal}>
        <LogoutButton />
      </div>
    </div>
  );
}

export default UserMenu
