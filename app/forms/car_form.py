from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class CarForm(FlaskForm):
  year = IntegerField("year", validators=[DataRequired()])
  make = StringField("Make", validators=[DataRequired()])
  model = StringField("Model", validators=[DataRequired()])
  trim = StringField("Trim", validators=[DataRequired()])
  miles = IntegerField("Miles", validators=[DataRequired()])
  price = IntegerField("Price", validators=[DataRequired()])
  condition = StringField("Condition", validators=[DataRequired()])
  new = BooleanField("New")
  ex_color = StringField("Exterior Color", validators=[DataRequired()])
  in_color = StringField("Interior Color", validators=[DataRequired()])
  drivetrain = StringField("Drivetrain", validators=[DataRequired()])
  mpg = IntegerField("MPG", validators=[DataRequired()])
  fuel_type = StringField("Fuel Type", validators=[DataRequired()])
  transmission = StringField("Transmission", validators=[DataRequired()])
  engine = StringField("Engine", validators=[DataRequired()])
