from os import getenv, listdir, getcwd, path
from importlib import import_module
from re import sub
from flask import Flask
from flask_runner import Manager
from flask_sqlalchemy import SQLAlchemy
from inflection import singularize
from flask_migrate import Migrate
from flask_cors import CORS


flask = Flask(__name__, template_folder=path.join(getcwd(), __name__, 'views'))
flask.config.from_object('config.' +  getenv('ENV', 'Development'))

db = SQLAlchemy(flask)
manager = Manager(flask)
migrate = Migrate(flask, db)
CORS(flask)

def register_blueprints(flask, package):
    package_dir = path.join(getcwd(), __name__, package)
    module_suffix = '_' + singularize(package) + '.py'

    module_names = [sub('\.py$', '', c)
                    for c in listdir(package_dir) if c.endswith(module_suffix)]

    for module_name in module_names:
        module = import_module(__name__ + '.%s.%s' % (package, module_name))
        flask.register_blueprint(module.blueprint)

register_blueprints(flask, 'controllers')
register_blueprints(flask, 'apis')
