import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getAllCarsThunk, updateCarThunk } from '../../../store/cars';
import './UpdateCarForm.css'

const UpdateCarForm = () => {
  const { carId } = useParams();
  const carsArray = useSelector(state => Object.values(state.cars));
  const carToUpdate = carsArray.find(car => car.id === +carId);
  const user = useSelector(state => state.session.user);

  // console.log('carToUpdate in UpdateCarForm', carToUpdate)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllCarsThunk())
  }, [dispatch])

  let newInitialState = carToUpdate?.new ? 'New' : 'Used'

  const [errors, setErrors] = useState([]);
  const [year, setYear] = useState(carToUpdate?.year);
  const [make, setMake] = useState(carToUpdate?.make);
  const [model, setModel] = useState(carToUpdate?.model);
  const [trim, setTrim] = useState(carToUpdate?.trim);
  const [miles, setMiles] = useState(carToUpdate?.miles);
  const [price, setPrice] = useState(carToUpdate?.price);
  const [condition, setCondition] = useState(carToUpdate?.trim);
  const [_new, setNew] = useState(newInitialState);
  const [exColor, setExColor] = useState(carToUpdate?.exColor);
  const [inColor, setInColor] = useState(carToUpdate?.inColor);
  const [drivetrain, setDrivetrain] = useState(carToUpdate?.drivetrain);
  const [mpg, setMpg] = useState(carToUpdate?.mpg);
  const [fuelType, setFuelType] = useState(carToUpdate?.fuelType);
  const [transmission, setTransmission] = useState(carToUpdate?.transmission);
  const [engine, setEngine] = useState(carToUpdate?.engine);

  const makeOptions = ['Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'INFINITI', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Nissan', 'Tesla', 'Toyota'];
  const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const newOptions = ['New', 'Used'];
  const exColorOptions = ['Beige', 'Black', 'Blue', 'Brown', 'Gold', 'Grey', 'Green', 'Orange', 'Purple', 'Red', 'Silver', 'White', 'Yellow'];
  const inColorOptions = ['Black', 'Grey', 'Tan'];
  const drivetrainOptions = ['All-wheel Drive', 'Front-wheel Drive', 'Rear-wheel Drive'];
  const fuelTypeOptions = ['Gasoline', 'Electric', 'Hybrid'];
  const transmissionOptions = ['Automatic', 'Manual'];

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
      alert('Could not update car.  Please see error messages above.')
      setErrors(errorsArray);
      return
    }

    let updatedCar = {
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

    dispatch(updateCarThunk(+carId, updatedCar))

    alert('Car succesfully updated!')
    history.push(`/cars/${carId}/images`);
  };

  if (!carToUpdate) return (<div>404: No car matching this Id number</div>)
  if (carToUpdate.sellerId !== +user.id) return (<div>403: Forbidden - This is not your car.</div>)

  return (
    <div id='create-car-page-overall-container'>
      <div id='create-car-page-second-container'>
        <div id='create-car-page-grid'>
          <div id='create-car-welcome-text'>
            <div id='create-car-welcome-big-text'>Update your car</div>
            <div id='create-car-welcome-small-text'>Please edit your car's details below. Do you want to edit only your car's <NavLink id='update-car-images-navlink' to={`/cars/${carId}/images`}>images</NavLink> instead? </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div id='create-car-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div id='create-car-form-grid-container'>
              <div id='create-car-form-left-container'>
                <div>
                  <input
                    id='create-car-year-textfield'
                    className='create-car-fields-class'
                    name='year'
                    type='number'
                    value={year}
                    required
                    defaultValue={carToUpdate.year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <span className="floating-label">Year</span>
                </div>
                <div>
                  {/* <label>Make: </label> */}
                  <select
                    id='create-car-make-selectfield'
                    className='create-car-fields-class-select'
                    name='make'
                    required
                    defaultValue={carToUpdate.make}
                    onChange={(e) => setMake(e.target.value)}
                  >
                    {makeOptions.map((make, i) => {
                      return (
                        <option key={i} value={make}>{make}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">Make</span>
                </div>
                <div>
                  <input
                    id='create-car-model-textfield'
                    className='create-car-fields-class'
                    name='model'
                    type='text'
                    value={model}
                    required
                    defaultValue={carToUpdate.model}
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
                    defaultValue={carToUpdate.trim}
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
                    defaultValue={carToUpdate.miles}
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
                    defaultValue={carToUpdate.price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className="floating-label">Price</span>
                </div>
                <div>
                <select
                    id='create-car-condition-selectfield'
                    className='create-car-fields-class-select'
                    name='condition'
                    required
                    defaultValue={carToUpdate.condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    {conditionOptions.map((condition, i) => {
                      return (
                        <option key={i} value={condition}>{condition}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">Condition</span>
                </div>
                <div>
                  <select
                    id='create-car-new-selectfield'
                    className='create-car-fields-class-select'
                    name='new'
                    required
                    defaultValue={newInitialState}
                    onChange={(e) => setNew(e.target.value)}
                  >
                    {newOptions.map((_new, i) => {
                      return (
                        <option key={i} value={_new}>{_new}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">New or Used?</span>
                </div>
              </div>
              <div id='create-car-form-right-container'>
                <div>
                  <select
                    id='create-car-exColor-selectfield'
                    className='create-car-fields-class-select'
                    name='exColor'
                    required
                    defaultValue={carToUpdate.exColor}
                    onChange={(e) => setExColor(e.target.value)}
                  >
                    {exColorOptions.map((exColor, i) => {
                      return (
                        <option key={i} value={exColor}>{exColor}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">Exterior Color</span>
                </div>
                <div>
                  <select
                    id='create-car-inColor-selectfield'
                    className='create-car-fields-class-select'
                    name='inColor'
                    required
                    defaultValue={carToUpdate.inColor}
                    onChange={(e) => setInColor(e.target.value)}
                  >
                    {inColorOptions.map((inColor, i) => {
                      return (
                        <option key={i} value={inColor}>{inColor}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">Interior Color</span>
                </div>
                <div>
                  <select
                    id='create-car-drivetrain-selectfield'
                    className='create-car-fields-class-select'
                    name='drivetrain'
                    required
                    defaultValue={carToUpdate.drivetrain}
                    onChange={(e) => setDrivetrain(e.target.value)}
                  >
                    {drivetrainOptions.map((drivetrain, i) => {
                      return (
                        <option key={i} value={drivetrain}>{drivetrain}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">Drivetrain</span>
                </div>
                <div>
                  <input
                    id='create-car-mpg-textfield'
                    className='create-car-fields-class'
                    name='mpg'
                    type='number'
                    value={mpg}
                    required
                    defaultValue={carToUpdate.mpg}
                    onChange={(e) => setMpg(e.target.value)}
                  />
                  <span className="floating-label">MPG</span>
                </div>
                <div>
                  <select
                    id='create-car-fuelType-selectfield'
                    className='create-car-fields-class-select'
                    name='fuelType'
                    required
                    defaultValue={carToUpdate.fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    {fuelTypeOptions.map((fuelType, i) => {
                      return (
                        <option key={i} value={fuelType}>{fuelType}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">Fuel Type</span>
                </div>
                <div>
                  <select
                    id='create-car-transmission-selectfield'
                    className='create-car-fields-class-select'
                    name='transmission'
                    required
                    defaultValue={carToUpdate.transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                  >
                    {transmissionOptions.map((transmission, i) => {
                      return (
                        <option key={i} value={transmission}>{transmission}</option>
                      )
                    })}
                  </select>
                  <span className="floating-label-select">Transmission</span>
                </div>
                <div>
                  <input
                    id='create-car-engine-textfield'
                    className='create-car-fields-class'
                    name='engine'
                    type='text'
                    value={engine}
                    required
                    defaultValue={carToUpdate.engine}
                    onChange={(e) => setEngine(e.target.value)}
                  />
                  <span className="floating-label">Engine</span>
                </div>
                <div id='create-car-buttons-container'>
                  <button className='create-car-submit-button' type='submit'>Update Your Car</button>
                  <button id='create-car-demo-info' className='create-car-submit-button' type='submit' onClick={(e) => {
                    setYear(2019)
                    setMake('Acura')
                    setModel('MDX')
                    setTrim('3.5L')
                    setMiles(88915)
                    setPrice(32998)
                    setCondition('Excellent')
                    setNew('Used')
                    setExColor('Blue')
                    setExColor('Black')
                    setDrivetrain('Front-wheel Drive')
                    setMpg(28)
                    setFuelType('Gasoline')
                    setTransmission('Automatic')
                    setEngine('V6 Cylinder Enginer')
                  }}>Use Demo Info</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCarForm;
