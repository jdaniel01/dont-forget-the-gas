from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class EditorForm(FlaskForm):
    
    user_id = IntegerField("user_id", validators=[DataRequired()])
    list_id = IntegerField("list_id", validators=[DataRequired()])
    needs_approval = TextAreaField("needs_approval")
