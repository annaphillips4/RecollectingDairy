from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    completed = BooleanField()
    due_date = DateField()
    start_date = DateField()
    priority = IntegerField()
    repeat_period = IntegerField()
    repeat_type = StringField()
    location = StringField()
    estimate = IntegerField(default=0)
    tags = StringField()
    notes = TextAreaField()
    # submit = SubmitField()
