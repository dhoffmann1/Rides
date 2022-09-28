import React from "react";
import { NavLink } from "react-router-dom";
import './Menu.css';

function Menu({ setShowMenuModal }) {

  function closeModal() {
    setShowMenuModal(false)
  }

  return (
    <div id="menu-overall-container">
      <div id="menu-menu-text">Menu</div>
      <div id="menu-buttons">
        <NavLink id="menu-sign-in-button" exact to='/login' onClick={closeModal}>Sign in</NavLink>
        <NavLink id="menu-create-an-account-button" exact to='/sign-up' onClick={closeModal}>Create an account</NavLink>
      </div>
    </div>
  );



}

export default Menu
