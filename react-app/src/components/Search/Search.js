import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Search.css'

const Search = () => {
  const [_new, setNew] = useState('New & used cars');
  const [make, setMake] = useState('All makes');
  const [price, setPrice] = useState('No max price');


  // const user = useSelector(state => state.session.user);

  const newOptions = ['New & used cars', 'New cars', 'Used cars'];
  const makeOptions = ['All makes', 'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'INFINITI', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Nissan', 'Tesla', 'Toyota'];
  const priceOptions = ['No max price', '$6,000', '$10,000', '$25,000', '$50,000', '$75,000', '$100,000', '$250,000']

  // const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newSearch = _new === 'New & used cars' ? 'new+used' : _new === 'New cars' ? 'new+cars' : 'used+cars';
    let makeSearch = make === 'All makes' ? 'all+makes' : make;
    let priceSearch = price === 'No max price' ? 'no+max+price' : price;

    let newState = _new === 'New & used cars' ? null : _new === 'New cars';
    let makeState = make === 'All makes' ? null : make;
    let priceState = price === 'No max price' ? null : Number(price.replace(/[^0-9.-]+/g,""))

    // console.log('newState from Search', newState)
    // console.log('makeState from Search', makeState)
    // console.log('priceState from Search', priceState)

    history.push({
      pathname: '/cars/search',
      search:  `?new=${newSearch}&make=${makeSearch}&price=${priceSearch}`,
      state: { new: newState, make: makeState, price: priceState }
    });
  };

  return (
    <div id='search-feature-overall-container'>
      <form id='search-feature-grid-form' onSubmit={handleSubmit}>
        <div id='search-feature-divs'>
          <select
            id='search-feature-new-selectfield'
            className='search-feature-fields-class-select'
            name='new'
            required
            onChange={(e) => setNew(e.target.value)}
          >
            {newOptions.map((newOp, i) => {
              return (
                <option key={i} value={newOp}>{newOp}</option>
              )
            })}
          </select>
          <span className="floating-label-select-search">New/used</span>
        </div>
        <div>
          <select
            id='search-feature-make-selectfield'
            className='search-feature-fields-class-select'
            name='make'
            required
            onChange={(e) => setMake(e.target.value)}
          >
            {makeOptions.map((make, i) => {
              return (
                <option key={i} value={make}>{make}</option>
              )
            })}
          </select>
          <span className="floating-label-select-search">Make</span>
        </div>
        <div>
          <select
            id='search-feature-price-selectfield'
            className='search-feature-fields-class-select'
            name='price'
            required
            onChange={(e) => setPrice(e.target.value)}
          >
            {priceOptions.map((price, i) => {
              return (
                <option key={i} value={price}>{price}</option>
              )
            })}
          </select>
          <span className="floating-label-select-search">Price</span>
        </div>
        <button className='search-feature-submit-button' type='submit'>Search</button>
      </form>
    </div>
  );
};

export default Search;
