from flask_script import Command
from app.models.type import Type
from app import db


class LoadTypes(Command):

    "Loads pokemon types"

    def run(self):
        types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
             'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

        for i, name in enumerate(types):
            type = Type()
            type.id = i+1
            type.name = name
            db.session.add(type)

        db.session.commit()
        print('Loaded {} types').format(len(types))
