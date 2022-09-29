import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.goBack();
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='log-in-page-overall-container'>
      <div id='log-in-page-second-container'>
        <div id='log-in-page-grid'>
          <div id='log-in-welcome-text'>
            <div id='log-in-welcome-big-text'>Sign in</div>
            <div id='log-in-welcome-small-text'>New to Rides? <NavLink id='log-in-welcome-create-account-navlink' to='./sign-up'>Create an account.</NavLink></div>
          </div>
          <form onSubmit={onLogin}>
            <div id='log-in-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                id='log-in-email-textfield'
                className='log-in-fields-class'
                name='email'
                type='text'
                value={email}
                required
                onChange={updateEmail}
              />
              <span className="floating-label">Email</span>
            </div>
            <div>
              <input
                id='log-in-password-textfield'
                className='log-in-fields-class'
                name='password'
                type='password'
                value={password}
                required
                onChange={updatePassword}
              />
              <span className="floating-label">Password</span>
            </div>
            <button className='log-in-sign-in-submit-button' type='submit'>Sign in</button>
            <button className='log-in-sign-in-submit-button' type='submit' onClick={(e) => {
              setEmail('demo@aa.io')
              setPassword('password')
            }}>Sign in as Demo User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
