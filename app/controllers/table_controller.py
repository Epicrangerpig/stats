from flask import Blueprint, render_template


blueprint = Blueprint('table_controller', __name__, url_prefix='/')

@blueprint.route('')
def index():
    return render_template('table/index.html')
