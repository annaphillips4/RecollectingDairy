from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import List

# this should be updated to check whether the current user
# has a list with the same name, rather than checking all
# list names in the db

# def list_exists(form, field):
#     name = field.data
#     list = List.query.filter(List.name == name, List.owner_id == current_user.id).first()
#     if list:
#         raise ValidationError("You already have a list with this name. Please choose another name.")

class ListForm(FlaskForm):
    # name = StringField('name', validators=[DataRequired(), list_exists])
    name = StringField('name', validators=[DataRequired()])
    # num_tasks = IntegerField('num_tasks')
    # num_completed = IntegerField('num_completed')
    notes = StringField('notes')
