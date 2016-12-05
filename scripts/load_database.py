from flask_script import Command
from app.models.type import Type
from app.models.pokemon import Pokemon
from app import db
from load_types import LoadTypes
from load_pokemon import LoadPokemon


class LoadDatabase(Command):

    "Loads database"

    def run(self):
        Pokemon.query.delete()
        Type.query.delete()
        LoadTypes().run()
        LoadPokemon().run()
