from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
  image_url = StringField("image_url", validators=[DataRequired()])
