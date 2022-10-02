import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPage from './components/LandingPage/LandingPage';
import { authenticate } from './store/session';
import CreateCarForm from './components/Cars/CreateCars/CreateCarForm';
import CreateCarImages from './components/Cars/CreateCarImages/CreateCarImages';
import YourGarage from './components/Cars/YourGarage/YourGarage';
import UpdateCarForm from './components/Cars/UpdateCars/UpdateCarForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          {/* <h1>My Home Page</h1> */}
          <LandingPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/cars/new' exact={true} >
          <CreateCarForm />
        </ProtectedRoute>
        <ProtectedRoute path='/cars/your-garage' exact={true} >
          <YourGarage />
        </ProtectedRoute>
        <ProtectedRoute path='/cars/:carId/images' exact={true} >
          <CreateCarImages />
        </ProtectedRoute>
        <ProtectedRoute path='/cars/:carId/edit' exact={true} >
          <UpdateCarForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
