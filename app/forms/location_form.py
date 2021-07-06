from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DecimalField
from wtforms.validators import DataRequired


class LocationForm(FlaskForm):

    name = StringField("name", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    lat = DecimalField("lat", places=13, validators=[DataRequired()])
    lng = DecimalField("lng", places=13, validators=[DataRequired()])
