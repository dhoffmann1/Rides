from flask import Blueprint, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Car, Review
from app.forms import LoginForm, SignUpForm, NewCarForm, ReviewForm
from .auth_routes import validation_errors_to_error_messages


car_routes = Blueprint('cars', __name__)

#GET all cars
@car_routes.route('/all')
def get_all_cars():
  cars = Car.query.all()
  return { "cars": [car.to_dict() for car in cars] }

#GET car by filtered results
@car_routes.route('/results')
def get_filtered_results():
  pass

#GET Car Details by Car ID
@car_routes.route('/<int:car_id>')
def get_car_details(car_id):
  car = Car.query.get(car_id)
  if car == None:
    return { 'message': 'Car could not be found' }, 404
  return car.to_dict()

#POST/Create new Car for sale
@car_routes.route('', methods = ['POST'])
@login_required
def create_car():
  form = NewCarForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    try:
      # select_user = User.query.get(int(current_user.id))
      new_car = Car(
        post_url= str(form.data["post_url"]),
        city= str(form.data["city"]),
        state= str(form.data["state"]),
        country= str(form.data["country"]),
        caption= str(form.data["caption"]),
        user = current_user
      )
    except:
      return {"error": "SHOULD NEVER REACH HERE EVER"}, 404
    db.session.add(new_car)
    db.session.commit()
    # created_post = Post.query.filter(current_user.id == post.owner_id).order_by(Post.created_at.desc()).first()
    return new_car.to_dict(), 201
  return {"errors": validation_errors_to_error_messages(form.errors)}, 400


#PUT/Update car by car ID

#DELETE car by car ID

#GET Car reviews by car ID




#GET Cars Extra Features by car ID

#POST/Add extra features to a car by car ID

#POST/Add new saved-cars to user's list by car ID

#DELETE saved-car from user's list by car ID

#GET cars images by car ID
