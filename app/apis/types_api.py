from flask import Blueprint, jsonify
from app.models.type import Type
from app import db


blueprint = Blueprint('types_api', __name__, url_prefix='/api/types')

@blueprint.route('/')
def list():
    types = db.session.query(Type).all()
    return jsonify(columns=['name'], data=[type.name for type in types])
