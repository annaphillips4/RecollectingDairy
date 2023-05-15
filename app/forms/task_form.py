from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, TextAreaField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    completed = BooleanField()
    # due_date = DateField()
    # start_date = DateField()
    due_date = StringField()
    start_date = StringField()
    priority = IntegerField(default=0)
    repeat_period = IntegerField(default=0)
    repeat_type = StringField()
    location = StringField()
    estimate = IntegerField(default=0)
    tags = StringField()
    notes = TextAreaField()
