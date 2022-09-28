import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './UserMenu.css';

function UserMenu({ setShowUserModal, sessionUser }) {

  function closeModal() {
    setShowUserModal(false)
  }

  console.log(sessionUser)


  return (
    <div id="usermenu-overall-container">
      <div id="user-text">Hi, {sessionUser.firstName} {sessionUser.lastName}</div>
      <NavLink id="user-your-saved-cars" to='/cars/your-saved-cars' onClick={closeModal}><i class="fa-regular fa-heart"></i> Saved Cars ({sessionUser.userSavedCars.length})</NavLink>
      <NavLink id="user-your-garage" to='/cars/your-garage' onClick={closeModal}><i class="fa-solid fa-tag"></i> Your Garage ({sessionUser.garageCars.length})</NavLink>
      <div id="user-logout-button"  onClick={closeModal}>
        <LogoutButton />
      </div>
    </div>
  );
}

export default UserMenu
