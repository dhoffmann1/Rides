const GET_ALL_CARS = 'cars/getAllCars'
// const GET_FOUR_CARS = 'cars/getFourCars'
// const GET_FILTERED_CARS = 'cars/getFilteredCars'
// const GET_SAVED_CARS = 'cars/getSavedCars'
// const GET_YOUR_GARAGE = 'cars/getYourGarage'
const CREATE_CAR = 'cars/createCar'
const UPDATE_CAR = 'cars/updateCar'
const DELETE_CAR = 'cars/deleteCar'
// const RESET_CAR = 'cars/resetCars'


/********************************** ACTIONS **********************************/

const getAllCarsAction = (payload) => {
  return {
    type: GET_ALL_CARS,
    payload
  }
}

// const getFourCarsAction = (payload) => {
//     return {
//         type: GET_FOUR_CARS,
//         payload
//     }
// }

// const getFilteredAction = (payload) => {
//     return {
//         type: GET_FILTERED_CARS,
//         payload
//     }
// }


// const getSavedCarsAction = (payload) => {
//   return {
//     type: GET_SAVED_CARS,
//     payload
//   }
// }

// const getYourGarageAction = (payload) => {
//   return {
//     type: GET_YOUR_GARAGE,
//     payload
//   }
// }

const createCarAction = (payload) => {
  return {
    type: CREATE_CAR,
    payload
  }
}

const updateCarAction = (payload) => {
  return {
    type: UPDATE_CAR,
    payload
  }
}

const deleteCarAction = (id) => {
  return {
    type: DELETE_CAR,
    id
  }
}


/********************************** THUNKS **********************************/


export const getAllCarsThunk = () => async dispatch => {
  const response = await fetch('/api/cars/all')
  if(response.ok){
    let cars = await response.json()
    dispatch(getAllCarsAction(cars))
  }
}

// export const getSavedCarsThunk = () => async dispatch => {
//     // @post_routes.route('', methods=["GET"])
//     const response = await fetch('/api/posts/', {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     // console.log(response)
//     if (response.ok) {
//         let posts = await response.json()
//         dispatch(load(posts))
//         return posts
//     }
// }


// export const getYourPosts = () => async dispatch => {
//     const response = await fetch(`/api/users/posts`)
//     if (response.ok){
//         const posts = await response.json()
//         dispatch(loadYourPosts(posts))
//     }

// }

// export const getUserPosts = (userId) => async dispatch => {
//     const response = await fetch(`/api/users/${userId}/posts`)
//     if (response.ok){
//         const posts = await response.json()
//         dispatch(loadUserPosts(posts))
//     }
// }
// IMPORTANT: make sure the object you send from from is snake cased in keys
export const createCarThunk = (payload) => async dispatch => {
  const response = await fetch('/api/cars', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const car = await response.json()
    dispatch(createCarAction(car))
  }
}

export const updateCarThunk = (id, payload) => async dispatch => {
  const response = await fetch(`/api/cars/${id}`,{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  if (response.ok){
    const car = await response.json()
    dispatch(updateCarAction(car))
  }
}


export const deleteCarThunk = (id) => async dispatch => {
  const response = await fetch(`/api/cars/${id}`,{
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id)
  })
  if (response.ok) {
    dispatch(deleteCarAction(id))
  }
}

// export const resetPosts = () => {
//     return {
//         type: RESET_POSTS
//     }
// }


/********************************** REDUCER **********************************/


const initialState = {}
const carsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_CARS: {
      newState={}
      action.payload.cars.forEach(car => newState[car.id] = car)
      return newState
    }
    // case GET_POSTS: {
    //   newState = {}
    //   action.payload.posts.forEach(post => newState[post.id] = post)
    //   return newState
    // }
    // case GET_YOUR_PROFILE: {
    //   const newState = {}
    //   action.payload.posts.forEach( post => newState[post.id] = post)
    //   return newState
    // }
    // case GET_USER_PROFILE:{
    //   const newState = {}
    //   action.payload.posts.forEach( post => newState[post.id] = post)
    //   return newState
    // }
    case CREATE_CAR: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState
    }
    case UPDATE_CAR: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState
    }
    case DELETE_CAR: {
      const newState = { ...state }
      delete newState[action.id]
      return newState
    }
    // case RESET_POSTS: {
    //   return {}
    // }
    default:
      return state
  }
}

export default carsReducer
