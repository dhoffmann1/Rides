const CREATE_REVIEW = 'cars/createReview'
const UPDATE_REVIEW = 'cars/updateReview'
const DELETE_REVIEW = 'cars/deleteReview'


/********************************** ACTIONS **********************************/

const createReviewAction = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload
  }
}

const updateReviewAction = (payload) => {
  return {
    type: UPDATE_REVIEW,
    payload
  }
}

const deleteReviewAction = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
}


/********************************** THUNKS **********************************/


export const createReviewThunk = (carId, payload) => async dispatch => {
  console.log(payload)
  const response = await fetch(`/api/cars/${carId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const review = await response.json()
    dispatch(createReviewAction(review))
    return review
  }
}

export const updateReviewThunk = (reviewId, payload) => async dispatch => {
  console.log(payload)
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const review = await response.json()
    dispatch(updateReviewAction(review))
    return review
  }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewId)
  })
  if (response.ok) {
    dispatch(deleteReviewAction(reviewId))
  }
}



/********************************** REDUCER **********************************/


// const initialState = {}
// const carsReducer = (state = initialState, action) => {
//   let newState;
//   switch (action.type) {
//     case GET_ALL_CARS: {
//       newState={}
//       action.payload.cars.forEach(car => newState[car.id] = car)
//       return newState
//     }
//     case CREATE_CAR: {
//       const newState = { ...state }
//       newState[action.payload.id] = action.payload
//       return newState
//     }
//     case UPDATE_CAR: {
//       const newState = { ...state }
//       newState[action.payload.id] = action.payload
//       return newState
//     }
//     case DELETE_CAR: {
//       const newState = { ...state }
//       delete newState[action.id]
//       return newState
//     }
//     // case RESET_POSTS: {
//     //   return {}
//     // }
//     default:
//       return state
//   }
// }

// export default carsReducer
