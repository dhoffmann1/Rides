import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteCarThunk } from "../../../store/cars";
import { getUserThunk } from "../../../store/session";
import "./YourGarage.css";

const YourGarage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationId, setShowConfirmationId] = useState(0);
  const [forceRender, setForceRender] = useState(false);


  // console.log('sessionUser in YourGarage Component', sessionUser)
  // console.log('sessionUser.garageCars', sessionUser.garageCars)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getUserThunk(sessionUser.id));
    }, 100)
    return () => clearTimeout(timer);
  }, [dispatch, sessionUser.id, forceRender])

  if (!sessionUser) return <>Session User Not Loaded</>

  const handleDelete = carId => {
    dispatch(deleteCarThunk(carId))
    setShowConfirmation(false)
    setForceRender(!forceRender)
  }

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
                    <span id='delete-car-icon' onClick={() => {
                        setShowConfirmation(!showConfirmation)
                        setShowConfirmationId(car.id)
                      }}><i class="fa-solid fa-trash-can"></i></span>
                      {showConfirmation && showConfirmationId === car.id && (
                        <div id='your-garage-confirmation-container'>
                          <div id='your-garage-confirmation-text'>Are you sure you want to delete this Car?</div>
                          <div id='your-garage-confirmation-text-small'>This action cannot be undone.</div>
                          <div id='your-garage-confirmation-options-container'>
                            <div id='your-garage-confirmation-yes' onClick={() => handleDelete(car.id)}>Yes</div>
                            <div id='your-garage-confirmation-no' onClick={() => setShowConfirmation(false)}>No</div>
                          </div>
                        </div>
                      )}
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
                      <div id="your-garage-view-details-button-container">
                        <NavLink id="your-garage-view-details-listing-button" to={`/cars/${car.id}/details`}>View Car Details</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div id="your-garage-right-side-container">
            <div id="your-garage-right-side-wrapper">
              <div id="your-garage-add-car-title">Add a car</div>
              <div id="your-garage-add-car-text">Need to add a car to your garage? Click "Add car details" to start. We'll ask you to enter some details about your vehicle and then upload up to 12 images.</div>
              <NavLink id="your-garage-add-car-button" to='/cars/new'>Add car details</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourGarage;
