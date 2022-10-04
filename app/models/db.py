from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# saved_cars join table
saved_cars = db.Table(
  'saved_cars',
  db.Model.metadata,
  db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('cars', db.Integer, db.ForeignKey('cars.id'), primary_key=True)
)

# extra_features join table

# Car class
class Car(db.Model):
  __tablename__= "cars"
  id = db.Column(db.Integer, primary_key=True)
  seller_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  year = db.Column(db.Integer, nullable=False)
  make = db.Column(db.String, nullable=False)
  model = db.Column(db.String, nullable=False)
  trim = db.Column(db.String, nullable=False)
  miles = db.Column(db.Integer, nullable=False)
  price = db.Column(db.Integer, nullable=False)
  condition = db.Column(db.String, nullable=False)
  new = db.Column(db.Boolean, nullable=False)
  ex_color = db.Column(db.String, nullable=False)
  in_color = db.Column(db.String, nullable=False)
  drivetrain = db.Column(db.String, nullable=False)
  mpg = db.Column(db.Integer, nullable=False)
  fuel_type = db.Column(db.String, nullable=False)
  transmission = db.Column(db.String, nullable=False)
  engine = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, default=datetime.now)

  # Relationships
  user = db.relationship("User", back_populates="cars")
  reviews = db.relationship("Review", back_populates="car", cascade="all, delete")
  images = db.relationship("Image", back_populates="car", cascade="all, delete")
  car_saved_cars = db.relationship("User", back_populates="user_saved_cars", secondary=saved_cars)
  # extra_features = db.relationship("ExtraFeature", back_populates="car_extra_feature", secondary=extra_features)

  def to_dict(self):
    return {
      "id": self.id,
      "sellerId": self.seller_id,
      "year": self.year,
      "make": self.make,
      "model": self.model,
      "trim": self.trim,
      "miles": self.miles,
      "price": self.price,
      "condition": self.condition,
      "new": self.new,
      "exColor": self.ex_color,
      "inColor": self.in_color,
      "drivetrain": self.drivetrain,
      "mpg": self.mpg,
      "fuelType": self.fuel_type,
      "transmission": self.transmission,
      "engine": self.engine,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at,
      "user": self.user.to_dict_for_car(),
      "reviews": [review.to_dict() for review in self.reviews],
      "images": [image.to_dict() for image in self.images],
      "carSavedCars": [user.to_dict_for_car() for user in self.car_saved_cars]
      # "extraFeatures": self.extra_features
    }

  def to_dict_for_review(self):
    return {
      "id": self.id,
      "sellerId": self.seller_id,
      "year": self.year,
      "make": self.make,
      "model": self.model,
      "trim": self.trim,
      "miles": self.miles,
      "price": self.price,
      "condition": self.condition,
      "new": self.new,
      "exColor": self.ex_color,
      "inColor": self.in_color,
      "drivetrain": self.drivetrain,
      "mpg": self.mpg,
      "fuelType": self.fuel_type,
      "transmission": self.transmission,
      "engine": self.engine,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at,
      "user": self.user.to_dict_for_car(),
      # "reviews": [review.to_dict() for review in self.reviews],
      # "images": [image.to_dict() for image in self.images],
      # "carSavedCars": [user.to_dict_for_car() for user in self.car_saved_cars]
      # "extraFeatures": self.extra_features
    }


# Review class
class Review(db.Model):
  __tablename__ = "reviews"
  id = db.Column(db.Integer, primary_key=True)
  car_id = db.Column(db.Integer, db.ForeignKey("cars.id"))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  rating = db.Column(db.Integer, nullable=False)
  content = db.Column(db.String(50), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, default=datetime.now)

  # Relationships
  car = db.relationship("Car", back_populates="reviews")
  user = db.relationship("User", back_populates="reviews")

  def to_dict(self):
    return {
      "id": self.id,
      "carId": self.car_id,
      "userId": self.user_id,
      "rating": self.rating,
      "content": self.content,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at,
      # "car": self.car.to_dict_for_review(),
      "user": self.user.to_dict_for_car()
    }

# Images Class
class Image(db.Model):
  __tablename__ = "images"
  id = db.Column(db.Integer, primary_key=True)
  car_id = db.Column(db.Integer, db.ForeignKey("cars.id"))
  image_url = db.Column(db.String, nullable=False)

  # Relationships
  car = db.relationship("Car", back_populates="images")

  def to_dict(self):
    return {
      "id": self.id,
      "carId": self.car_id,
      "imageUrl": self.image_url
    }


# ExtraFeature Class
