from hashlib import new
from pyexpat import model
from flask import Blueprint, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Car, Review, Image
from app.forms import LoginForm, SignUpForm, CarForm, ImageForm, ReviewForm
from app.aws_upload import upload_file_to_s3, allowed_file, get_unique_filename
from .auth_routes import validation_errors_to_error_messages


car_routes = Blueprint('cars', __name__)

#GET all cars
@car_routes.route('/all')
def get_all_cars():
  cars = Car.query.all()
  return { "cars": [car.to_dict() for car in cars] }

#GET car by filtered results
# @car_routes.route('/results')
# def get_filtered_results():
#   args = request.args
#   print('\n')
#   print('\n')
#   print(args)
#   print('\n')
#   print('\n')

  # new = args.get("new", type=int)
  # make = args.get("make", type=str)
  # model = args.get("model", type=str)
  # max_price = args.get("max_price", type=int)
  # print(*args)
  # print(*args.values())
  # print(new)
  # print(make)
  # print(model)
  # print(max_price)

  # filters = {}
  # if new != None: filters['new'] = new
  # if make != None: filters['make'] = make
  # if model != None: filters['model'] = model
  # if max_price != None: filters['price'] = new




  # cars = Car.query.filter(
  #   Car.new == new,
  #   Car.make == make,
  #   Car.model == model,
  #   Car.price <= max_price).all()
  # return ''

  # return { "cars": [car.to_dict() for car in cars] }

#GET Car Details by Car ID
@car_routes.route('/<int:car_id>')
def get_car_details(car_id):
  car = Car.query.get_or_404(car_id)
  return car.to_dict()

#POST/Create new Car for sale
@car_routes.route('', methods=['POST'])
@login_required
def create_car():
  form = CarForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    try:
      new_car = Car(
        seller_id = int(current_user.id),
        year= int(form.data['year']),
        make = form.data['make'],
        model = form.data['model'],
        trim = form.data['trim'],
        miles = int(form.data['miles']),
        price = int(form.data['price']),
        condition = form.data['condition'],
        new = form.data['new'],
        ex_color = form.data['ex_color'],
        in_color = form.data['in_color'],
        drivetrain = form.data['drivetrain'],
        mpg = int(form.data['mpg']),
        fuel_type = form.data['fuel_type'],
        transmission = form.data['transmission'],
        engine = form.data['engine'],
        user = current_user
      )
    except:
      return { "error": "Could not create new car" }, 404
    db.session.add(new_car)
    db.session.commit()
    return new_car.to_dict(), 201
  return { "errors": validation_errors_to_error_messages(form.errors) }, 400


#PUT/Update car by car ID

@car_routes.route('/<int:car_id>', methods=['PUT'])
@login_required
def update_car_details(car_id):
  form = CarForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  car_to_update = Car.query.get_or_404(car_id)

  if car_to_update.seller_id != current_user.id:
    return { "error": "Forbidden.  This is not your car" }, 403

  if form.validate_on_submit():
    for key, value in form.data.items():
      setattr(car_to_update, key, value)
    db.session.commit()
    return car_to_update.to_dict()
  return { "errors": validation_errors_to_error_messages(form.errors) }, 400


#DELETE car by car ID

@car_routes.route('/<int:car_id>', methods=['DELETE'])
@login_required
def delete_car(car_id):
  car_to_delete = Car.query.get_or_404(car_id)
  # if car_to_delete == None:
  #   return { "error": "Car could not be found" }, 404
  if car_to_delete.seller_id != current_user.id:
    return { "error": "Forbidden.  This is not your car" }, 403

  db.session.delete(car_to_delete)
  db.session.commit()
  return { "message": "Successfully deleted car" }, 200



#POST/Add extra features to a car by car ID

#POST/Add new saved-cars to user's list by car ID
@car_routes.route('/<int:car_id>/saves', methods=['POST'])
@login_required
def save_car(car_id):
  car_to_save = Car.query.get_or_404(car_id)
  car_to_save.car_saved_cars.append(current_user)

  db.session.add(car_to_save)
  db.session.commit()
  return car_to_save.to_dict()

#DELETE/ saved-car from user's list by car ID
@car_routes.route('/<int:car_id>/saves', methods=['DELETE'])
@login_required
def unsave_car(car_id):
  car_to_unsave = Car.query.get_or_404(car_id)
  # car_to_unsave.car_saved_cars.append(current_user)
  for user in car_to_unsave.car_saved_cars:
    if user.id == current_user.id:
      car_to_unsave.car_saved_cars.remove(user)
      db.session.add(car_to_unsave)
      db.session.commit()
      return car_to_unsave.to_dict()

#POST/Add an Image to a Car
@car_routes.route('/<int:car_id>/images', methods=['POST'])
@login_required
def upload_image(car_id):
  if "image" not in request.files:
    return {"errors": "image required"}, 400

  image = request.files["image"]

  if not allowed_file(image.filename):
    return {"errors": "file type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload:
    # if the dictionary doesn't have a url key
    # it means that there was an error when we tried to upload
    # so we send back that error message
    return upload, 400

  url = upload["url"]
  # flask_login allows us to get the current user from the request
  new_image = Image(car_id = int(car_id), image_url=url)
  db.session.add(new_image)
  db.session.commit()
  return new_image.to_dict(), 201


# def create_image(car_id):
#   form = ImageForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     try:
#       new_image = Image(
#         car_id = int(car_id),
#         image_url = form.data['image_url']
#       )
#     except:
#       return { "error": "Could not create new image" }, 404
#     db.session.add(new_image)
#     db.session.commit()
#     return new_image.to_dict(), 201
#   return { "errors": validation_errors_to_error_messages(form.errors) }, 400

#POST/Add a Review for a Car
@car_routes.route('/<int:car_id>/reviews', methods=['POST'])
@login_required
def create_review(car_id):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    try:
      new_review = Review(
        car_id = int(car_id),
        user_id = int(current_user.id),
        rating = int(form.data['rating']),
        content = form.data['content']
      )
    except:
      return { "error": "Could not create new review" }, 404
    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict(), 201
  return { "errors": validation_errors_to_error_messages(form.errors) }, 400
