# root/app/models/list.py
from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class List(db.Model, UserMixin):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)

    owner = db.relationship('User', back_populates='lists')
    list_users = db.relationship('List_User', back_populates='list')
    tasks = db.relationship('Task', back_populates='list', lazy='joined')

    def count_completed_tasks(self):
        completed_tasks = 0
        for task in self.tasks:
            if task.completed:
                completed_tasks += 1
        return completed_tasks

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'notes': self.notes,
            'ownerId': self.owner_id,
            'numTasks': len(self.tasks),
            'numCompleted': self.count_completed_tasks()
        }
