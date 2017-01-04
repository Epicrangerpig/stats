from flask import Blueprint, jsonify
from app.models.ability import Ability
from app import db


blueprint = Blueprint('ability_api', __name__, url_prefix='/api/ability')

@blueprint.route('/')
def list():
    abilities = db.session.query(Ability).all()
    return jsonify(columns=['name', 'description'], data=[[ability.name, ability.description] for ability in abilities])
