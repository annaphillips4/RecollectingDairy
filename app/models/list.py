from .db import db, environment, SCHEMA
from flask_login import UserMixin

class List(db.Model, UserMixin):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    # num_tasks = db.Column(db.Integer)
    # num_completed = db.Column(db.Integer)
    notes = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    owner = db.relationship('User', back_populates='lists')
    list_users = db.relationship('List_User', back_populates='list')
    tasks = db.relationship('Task', back_populates='list')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            # 'numTasks': self.num_tasks,
            # 'numCompleted': self.num_completed,
            'notes': self.notes,
            'ownerId': self.owner_id
        }
