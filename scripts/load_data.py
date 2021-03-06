from flask_script import Command
from app.models.type import Type
from app.models.pokemon import Pokemon
from app.models.ability import Ability
from app import db
from scripts.load_types import LoadTypes
from scripts.load_pokemon import LoadPokemon
from scripts.load_ability import LoadAbility


class LoadData(Command):

    "Loads data"

    def run(self):
        Pokemon.query.delete()
        Type.query.delete()
        Ability.query.delete()
        LoadTypes().run()
        LoadAbility().run()
        LoadPokemon().run()
