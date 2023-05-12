from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class List_User(db.Model, UserMixin):
  __tablename__ = 'list_users'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
  list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id'), ondelete="CASCADE"), nullable=False)
  edit_priv = db.Column(db.Boolean, default=False, nullable=False)

  user = db.relationship('User', back_populates='list_users')
  list = db.relationship('List', back_populates='list_users')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'listId': self.list_id,
      'edit_priv': self.edit_priv
    }
