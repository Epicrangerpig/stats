from flask_script import Command
from app.models.type import Type
from app.models.pokemon import Pokemon
from app.models.ability import Ability
from app import db
from load_types import LoadTypes
from load_pokemon import LoadPokemon
from load_ability import LoadAbility


class LoadData(Command):

    "Loads data"

    def run(self):
        Pokemon.query.delete()
        Type.query.delete()
        Ability.query.delete()
        LoadTypes().run()
        LoadPokemon().run()
        LoadAbility().run()
