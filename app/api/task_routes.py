from flask import Blueprint, jsonify, render_template
from flask_login import login_required
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

@task_routes.route('/new_task', methods=['POST'])
# @login_required
def post_new_task():
    console.log("inside POST route")
    payload = request.json
    form = NewTask()
    if form.validate_on_submit():
        new_task = NewTask(
            name=payload['name'],
            completed=payload['completed'],
            dueDate=payload['dueDate'],
            startDate=payload['startDate'],
            priority=payload['priority'],
            repeat_period=payload['repeat_period'],
            repeat_type=payload['repeat_type'],
            location=payload['location'],
            estimate=payload['estimate'],
            tags=payload['tags'],
            notes=payload['notes'],
            submit=payload['submit']
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'New task created successfully'})
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
