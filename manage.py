from app import manager
from scripts.load_types import LoadTypes
from scripts.load_pokemon import LoadPokemon

manager.add_command('loadtypes', LoadTypes)
manager.add_command('loadpokemon', LoadPokemon)
manager.run()
