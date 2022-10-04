import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCarsThunk } from '../../../store/cars';
import { createImageThunk, deleteImageThunk } from '../../../store/images';

import './CreateCarImages.css'

const CreateCarImages = () => {
  const user = useSelector(state => state.session.user);
  const carsArray = useSelector(state => Object.values(state.cars))
  const { carId } = useParams();

  const car = carsArray.find(car => car.id === +carId)

  const [errors, setErrors] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [displayImage, setDisplayImage] = useState('https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationId, setShowConfirmationId] = useState(0);
  const [forceRender, setForceRender] = useState(false);

  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    dispatch(getAllCarsThunk())
  }, [dispatch, carId, forceRender])

  const handleDelete = image => {
    dispatch(deleteImageThunk(image.id))
    setShowConfirmation(false)
    if (image.imageUrl === displayImage) setDisplayImage('https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png')
    setErrors([])
    setForceRender(!forceRender)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([])
    let errorsArray = []


    // Check the extensions of the images
    let allowedImageExtensions = ['.jpg', '.jpeg', '.png'];
    if (!allowedImageExtensions.some(ext => imageUrl.slice(-5).toLowerCase().includes(ext))) errorsArray.push('Image Url must end in .jpg, .jpeg or .png.')    // if (year < 1950 || year > 2024) errorsArray.push('Year must be between 1950 and 2024.');
    // Make sure the car does not have more than 12 images
    if (car.images.length >= 12) errorsArray.push('A car can only have up to 12 images.')

    if (errorsArray.length > 0) {
      alert('Could not create image.  Please see error messages above.')
      setErrors(errorsArray);
      return
    }

    await dispatch(createImageThunk(carId, { image_url: imageUrl }))
    // alert('Image successfully added')
    setImageUrl('');


    setForceRender(!forceRender)
  };

  if (!car) return (<></>)
  if (user.id !== car.sellerId) return (<div>403: You are not the owner of this vehicle and do not have permission to view this page.</div>)

  return (
    <div id='create-image-page-overall-container'>
      <div id='create-image-page-second-container'>
        <div id='create-image-page-grid'>
          <div id='create-image-welcome-text'>
            <div id='create-image-welcome-big-text'>{car.year} {car.make} {car.model} {car.trim} - Images</div>
            <div id='create-image-welcome-small-text'>Please use this page to add and delete images from this vehicle. Click on an image to enlarge it.</div>
          </div>
          <div id='create-images-preview-container'>
            <div id='create-images-large-preview-container'>
              <div id='large-preview-wrapper'>
                {car?.images?.length === 0 && <img id='large-preview-image' src={'https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg'} alt='large-preview' onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} />}
                {car?.images?.length > 0 && <img id='large-preview-image' src={displayImage} alt='large-preview' onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} />}
              </div>
            </div>
            <div id='small-images-container'>
              <div id='small-images-grid'>
                {car?.images?.map((image, index) => {
                  return (
                    <div id='small-images-wrapper' key={index}>
                      <img id='small-images' src={image.imageUrl} alt={`car ${index}`} onClick={() => setDisplayImage(image.imageUrl)} onError={e => { e.currentTarget.src = 'https://eyadmousacars.com/wp-content/themes/maxwheels/libs/images/no-image.png'; }} />
                      <span id='delete-small-images' onClick={() => {
                        setShowConfirmation(!showConfirmation)
                        setShowConfirmationId(image.id)
                      }}><i class="fa-solid fa-xmark"></i></span>
                      {showConfirmation && showConfirmationId === image.id && (
                        <span id='confirmation-container'>
                          <div id='confirmation-text'>Are you sure you want to delete this Image?</div>
                          <div id='confirmation-options-container'>
                            <div id='confirmation-yes' onClick={() => handleDelete(image)}>Yes</div>
                            <div id='confirmation-no' onClick={() => setShowConfirmation(false)}>No</div>
                          </div>
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div id='create-image-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                id='create-image-textfield'
                className='create-image-fields-class'
                name='imageUrl'
                type='text'
                value={imageUrl}
                required
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <span className="floating-label-images">New Image URL</span>
            </div>
            <div id='create-image-buttons-container'>
              <button className='create-image-sign-in-submit-button' type='submit'>Submit Image</button>
              <button id='create-image-demo-info' className='create-image-sign-in-submit-button' type='submit' onClick={(e) => {
                setImageUrl('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg')
              }}>Create Demo Image</button>
            </div>
            {/* <div id='create-image-go-to-your-garage' onClick={() => history.push('/cars/your-garage')}>Go To Your Garage</div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCarImages;
