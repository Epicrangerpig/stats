from flask import Blueprint, jsonify
from app.models.pokemon import Pokemon
from app import db


blueprint = Blueprint('pokemon_api', __name__, url_prefix='/api/pokemon')


@blueprint.route('/')
def json():
    pokemon = db.session.query(Pokemon).all()
    return jsonify(data=[dict(x) for x in pokemon])


@blueprint.route('/<pokemon_id>')
def get_pokemon(pokemon_id):
    pokemon = Pokemon.query.get(pokemon_id)
    return jsonify(dict(pokemon))
