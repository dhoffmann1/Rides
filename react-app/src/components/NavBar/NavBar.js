import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MenuModal from '../MenuModal';
import UserModal from '../UserModal';
import ridesLogo from './rides-logo.png';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink id='navbar-sell-your-car-login-navlink' exact to='/cars/new'><div id='navbar-sell-your-car'>Sell Your Car</div></NavLink>
        <div id='navbar-user-dropdown-div' onClick={() => setShowUserModal(true)}>
          <div id='navbar-three-bars-icon'><i class="fa-solid fa-bars"></i></div>
          <div id='navbar-user-welcome-message'>Hi, {sessionUser.firstName} {sessionUser.lastName}</div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink id='navbar-sell-your-car-login-navlink' exact to='/login'><div id='navbar-sell-your-car'>Sell Your Car</div></NavLink>
        <div id='navbar-no-user-dropdown-div' onClick={() => setShowMenuModal(true)}>
          <div id='navbar-three-bars-icon'><i class="fa-solid fa-bars"></i></div>
          <div id='navbar-Menu-word'>Menu</div>
        </div>
      </>
    );
  }

  return (
    <header>
      <nav>
        <NavLink to='/' exact={true}>
          <img id='logo-image' src={ridesLogo} alt='Home'/>
        </NavLink>
        {sessionLinks}
        {showMenuModal && <MenuModal setShowMenuModal={setShowMenuModal} />}
        {showUserModal && <UserModal setShowUserModal={setShowUserModal} sessionUser={sessionUser} />}
      </nav>
    </header>
  );
}

export default NavBar;
