import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { getAllCarsThunk } from "../../store/cars";
import { deleteReviewThunk } from "../../store/reviews";
import { getUserThunk } from "../../store/session";

import "./ReviewsPage.css";

const ReviewsPage = () => {
  const { carId } = useParams();
  const carsArray = useSelector(state => Object.values(state.cars));
  const car = carsArray.find(car => car.id === +carId);
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [avgStarRating, setAvgStarRating] = useState(0);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getUserThunk(sessionUser.id));
      dispatch(getAllCarsThunk())
        .then(() => {
          if (car?.reviews.length > 0) {
            let sumRatings = 0;
            car.reviews.forEach(review => sumRatings += review.rating)
            setAvgStarRating(+(sumRatings/car.reviews.length))
          } else {
            setAvgStarRating(0);
          }
        })
      ;
    }, 75)

    return () => clearTimeout(timer);
  }, [dispatch, car?.reviews.length, avgStarRating, forceRender, sessionUser.id])


  const handleDelete = reviewId => {
    dispatch(deleteReviewThunk(reviewId))
    setForceRender(!forceRender)
  }

  if (!sessionUser) return <>Session User Not Loaded</>
  if (!car) return <>Could not find car with this ID</>

  return (
    <div id="reviews-page-overall-container">
      <div id="reviews-page-second-container">
        <div id="reviews-page-grid">
          <div id="reviews-page-left-side-grid-container">
            <div id="reviews-page-welcome-big-text">{car.year} {car.make} {car.model} - Consumer Reviews</div>
            <div id="reviews-page-average-star-ratings-container">
              <div id="reviews-page-average-star-ratings-number">{avgStarRating.toFixed(1)}</div>
              <div id="reviews-page-average-star-ratings-stars-container">
                <div id="reviews-page-average-star-ratings-first-star">
                  {avgStarRating < 0.25 && <i class="fa-regular fa-star"></i>}
                  {avgStarRating >= 0.25 && avgStarRating < 0.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                  {avgStarRating >= 0.75 && <i class="fa-solid fa-star"></i>}
                </div>
                <div id="reviews-page-average-star-ratings-second-star">
                  {avgStarRating < 1.25 && <i class="fa-regular fa-star"></i>}
                  {avgStarRating >= 1.25 && avgStarRating < 1.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                  {avgStarRating >= 1.75 && <i class="fa-solid fa-star"></i>}
                </div>
                <div id="reviews-page-average-star-ratings-third-star">
                  {avgStarRating < 2.25 && <i class="fa-regular fa-star"></i>}
                  {avgStarRating >= 2.25 && avgStarRating < 2.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                  {avgStarRating >= 2.75 && <i class="fa-solid fa-star"></i>}
                </div>
                <div id="reviews-page-average-star-ratings-fourth-star">
                  {avgStarRating < 3.25 && <i class="fa-regular fa-star"></i>}
                  {avgStarRating >= 3.25 && avgStarRating < 3.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                  {avgStarRating >= 3.75 && <i class="fa-solid fa-star"></i>}
                </div>
                <div id="reviews-page-average-star-ratings-fifth-star">
                  {avgStarRating < 4.25 && <i class="fa-regular fa-star"></i>}
                  {avgStarRating >= 4.25 && avgStarRating < 4.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                  {avgStarRating >= 4.75 && <i class="fa-solid fa-star"></i>}
                </div>
              </div>
              <div id="reviews-page-average-star-ratings-num-of-reviews">({car.reviews.length} reviews)</div>
            </div>
            <NavLink id="reviews-page-write-a-review-button" to={`/cars/${car.id}/reviews/new`}>Write a Review</NavLink>
            {car.reviews.map((review, index) => {
              return (
                <div id="reviews-page-single-review-container" key={index}>
                  <div id="reviews-page-single-star-ratings-container">
                    <div id="reviews-page-single-star-ratings-number-stars-container">
                      <div id="reviews-page-single-star-ratings-number">{review.rating.toFixed(1)}</div>
                      <div id="reviews-page-single-star-ratings-stars-container">
                        <div id="reviews-page-single-star-ratings-first-star">
                          {review.rating < 0.25 && <i class="fa-regular fa-star"></i>}
                          {review.rating >= 0.25 && review.rating < 0.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                          {review.rating >= 0.75 && <i class="fa-solid fa-star"></i>}
                        </div>
                        <div id="reviews-page-single-star-ratings-second-star">
                          {review.rating < 1.25 && <i class="fa-regular fa-star"></i>}
                          {review.rating >= 1.25 && review.rating < 1.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                          {review.rating >= 1.75 && <i class="fa-solid fa-star"></i>}
                        </div>
                        <div id="reviews-page-single-star-ratings-third-star">
                          {review.rating < 2.25 && <i class="fa-regular fa-star"></i>}
                          {review.rating >= 2.25 && review.rating < 2.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                          {review.rating >= 2.75 && <i class="fa-solid fa-star"></i>}
                        </div>
                        <div id="reviews-page-single-star-ratings-fourth-star">
                          {review.rating < 3.25 && <i class="fa-regular fa-star"></i>}
                          {review.rating >= 3.25 && review.rating < 3.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                          {review.rating >= 3.75 && <i class="fa-solid fa-star"></i>}
                        </div>
                        <div id="reviews-page-single-star-ratings-fifth-star">
                          {review.rating < 4.25 && <i class="fa-regular fa-star"></i>}
                          {review.rating >= 4.25 && review.rating < 4.75 && <i class="fa-solid fa-star-half-stroke"></i>}
                          {review.rating >= 4.75 && <i class="fa-solid fa-star"></i>}
                        </div>
                      </div>
                    </div>
                    {review.user.id === sessionUser.id && (
                      <div id="reviews-page-single-review-edit-delete-buttons-container">
                        <NavLink id="reviews-page-single-review-edit-button" to={`/cars/${car.id}/reviews/${review.id}/edit`}>Edit</NavLink>
                        <div id="reviews-page-single-review-delete-button" onClick={() => handleDelete(review.id)}>Delete</div>
                      </div>
                    )}
                  </div>
                  <div id="reviews-page-single-review-date">{review.createdAt.split(', ')[1].slice(0, 11)}</div>
                  <div id="reviews-page-single-review-user-information">By {review.user.firstName} {review.user.lastName}</div>
                  <div id="reviews-page-single-review-content">{review.content}</div>
                </div>
              )
            })}
          </div>
          <div id="reviews-page-right-side-grid-container">
            <div id="reviews-page-preview-image-wrapper">
            {car.images.length === 0 && <img id="reviews-page-preview-image" src={'https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg'} alt="preview" onClick={() => history.push(`/cars/${carId}/details`)} onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} />}
            {car.images.length > 0 && <img id="reviews-page-preview-image" src={car.images[0]?.imageUrl} alt="preview" onClick={() => history.push(`/cars/${carId}/details`)} onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} />}
              {/* <img id="reviews-page-preview-image" src={car.images[0]?.imageUrl} alt="preview" onClick={() => history.push(`/cars/${carId}/details`)} onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
