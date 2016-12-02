from app import manager
from scripts.load_types import LoadTypes
from scripts.load_pokemon import LoadPokemon
from flask_migrate import MigrateCommand


manager.add_command('loadtypes', LoadTypes)
manager.add_command('loadpokemon', LoadPokemon)
manager.add_command('db', MigrateCommand)
manager.run()
