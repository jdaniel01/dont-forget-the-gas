from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired

class TripForm(FlaskForm):

    lead_id = IntegerField("lead_id", validators=[DataRequired()])
    departure = DateField("departure", validators=[DataRequired()])
    arrival = DateField("arrival", validators=[DataRequired()])
    days = IntegerField("days", validators=[DataRequired()])
    distance = FloatField("distance", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    