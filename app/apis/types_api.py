from flask import Blueprint, jsonify
from app.models.type import Type
from app import db


blueprint = Blueprint('types_api', __name__, url_prefix='/api/types')

@blueprint.route('/')
def get():
    types = Type.query.all()
    return jsonify(data=[dict(x) for x in types])
