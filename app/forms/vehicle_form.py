from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class VehicleForm(FlaskForm):

    make = StringField("make", validators=[DataRequired()])
    model = StringField("model", validators=[DataRequired()])
    body = StringField("body", validators=[DataRequired()])
    storage = FloatField("storage", validators=[DataRequired()])
    color = StringField("color", validators=[DataRequired()])
    capacity = Integer("capacity", validators=[DataRequired()])
    total_miles = FloatField("storage", validators=[DataRequired()])
    fuel_type = StringField("fuel_type", validators=[DataRequired()])
    fuel_tank = FloatField("fuel_tank", validators=[DataRequired()])
    avg_mpg = FloatField("avg_mpg", validators=[DataRequired()])
