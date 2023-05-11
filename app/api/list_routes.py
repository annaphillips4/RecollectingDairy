from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app.models import List, db
from app.forms import ListForm
from .auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

@list_routes.route('', methods=['GET'])
def lists():
  return {list.id: list.to_dict() for list in List.query.all()}

@list_routes.route('/', methods=['POST'])
@login_required
def add_list():
    """
    Adds a new list
    """
    form = ListForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    name = request.json.name
    list_exists = List.query.filter(List.name == name, List.owner_id == current_user.id).first()
    if not list_exists:
       return jsonify({'error': "You already have a list with this name. Please choose another name."}), 400
    elif form.validate_on_submit():
        # list = List(
        #     name=form.data['name'],
        #     notes=form.data['notes']
        #     owner_id=form.data[current_user.id]
        # )
        list = List(**request.json)
        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_list(id):
   form = ListForm()
   list = List.query.filter(List.id == id, List.owner_id == current_user.id).first()
   if not list:
      return jsonify({'error': 'List not found'}), 404
   elif form.validate_on_submit():
      new_name = form.data['name']
      if new_name != list.name:
         name_taken = List.query.filter(List.name == new_name, List.owner_id == current_user.id).first()
         if name_taken and name_taken.id != list.id:
            return jsonify({'error': "Another one of your lists already has that name"}), 400

      list.name = form.data['name']
      list.notes = form.data['notes']
      db.session.commit()
      return list.to_dict()
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    list = List.query.filter(List.id == id, List.owner_id == current_user.id).first()
    if list:
        db.session.delete(list)
        db.session.commit()
        return jsonify({'message': f'List with ID {id} deleted successfully.'}), 200
    return jsonify({'error': f'List with ID {id} not found for user {current_user.username}.'}), 404
