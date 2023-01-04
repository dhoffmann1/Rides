import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SavedCars.css";

const SavedCars = () => {
  const sessionUser = useSelector(state => state.session.user);
  const userSavedCars = sessionUser.userSavedCars;
  const history = useHistory();

  return (
    <div id="saved-cars-overall-container">
      <div id="saved-cars-second-container">
        <div id="saved-cars-title">Your Saved Cars</div>
        <div id="saved-cars-cars-container">
          {userSavedCars.length < 1 && (
            <>
              <div>You currently have no saved cars.</div>
              <div id="saved-cars-go-back-div"><span id="saved-cars-go-back-button" onClick={() => history.go(-1)}>Click here</span> to go back.</div>
            </>
          )}
          {userSavedCars.map((car, index) => {
            return (
              <div id="saved-cars-single-car-container" key={index} onClick={() => history.push(`/cars/${car.id}/details`)}>
                <div id="saved-cars-single-car-grid">
                  <div id="saved-cars-single-car-left-grid">
                    <div id="saved-cars-single-car-image-container">
                      <div id="saved-cars-single-car-image-wrapper">
                        {car.images.length === 0 && <img id="saved-cars-single-car-image" src={'https://ridesappbucket.s3.amazonaws.com/awaiting_car.png'} alt="preview" onError={e => { e.currentTarget.src = 'https://ridesappbucket.s3.amazonaws.com/select_car.png'; }} />}
                        {car.images.length > 0 && <img id="saved-cars-single-car-image" src={car.images[0]?.imageUrl} alt="preview" onError={e => { e.currentTarget.src = 'https://ridesappbucket.s3.amazonaws.com/select_car.png'; }} />}
                      </div>
                    </div>
                  </div>
                  <div id="saved-cars-single-car-right-grid">
                    <div id="saved-cars-single-car-used-saved-container">
                      <div id="saved-cars-single-car-used-component">{car.new ? 'New' : 'Used'}</div>
                      {/* <div id="saved-cars-single-car-saved-component">Saved Component (placeholder)</div> */}
                    </div>
                    <div id="saved-cars-single-car-year-make-model-trim">{car.year} {car.make} {car.model} {car.trim}</div>
                    <div id="saved-cars-single-car-milage">{car.miles.toLocaleString()} mi.</div>
                    <div id="saved-cars-single-car-price">${car.price.toLocaleString()}</div>
                    {car.price < 25000 && <div id="saved-cars-single-car-great-deal"><i class="fa-solid fa-arrow-up"></i> Great Deal!</div>}
                    {car.price < 50000 && car.price >= 25000 && <div id="saved-cars-single-car-good-deal"><i class="fa-solid fa-arrow-trend-up"></i> Good Deal</div>}
                    {car.price >= 50000 && <div id="saved-cars-single-car-fair-deal"><i class="fa-solid fa-arrow-right"></i> Fair Deal</div>}
                    {/* <div id="saved-cars-single-car-seller-button-container">
                      <div id="saved-cars-single-car-seller-info"></div>
                      <div id="saved-cars-single-car-check-button">Check availability</div>
                    </div> */}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedCars;
