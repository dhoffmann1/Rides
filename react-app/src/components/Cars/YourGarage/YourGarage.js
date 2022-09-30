import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCarsThunk } from "../../../store/cars";
import { getUserThunk } from "../../../store/user";
// import Search from "../Search/Search.js";
import "./YourGarage.css";

const YourGarage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  console.log('sessionUser in YourGarage Component', sessionUser)
  console.log('sessionUser.garageCars', sessionUser.garageCars)

  useEffect(() => {
    dispatch(getUserThunk(sessionUser.id))
  }, [dispatch])

  if (!sessionUser) return <>Session User Not Loaded</>


  return (
    <div id="your-garage-overall-container">
      <div id="your-garage-second-container">
        <div id="your-garage-title">Your Garage</div>
        <div id="your-garage-grid">
          <div id="your-garage-left-side-grid">
            {sessionUser.garageCars.length === 0 && <div>You currently have no cars listed for sale.</div>}
            {sessionUser.garageCars.length > 0 && sessionUser.garageCars.map(car => {
              return (
                <div id="your-garage-car-container" key={car.id}>
                  <div id="your-garage-car-main-container">
                    <div id="your-garage-car-image-container">
                      {car?.images?.length === 0 && <img id="your-garage-car-image" src='https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg' alt={`car ${car.id}`}  />}
                      {car?.images?.length > 0 && <img id="your-garage-car-image" src={car?.images[0]?.imageUrl} alt={`car ${car.id}`}  />}
                    </div>
                    <div id="your-garage-car-details-wrapper">
                      <div id="your-garage-conditions-make-model-container">
                        <div id="your-garage-new-label">{car.new ? 'New': 'Used'}</div>
                        <div id="your-garage-make-model">{car.year} {car.make} {car.model} {car.trim}</div>
                      </div>
                      <div id="your-garage-milage">{car.miles.toLocaleString()} mi.</div>
                      <div id="your-garage-price">${car.price.toLocaleString()}</div>
                      <div id="your-garage-edit-button-container">
                        <NavLink id="your-garage-edit-listing-button" to={`/cars/${car.id}/edit`}>Edit Listing</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div id="your-garage-right-side-container">
            <div id="your-garage-add-car">right side</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourGarage;
