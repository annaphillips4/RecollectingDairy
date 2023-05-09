from flask import Blueprint, jsonify, request
from app.models import List, db
from app.forms import ListForm
from .auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

@list_routes.route('/', methods=['GET'])
def lists():
  return {list.id: list.to_dict() for list in List.query.all()}

@list_routes.route('/', methods=['POST'])
def add_list():
    """
    Adds a new list
    """
    form = ListForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list = List(
            name=form.data['name']
        )
        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
