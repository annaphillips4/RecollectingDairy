from .db import db, environment, SCHEMA
from flask_login import UserMixin

class List_User(db.Model, UserMixin):
  __tablename__ = 'list_users'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
  list_id = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete="CASCADE"), nullable=False)
  edit_priv = db.Column(db.Boolean, default=False, nullable=False)

  user = db.relationship('User', back_populates='list_users')
  list = db.relationship('List', back_populates='list_users')

  def to_dict(self):
    return {
      'userId': self.user_id,
      'listId': self.list_id,
      'edit_priv': self.edit_priv
    }
