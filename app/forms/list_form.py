from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import List

class ListForm(FlaskForm):
    
    name = StringField("name", validators=[DataRequired()])
    list_type = IntegerField("list_type", validators=[DataRequired()])
    notes = TextAreaField("notes")