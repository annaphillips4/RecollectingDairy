from .db import db, environment, SCHEMA
from flask_login import UserMixin

class Task(db.Model, UserMixin):
  __tablename__ = 'tasks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  completed = db.Column(db.Boolean)
  dueDate = db.Column(db.Date)
  startDate = db.Column(db.Date)
  priority = db.Column(db.Integer)
  repeat_period = db.Column(db.Integer)
  repeat_type = db.Column(db.String(255))
  location = db.Column(db.String(255))
  estimate = db.Column(db.Integer, default=0)
  tags = db.Column(db.String(255))
  notes = db.Column(db.Text)
  listId = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete='CASCADE'), nullable=False)
  ownerId = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
  # assigned_user = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

  list = db.relationship('List', back_populates='task')
  owner = db.relationship('User', back_populates='task')
  # user = db.relationship('User', back_populates='user')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'completed': self.completed,
      'dueDate': self.dueDate,
      'startDate': self.startDate,
      'priority': self.priority,
      'repeat_period': self.repeat_period,
      'repeat_type': self.repeat_type,
      'location': self.location,
      'estimate': self.estimate,
      'tags': self.tags,
      'notes': self.notes,
      'listId': self.listId,
      'ownerId': self.ownerId,
      # 'assigned_user': self.assigned_user
    }
