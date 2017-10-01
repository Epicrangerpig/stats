from flask_script import Command
from app.models.type import Type
from app import db


class LoadTypes(Command):

    "Loads pokemon types"

    def run(self):
        pokemon_types = [
            ('normal', '#A8A77A'),
            ('fire', '#EE8130'),
            ('water', '#6390F0'),
            ('electric', '#F7D02C'),
            ('grass', '#7AC74C'),
            ('ice', '#96D9D6'),
            ('fighting', '#C22E28'),
            ('poison', '#A33EA1'),
            ('ground', '#E2BF65'),
            ('flying', '#A98FF3'),
            ('psychic', '#F95587'),
            ('bug', '#A6B91A'),
            ('rock', '#B6A136'),
            ('ghost', '#735797'),
            ('dragon', '#6F35FC'),
            ('dark', '#705746'),
            ('steel', '#B7B7CE'),
            ('fairy', '#D685AD'),
        ]

        for i, pokemon_type in enumerate(pokemon_types):
            pokemon_type = Type(id=i+1, name=pokemon_type[0], color=pokemon_type[1])
            db.session.add(pokemon_type)

        db.session.commit()
        print('Loaded {} types'.format(len(pokemon_types)))
