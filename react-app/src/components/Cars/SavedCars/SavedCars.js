// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { deleteCarThunk } from "../../../store/cars";
// import { getUserThunk } from "../../../store/session";
import "./SavedCars.css";

const SavedCars = () => {
  // const sessionUser = useSelector(state => state.session.user);
  // const dispatch = useDispatch();

  // const [showConfirmation, setShowConfirmation] = useState(false);
  // const [showConfirmationId, setShowConfirmationId] = useState(0);
  // const [forceRender, setForceRender] = useState(false);


  // console.log('sessionUser in YourGarage Component', sessionUser)
  // console.log('sessionUser.garageCars', sessionUser.garageCars)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(getUserThunk(sessionUser.id));
  //   }, 100)
  //   return () => clearTimeout(timer);
  // }, [dispatch, sessionUser.id, forceRender])

  // if (!sessionUser) return <>Session User Not Loaded</>

  // const handleDelete = carId => {
  //   dispatch(deleteCarThunk(carId))
  //   setShowConfirmation(false)
  //   setForceRender(!forceRender)
  // }

  return (
    <div id="saved-cars-overall-container">
      <div id="saved-cars-second-container">
        <div id="saved-cars-title">Your Saved Cars (Bonus Feature)</div>
        <div id="saved-cars-image-wrapper">
          <img id="saved-cars-image" src="https://pictures.dealer.com/r/raypricestroudfordfd/0829/16220bfc8d7bf3d774af7d505f4b5b2ex.jpg" alt="page under construction" onError={e => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/en/1/1d/Page_Under_Construction.png'; }} />
        </div>
      </div>
    </div>
  );
};

export default SavedCars;
