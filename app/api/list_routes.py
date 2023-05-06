from flask import Blueprint, jsonify
from app.models import List

list_routes = Blueprint('lists', __name__)

@list_routes.route('/', methods=['GET'])
def lists():
  return {list.id: list.to_dict() for list in List.query.all()}
