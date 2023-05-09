from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class NewTask(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    completed = BooleanField()
    dueDate = DateField()
    startDate = DateField()
    priority = IntegerField()
    repeat_period = IntegerField()
    repeat_type = StringField()
    location = StringField()
    estimate = IntegerField(default=0)
    tags = StringField()
    notes = TextAreaField()
    submit = SubmitField
