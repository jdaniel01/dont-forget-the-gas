from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class ListForm(FlaskForm):
    
    name = StringField("name", validators=[DataRequired()])
    type_id = IntegerField("type_id", validators=[DataRequired()])
    notes = TextAreaField("notes")