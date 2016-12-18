from flask import Blueprint, jsonify, request
from app.models.pokemon import Pokemon
from app import db


blueprint = Blueprint('pokemon_api', __name__, url_prefix='/api/pokemon')


@blueprint.route('/')
def json():
    pokemon = db.session.query(Pokemon).all()
    return jsonify(data=[dict(x) for x in pokemon])


@blueprint.route('/get', methods=['POST'])
def get_pokemon():
    pokemon_ids = request.form.getlist('ids[]', type=int)
    pokemon_list = []
    for pokemon_id in pokemon_ids:
        pokemon = Pokemon.query.get(pokemon_id)
        pokemon_list.append(pokemon)
    return jsonify(data=[dict(x) for x in pokemon_list])
