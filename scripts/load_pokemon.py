import pandas
from flask_script import Command
from app.models.pokemon import Pokemon
from app import db


class LoadPokemon(Command):

    "Loads pokemon"

    def run(self):
        data_frame = pandas.read_csv('data/pokemon.csv')

        for index, row in data_frame.iterrows():
            pokemon = Pokemon()
            pokemon.id = row['id']
            pokemon.name = row['species']
            pokemon.attack = row['attack']
            pokemon.defense = row['defense']
            pokemon.sp_attack = row['spattack']
            pokemon.sp_defense = row['spdefense']
            pokemon.hp = row['hp']
            pokemon.total = row['total']
            pokemon.speed = row['speed']
            db.session.add(pokemon)

        db.session.commit()
