import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarsThunk } from "../../../store/cars";
import { useHistory, useLocation } from "react-router-dom";
// import Search from "../Search/Search.js";
import "./CarsSearchResults.css";

const CarsSearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log('location.state', location.state)

  const newFilter = location.state?.new;
  const makeFilter = location.state?.make;
  const priceFilter = location.state?.price;


  const allCarsArray = useSelector(state => Object.values(state.cars))
  // console.log('allCarsArray', allCarsArray)

  let filteredCars = allCarsArray;
  if (newFilter !== null) filteredCars = filteredCars.filter(car => car.new === newFilter);
  if (makeFilter) filteredCars = filteredCars.filter(car => car.make === makeFilter);
  if (priceFilter) filteredCars = filteredCars.filter(car => car.price <= priceFilter);

  // console.log('filteredCars', filteredCars)

  const newTitle = newFilter === null ? 'New & used' : newFilter ? 'New' : 'Used';
  const makeTitle = makeFilter === null ? 'cars' : makeFilter;

  useEffect(() => {
    dispatch(getAllCarsThunk())
  }, [dispatch])

  // if (filteredCars.length < 1) return <>There are no cars matching this search.</>

  return (
    <div id="cars-search-results-overall-container">
      <div id="cars-search-results-second-container">
        <div id="cars-search-results-title">{newTitle} {makeTitle} for sale</div>
        <div id="cars-search-results-cars-container">
          {filteredCars.length < 1 && (
            <>
              <div>There are no cars matching this search.</div>
              <div id="cars-search-results-go-back-div"><span id="cars-search-results-go-back-button" onClick={() => history.go(-1)}>Click here</span> to go back.</div>
            </>
          )}
          {filteredCars.map((car, index) => {
            return (
              <div id="cars-search-results-single-car-container" key={index} onClick={() => history.push(`/cars/${car.id}/details`)}>
                <div id="cars-search-results-single-car-grid">
                  <div id="cars-search-results-single-car-left-grid">
                    <div id="cars-search-results-single-car-image-container">
                      <div id="cars-search-results-single-car-image-wrapper">
                        {car.images.length === 0 && <img id="cars-search-results-single-car-image" src={'https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg'} alt="preview" onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} />}
                        {car.images.length > 0 && <img id="cars-search-results-single-car-image" src={car.images[0]?.imageUrl} alt="preview" onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} />}
                      </div>
                    </div>
                  </div>
                  <div id="cars-search-results-single-car-right-grid">
                    <div id="cars-search-results-single-car-used-saved-container">
                      <div id="cars-search-results-single-car-used-component">{car.new ? 'New' : 'Used'}</div>
                      {/* <div id="cars-search-results-single-car-saved-component">Saved Component (placeholder)</div> */}
                    </div>
                    <div id="cars-search-results-single-car-year-make-model-trim">{car.year} {car.make} {car.model} {car.trim}</div>
                    <div id="cars-search-results-single-car-milage">{car.miles.toLocaleString()} mi.</div>
                    <div id="cars-search-results-single-car-price">${car.price.toLocaleString()}</div>
                    {car.price < 25000 && <div id="cars-search-results-single-car-great-deal"><i class="fa-solid fa-arrow-up"></i> Great Deal!</div>}
                    {car.price < 50000 && car.price >= 25000 && <div id="cars-search-results-single-car-good-deal"><i class="fa-solid fa-arrow-trend-up"></i> Good Deal</div>}
                    {car.price >= 50000 && <div id="cars-search-results-single-car-fair-deal"><i class="fa-solid fa-arrow-right"></i> Fair Deal</div>}
                    {/* <div id="cars-search-results-single-car-seller-button-container">
                      <div id="cars-search-results-single-car-seller-info"></div>
                      <div id="cars-search-results-single-car-check-button">Check availability</div>
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

export default CarsSearchResults;
