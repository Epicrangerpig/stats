import pandas
from flask_script import Command
from app.models.ability import Ability
from app import db


class LoadAbility(Command):

    "Loads abilities"

    def run(self):
        data_frame = pandas.read_csv('data/abilities.csv')

        for index, row in data_frame.iterrows():
            ability = Ability()
            pokemon.ndex = row['ability']
            pokemon.name = row['description']
            db.session.add(ability)

        db.session.commit()
