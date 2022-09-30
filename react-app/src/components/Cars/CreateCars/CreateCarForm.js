import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCarThunk } from '../../../store/cars';
import './CreateCarForm.css'

const CreateCarForm = () => {
  const [errors, setErrors] = useState([]);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('Acura');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');
  const [miles, setMiles] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Excellent');
  const [_new, setNew] = useState('New');
  const [exColor, setExColor] = useState('Beige');
  const [inColor, setInColor] = useState('Black');
  const [drivetrain, setDrivetrain] = useState('All-wheel Drive');
  const [mpg, setMpg] = useState('');
  const [fuelType, setFuelType] = useState('Gasoline');
  const [transmission, setTransmission] = useState('Automatic');
  const [engine, setEngine] = useState('');

  const user = useSelector(state => state.session.user);

  const makeOptions = ['Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'INFINITI', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Nissan', 'Tesla', 'Toyota'];
  const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const newOptions = ['New', 'Used'];
  const exColorOptions = ['Beige', 'Black', 'Blue', 'Brown', 'Gold', 'Grey', 'Green', 'Orange', 'Purple', 'Red', 'Silver', 'White', 'Yellow'];
  const inColorOptions = ['Black', 'Grey', 'Tan'];
  const drivetrainOptions = ['All-wheel Drive', 'Front-wheel Drive', 'Rear-wheel Drive'];
  const fuelTypeOptions = ['Gasoline', 'Electric', 'Hybrid'];
  const transmissionOptions = ['Automatic', 'Manual'];


  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsArray = []

    if (year < 1950 || year > 2024) errorsArray.push('Year must be between 1950 and 2024.');
    if (miles > 20 && _new === 'New') errorsArray.push('A car with more than 20 miles is no longer considered "New".');
    if (miles <= 20 && _new === 'Used') errorsArray.push('A car with less than 20 miles is typically considered "New". Are you sure this car is "Used"?');
    if (miles < 1) errorsArray.push('Milage has to be 1 or greater.');
    if (price < 500 || price > 250000) errorsArray.push('Price must be between $500 and $250,000.');
    if (mpg < 1) errorsArray.push('MPG has to be 1 or greater.');
    // if (fuelType === 'Electric' && mpg > 0) errorsArray.push('MPG must be 0 for Electric vehicles');

    if (errorsArray.length > 0) {
      alert('Could not create car.  Please see error messages above.')
      setErrors(errorsArray);
      return
    }

    let newCar = {
      seller_id: +user.id,
      year: +year,
      make,
      model,
      trim,
      miles: +miles,
      price: +price,
      condition,
      new: _new === 'New',
      ex_color: exColor,
      in_color: inColor,
      drivetrain,
      mpg: +mpg,
      fuel_type: fuelType,
      transmission,
      engine
    }

    const data = await dispatch(createCarThunk(newCar));
    if (data) {
      setErrors(data);
    } else {
      alert('Car succesfully added to your garage!')
      history.push('/cars/your-garage');
    }
  };

  return (
    <div id='create-car-page-overall-container'>
      <div id='create-car-page-second-container'>
        <div id='create-car-page-grid'>
          <div id='create-car-welcome-text'>
            <div id='create-car-welcome-big-text'>List your car</div>
            <div id='create-car-welcome-small-text'>Please enter your car's details below.</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div id='create-car-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                id='create-car-year-textfield'
                className='create-car-fields-class'
                name='year'
                type='number'
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
              />
              <span className="floating-label">Year</span>
            </div>
            <div>
              <select
                id='create-car-make-selectfield'
                className='create-car-fields-class'
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
              {/* <span className="floating-label">Make</span> */}
            </div>
            <div>
              <input
                id='create-car-model-textfield'
                className='create-car-fields-class'
                name='model'
                type='text'
                value={model}
                required
                onChange={(e) => setModel(e.target.value)}
              />
              <span className="floating-label">Model</span>
            </div>
            <div>
              <input
                id='create-car-trim-textfield'
                className='create-car-fields-class'
                name='trim'
                type='text'
                value={trim}
                required
                onChange={(e) => setTrim(e.target.value)}
              />
              <span className="floating-label">Trim</span>
            </div>
            <div>
              <input
                id='create-car-miles-textfield'
                className='create-car-fields-class'
                name='miles'
                type='number'
                value={miles}
                required
                onChange={(e) => setMiles(e.target.value)}
              />
              <span className="floating-label">Milage</span>
            </div>
            <div>
              <input
                id='create-car-price-textfield'
                className='create-car-fields-class'
                name='price'
                type='number'
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="floating-label">Price</span>
            </div>
            <div>
            <select
                id='create-car-condition-selectfield'
                className='create-car-fields-class'
                name='condition'
                required
                onChange={(e) => setCondition(e.target.value)}
              >
                {conditionOptions.map((condition, i) => {
                  return (
                    <option key={i} value={condition}>{condition}</option>
                  )
                })}
              </select>
              {/* <span className="floating-label">Condition</span> */}
            </div>
            <div>
              <select
                id='create-car-new-selectfield'
                className='create-car-fields-class'
                name='new'
                required
                onChange={(e) => setNew(e.target.value)}
              >
                {newOptions.map((_new, i) => {
                  return (
                    <option key={i} value={_new}>{_new}</option>
                  )
                })}
              </select>
              {/* <span className="floating-label">New</span> */}
            </div>
            <div>
            <select
                id='create-car-exColor-selectfield'
                className='create-car-fields-class'
                name='exColor'
                required
                onChange={(e) => setExColor(e.target.value)}
              >
                {exColorOptions.map((exColor, i) => {
                  return (
                    <option key={i} value={exColor}>{exColor}</option>
                  )
                })}
              </select>
              {/* <span className="floating-label">Exterior Color</span> */}
            </div>
            <div>
            <select
                id='create-car-inColor-selectfield'
                className='create-car-fields-class'
                name='inColor'
                required
                onChange={(e) => setInColor(e.target.value)}
              >
                {inColorOptions.map((inColor, i) => {
                  return (
                    <option key={i} value={inColor}>{inColor}</option>
                  )
                })}
              </select>
              {/* <span className="floating-label">Interior Color</span> */}
            </div>
            <div>
            <select
                id='create-car-drivetrain-selectfield'
                className='create-car-fields-class'
                name='drivetrain'
                required
                onChange={(e) => setDrivetrain(e.target.value)}
              >
                {drivetrainOptions.map((drivetrain, i) => {
                  return (
                    <option key={i} value={drivetrain}>{drivetrain}</option>
                  )
                })}
              </select>
              {/* <span className="floating-label">Drivetrain</span> */}
            </div>
            <div>
              <input
                id='create-car-mpg-textfield'
                className='create-car-fields-class'
                name='mpg'
                type='number'
                value={mpg}
                required
                onChange={(e) => setMpg(e.target.value)}
              />
              <span className="floating-label">MPG</span>
            </div>
            <div>
            <select
                id='create-car-fuelType-selectfield'
                className='create-car-fields-class'
                name='fuelType'
                required
                onChange={(e) => setFuelType(e.target.value)}
              >
                {fuelTypeOptions.map((fuelType, i) => {
                  return (
                    <option key={i} value={fuelType}>{fuelType}</option>
                  )
                })}
              </select>
              {/* <span className="floating-label">Fuel Type</span> */}
            </div>
            <div>
            <select
                id='create-car-transmission-selectfield'
                className='create-car-fields-class'
                name='transmission'
                required
                onChange={(e) => setTransmission(e.target.value)}
              >
                {transmissionOptions.map((transmission, i) => {
                  return (
                    <option key={i} value={transmission}>{transmission}</option>
                  )
                })}
              </select>
              {/* <span className="floating-label">Transmission</span> */}
            </div>
            <div>
              <input
                id='create-car-engine-textfield'
                className='create-car-fields-class'
                name='engine'
                type='text'
                value={engine}
                required
                onChange={(e) => setEngine(e.target.value)}
              />
              <span className="floating-label">Engine</span>
            </div>
            <button className='create-car-sign-in-submit-button' type='submit'>Submit New Car</button>
            <button className='create-car-sign-in-submit-button' type='submit' onClick={(e) => {
              setYear(2019)
              // setMake('Acura')
              setModel('MDX')
              setTrim('3.5L')
              setMiles(3)
              setPrice(39990)
              // setCondition('Excellent')
              // setNew('New')
              // setExColor('Beign')
              setMpg(28)
              setEngine('V6 Cylinder Enginer')
            }}>Create Demo Car</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCarForm;
