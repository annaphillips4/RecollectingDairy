from flask import Blueprint, jsonify, render_template
from flask_login import login_required
from app.models import Task, db
from .forms import NewTask

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/')
# @login_required
def all_tasks():
    tasks = Task.query.all()
    return {task.id: task.to_dict() for task in Task.query.all()}

@task_routes.route('/<int:id>')
# @login_required
def task_by_id(id):
    task = Task.query.get(id)
    return task.to_dict()

@task_routes.route('/new_task', methods=['POST'])
# @login_required
def post_new_task():
    form = NewTask()
    if form.validate_on_submit():
        new_task = NewTask(
            name=form.data['name'],
            completed=form.data['completed'],
            dueDate=form.data['dueDate'],
            startDate=form.data['startDate'],
            priority=form.data['priority'],
            repeat_period=form.data['repeat_period'],
            repeat_type=form.data['repeat_type'],
            location=form.data['location'],
            estimate=form.data['estimate'],
            tags=form.data['tags'],
            notes=form.data['notes'],
            submit=form.data['submit']
        )
        db.session.add(new_task)
        db.session.commit()
        return
    return jsonify({'error': f'Unable to create new task.'})

@task_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_task_by_id(id):
    task = Task.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': f'Task with ID {id} deleted successfully.'})
    else:
        return jsonify({'error': f'Task with ID {id} not found.'}), 404
