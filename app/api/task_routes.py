from flask import Blueprint, jsonify, render_template, request
from flask_login import current_user, login_required
from app.models import Task, db
from ..forms.task_form import NewTask

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

@task_routes.route('/', methods=['POST'])
@login_required
def post_new_task():
    print("inside POST route")
    payload = request.json
    form = NewTask()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # new_task = NewTask(
        #     name=payload['name'],
        #     completed=payload['completed'],
        #     dueDate=payload['dueDate'],
        #     startDate=payload['startDate'],
        #     priority=payload['priority'],
        #     repeat_period=payload['repeat_period'],
        #     repeat_type=payload['repeat_type'],
        #     location=payload['location'],
        #     estimate=payload['estimate'],
        #     tags=payload['tags'],
        #     notes=payload['notes'],
        #     submit=payload['submit']
        # )
        new_task = Task(**request.json)
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()
    return jsonify({'error': '400 Bad Request'})

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
