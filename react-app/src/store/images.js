const CREATE_IMAGE = 'cars/createImage'
const DELETE_IMAGE = 'cars/deleteImage'


/********************************** ACTIONS **********************************/

const createImageAction = (payload) => {
  return {
    type: CREATE_IMAGE,
    payload
  }
}

const deleteImageAction = (id) => {
  return {
    type: DELETE_IMAGE,
    id
  }
}


/********************************** THUNKS **********************************/


export const createImageThunk = (carId, payload) => async dispatch => {
  // console.log(payload)
  const response = await fetch(`/api/cars/${carId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const image = await response.json()
    dispatch(createImageAction(image))
    return image
  }
}

export const deleteImageThunk = (id) => async dispatch => {
  const response = await fetch(`/api/images/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id)
  })
  if (response.ok) {
    dispatch(deleteImageAction(id))
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
