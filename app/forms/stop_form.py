from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class StopForm(FlaskForm):

    trip_id = IntegerField("trip_id", validators=[DataRequired()])
    location_id = IntegerField("location_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    is_start = BooleanField("is_start", validators=[DataRequired()])
    is_end = BooleanField("is_end", validators=[DataRequired()])
    description = TextAreaField("description")
    