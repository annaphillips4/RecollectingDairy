from flask import Blueprint, jsonify, render_template, request
from flask_login import current_user, login_required
from datetime import datetime
from app.models import Task, db
from app.forms import TaskForm
from .auth_routes import validation_errors_to_error_messages

task_routes = Blueprint('tasks', __name__)

@task_routes.route('')
@login_required
def all_tasks():
    all_tasks = Task.query.all()
    user_id = current_user.id
    owned_tasks = []
    assigned_tasks = []
    for task in all_tasks:
        if task.owner_id == user_id:
            owned_tasks.append(task)
        elif task.assigned_user_id == user_id:
            assigned_tasks.append(task)

    current_user_tasks = owned_tasks + assigned_tasks

    return {task.id: task.to_dict() for task in current_user_tasks}

@task_routes.route('/<int:task_id>')
@login_required
def task_by_id(task_id):
    task = Task.query.get(task_id)
    return task.to_dict()

@task_routes.route('/', methods=['POST'])
@login_required
def post_new_task():
    # print("inside POST route")
    payload = request.json
    form = TaskForm()
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
        # )
        new_task = Task(**payload)
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def edit_task(task_id):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': f'Task with ID {task_id} not found.'}), 404
    elif form.validate_on_submit():
        start_datetime_string = form.data['start_date']
        due_datetime_string = form.data['due_date']
        start_date = datetime.strptime(start_datetime_string, "%Y-%m-%dT%H:%M")
        due_date = datetime.strptime(due_datetime_string, "%Y-%m-%dT%H:%M")
        task.name = form.data['name']
        task.completed = form.data['completed']
        task.start_date = start_date
        task.due_date = due_date
        task.priority = form.data['priority']
        task.repeat_period = form.data['repeat_period']
        task.repeat_type = form.data['repeat_type']
        task.location = form.data['location']
        task.estimate = form.data['estimate']
        task.tags = form.data['tags']
        task.notes = form.data['notes']
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task_by_id(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': f'Task with ID {task_id} deleted successfully.'})
    else:
        return jsonify({'error': f'Task with ID {task_id} not found.'}), 404
