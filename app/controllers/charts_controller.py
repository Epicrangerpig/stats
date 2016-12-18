from flask import Blueprint, render_template
from app.models.pokemon import Pokemon


blueprint = Blueprint('charts_controller', __name__, url_prefix='/')

@blueprint.route('')
def index():
    pokemon = [dict(x) for x in Pokemon.query.all()]
    return render_template('charts/index.html', select=pokemon)
