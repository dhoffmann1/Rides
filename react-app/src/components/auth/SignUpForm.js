import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords need to match'])
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='sign-up-page-overall-container'>
      <div id='sign-up-page-second-container'>
        <div id='sign-up-page-grid'>
          <div id='sign-up-welcome-text'>
            <div id='sign-up-welcome-big-text'>Create an account</div>
            <div id='sign-up-welcome-small-text'>Already have a profile? <NavLink id='sign-up-welcome-create-account-navlink' to='./login'>Sign in.</NavLink></div>
          </div>
          <form onSubmit={onSignUp}>
            <div id='sign-up-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                id='sign-up-first-name-textfield'
                className='sign-up-fields-class'
                type='text'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
                required
              />
              <span className="floating-label">First name</span>
            </div>
            <div>
              <input
                id='sign-up-last-name-textfield'
                className='sign-up-fields-class'
                type='text'
                name='lastName'
                onChange={updateLastName}
                value={lastName}
                required
              />
              <span className="floating-label">Last name</span>
            </div>
            <div>
              <input
                id='sign-up-email-textfield'
                className='sign-up-fields-class'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                required
              />
              <span className="floating-label">Email</span>
            </div>
            <div>
              <input
                id='sign-up-password-textfield'
                className='sign-up-fields-class'
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                required
              />
              <span className="floating-label">Password</span>
            </div>
            <div>
              <input
                id='sign-up-repeat-password-textfield'
                className='sign-up-fields-class'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required
              />
              <span className="floating-label">Confirm password</span>
            </div>
            <button className='sign-up-submit-button' type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
