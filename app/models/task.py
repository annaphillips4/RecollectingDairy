from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Task(db.Model, UserMixin):
  __tablename__ = 'tasks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  completed = db.Column(db.Boolean)
  due_date = db.Column(db.Date)
  start_date = db.Column(db.Date)
  priority = db.Column(db.Integer)
  repeat_period = db.Column(db.Integer)
  repeat_type = db.Column(db.String(255))
  location = db.Column(db.String(255))
  estimate = db.Column(db.Integer, default=0)
  tags = db.Column(db.String(255))
  notes = db.Column(db.Text)
<<<<<<< HEAD
  list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id'), ondelete='CASCADE'), nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
  assigned_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=True)
=======
  list_id = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete='CASCADE'))
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
  assigned_user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=True)
>>>>>>> 56d7fdf0e87beb0500f016079d2ed88615f22f6d

  list = db.relationship('List', back_populates='tasks')
  owner = db.relationship(
    'User', back_populates='owned_tasks',
    foreign_keys=[owner_id], lazy='joined'
    )
  assigned_user = db.relationship(
    'User', back_populates='assigned_tasks',
    foreign_keys=[assigned_user_id], lazy='joined'
    )

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'completed': self.completed,
      'dueDate': self.due_date,
      'startDate': self.start_date,
      'priority': self.priority,
      'repeatPeriod': self.repeat_period,
      'repeatType': self.repeat_type,
      'location': self.location,
      'estimate': self.estimate,
      'tags': self.tags,
      'notes': self.notes,
      'listId': self.list_id,
      'ownerId': self.owner_id,
      'assignedUserId': self.assigned_user_id
    }
