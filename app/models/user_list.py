from .db import db, environment, SCHEMA
from flask_login import UserMixin

class User_list(db.Model, UserMixin):
  __tablename__ = 'users_list'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  userId = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
  listId = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete="CASCADE"), nullable=False)
  edit_priv = db.Column(db.Boolean)

  # user = db.relationship("User", back_populates="user")
  # list = db.relationship('List', back_populates='list')

  def to_dict(self):
    return {
      'userId': self.userId,
      'listId': self.listId,
      'edit_priv': self.edit_priv
    }
