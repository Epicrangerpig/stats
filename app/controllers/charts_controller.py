from flask import Blueprint, render_template


blueprint = Blueprint('charts_controller', __name__, url_prefix='/charts')

@blueprint.route('/')
def index():
    return render_template('charts/index.html')
