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
        {showUserModal && <UserModal setShowUserModal={setShowUserModal} />}
        {/* <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul> */}
      </nav>
    </header>
  );
}

export default NavBar;
