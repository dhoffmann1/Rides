import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarsThunk } from "../../store/cars";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search.js";
import "./CarsSearchResults.css";

const CarsSearchResults = () => {
  let welcomeCars = useSelector(state => Object.values(state.cars)).slice(0, 4)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCarsThunk())
  }, [dispatch])

  // console.log(welcomeCars)

  return (
    <div id="cars-search-results-overall-container">
      <div id="cars-search-results-second-container">
        <div id="cars-search-results-grid">
          <div id="the-easiest-way-to-sell-your-car-container">
            <div id="the-easiest-smaller-container">The easiest way to sell your car</div>
          </div>
          <div id="cars-search-results-filter-search-container">
            <div id="cars-search-results-filter-search-wrapper">
              <div id="cars-search-results-filter-search-make-bar">
                <div id="cars-search-results-make-word">Make</div>
              </div>
              {/* <div id="cars-search-results-search-engine">Search engine</div> */}
              <Search />
            </div>
          </div>
          <div id="welcome-back-container">
            <div id="welcome-back-text">Welcome Back!</div>
            <div id="welcome-back-smaller-text">Check out these recommendations we have for you.</div>
            <div id="welcome-back-list-cars-container">
              <div id="welcome-back-cars-grid">
                {welcomeCars.map(car => {
                  return (
                    <NavLink id="wb-navlink-wrapper" to={`/cars/${car.id}/details`} key={car.id}>
                      <div id="welcome-back-single-car-main-container">
                        <div id="welcome-back-car-image-container">
                          <img id="wb-car-image" src={car?.images[0]?.imageUrl} alt="car"  />
                        </div>
                        <div id="wb-car-details-wrapper">
                          <div id="wb-conditions-make-model-container">
                            <div id="wb-new-label">{car.new ? 'New': 'Used'}</div>
                            <div id="wb-make-model">{car.year} {car.make} {car.model} {car.trim}</div>
                          </div>
                          <div id="wb-milage">{car.miles.toLocaleString()} mi.</div>
                          <div id="wb-price">${car.price.toLocaleString()}</div>
                          {car.price < 25000 && <div id="wb-great-deal"><i class="fa-solid fa-arrow-up"></i> Great Deal!</div>}
                          {car.price < 50000 && car.price >= 25000 && <div id="wb-good-deal"><i class="fa-solid fa-arrow-trend-up"></i> Good Deal</div>}
                          {car.price >= 50000 && <div id="wb-fair-deal"><i class="fa-solid fa-arrow-right"></i> Fair Deal</div>}
                        </div>
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsSearchResults;
