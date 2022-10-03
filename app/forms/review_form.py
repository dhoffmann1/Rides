from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
  rating = IntegerField("rating", validators=[DataRequired()])
  content = StringField("content", validators=[DataRequired()])
