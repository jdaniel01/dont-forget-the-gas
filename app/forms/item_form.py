from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class ItemForm(FlaskForm):
    
    # name = StringField("name", validators=[DataRequired()])
    list_id = IntegerField("list_id", validators=[DataRequired()])
    # notes = TextAreaField("notes")