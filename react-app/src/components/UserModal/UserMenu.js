import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCarsThunk } from "../../store/cars";
import LogoutButton from "../auth/LogoutButton";
import './UserMenu.css';

function UserMenu({ setShowUserModal, sessionUser }) {
  const dispatch = useDispatch();
  const yourGarage = useSelector(state => Object.values(state.cars)).filter(car => car.sellerId === sessionUser.id)

  function closeModal() {
    setShowUserModal(false)
  }

  useEffect(() => {
    dispatch(getAllCarsThunk())
  }, [dispatch, yourGarage.length])

  return (
    <div id="usermenu-overall-container">
      <div id="user-text">Hi, {sessionUser.firstName} {sessionUser.lastName}</div>
      <NavLink id="user-your-saved-cars" to='/cars/your-saved-cars' onClick={closeModal}><i class="fa-regular fa-heart"></i> Saved Cars ({sessionUser.userSavedCars.length})</NavLink>
      <NavLink id="user-your-garage" to='/cars/your-garage' onClick={closeModal}><i class="fa-solid fa-tag"></i> Your Garage ({yourGarage.length})</NavLink>
      <div id="user-logout-button"  onClick={closeModal}>
        <LogoutButton />
      </div>
    </div>
  );
}

export default UserMenu
