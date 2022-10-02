import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllCarsThunk } from "../../../store/cars";
import { getUserThunk } from "../../../store/session";
import "./CarDetails.css";

const CarDetails = () => {
  const { carId } = useParams();
  const carsArray = useSelector(state => Object.values(state.cars));
  const car = carsArray.find(car => car.id === +carId);
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const [detailsPreviewImage, setDetailsPreviewImage] = useState(car?.images.length > 0 ? car.images[0].imageUrl : 'https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg')
  const [forceRender, setForceRender] = useState(false);


  console.log('sessionUser in CarDetails Component', sessionUser)
  console.log('car in CarDetails Component', car)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getUserThunk(sessionUser.id));
      dispatch(getAllCarsThunk());
      if (car?.images.length > 0) {
        setDetailsPreviewImage(car.images[0].imageUrl)
      } else {
        setForceRender(!forceRender)
      }
    }, 100)
    return () => clearTimeout(timer);
  }, [dispatch, sessionUser.id, forceRender])

  if (!sessionUser) return <>Session User Not Loaded</>
  if (!car) return <>Could not find car with this ID</>

  return (
    <div id="car-details-page-overall-container">
      <div id="car-details-page-second-container">
        <div id="car-details-page-grid">
          <div id="car-details-page-left-side-container">
            <div id="car-details-page-images-container">
              <div id="car-details-page-preview-image-container">
                <div id="car-details-page-preview-image-wrapper">
                  <img id="car-details-page-preview-image" src={detailsPreviewImage} alt="preview" />
                </div>
              </div>
              <div id="car-details-page-images-scroller-container">
                {car.images.map((image, index) => {
                  return (
                    <div id="car-details-page-small-images-wrapper" key={index}>
                      <img id="car-details-page-small-images" src={image.imageUrl} alt="small" onClick={() => setDetailsPreviewImage(image.imageUrl)} />
                    </div>
                  )
                })}
              </div>
            </div>
            <div id="car-details-page-details-container">
              <div id="car-details-page-used-save-container">
                <div id="car-details-page-used-info">{car.new ? 'New' : 'Used'}</div>
                <div id="car-details-page-saved-component">Saved Component</div>
              </div>
              <div id="car-details-page-year-make-model-trim">{car.year} {car.make} {car.model} {car.trim}</div>
              <div id="car-details-page-milage">{car.miles.toLocaleString()} mi.</div>
              <div id="car-details-page-price">${car.price.toLocaleString()}</div>
              {car.price < 25000 && <div id="car-details-page-great-deal"><i class="fa-solid fa-arrow-up"></i> Great Deal!</div>}
              {car.price < 50000 && car.price >= 25000 && <div id="car-details-page-good-deal"><i class="fa-solid fa-arrow-trend-up"></i> Good Deal</div>}
              {car.price >= 50000 && <div id="car-details-page-fair-deal"><i class="fa-solid fa-arrow-right"></i> Fair Deal</div>}
            </div>
            <div id="car-details-page-basics-container">
              <div id="car-details-page-basics-title">Basics</div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-exColor">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-exColor-title">Exterior Color</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-exColor-info">{car.exColor}</div>
              </div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-inColor">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-inColor-title">Interior Color</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-inColor-info">{car.inColor}</div>
              </div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-drivetrain">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-drivetrain-title">Drivetrain</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-drivetrain-info">{car.drivetrain}</div>
              </div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-mpg">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-mpg-title">MPG</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-mpg-info">{car.mpg}</div>
              </div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-fuelType">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-fuelType-title">Fuel Type</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-fuelType-info">{car.fuelType}</div>
              </div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-transmission">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-transmission-title">Transmission</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-transmission-info">{car.transmission}</div>
              </div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-engine">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-engine-title">Engine</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-engine-info">{car.engine}</div>
              </div>
              <div className="car-details-page-basics-grids" id="car-details-page-basics-mileage">
                <div className="car-details-page-basics-titles-class" id="car-details-page-basics-mileage-title">Mileage</div>
                <div className="car-details-page-basics-info-class" id="car-details-page-basics-mileage-info">{car.miles.toLocaleString()} mi.</div>
              </div>
            </div>
            <div id="car-details-page-reviews-container">Reviews</div>
          </div>
          <div id="car-details-page-right-side-container">
            <div id="car-details-page-contact-seller-container">Contact Seller</div>
            <div id="car-details-page-calculator-container">Calculator</div>
          </div>
        </div>
        <div id="car-details-page-recommended-vehicles">Other Recommended Vehicles</div>
      </div>
    </div>
  );
};

export default CarDetails;
