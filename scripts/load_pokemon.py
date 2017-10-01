import pandas
from flask_script import Command
from app.models.pokemon import Pokemon
from app.models.type import Type
from app.models.ability import Ability
from app import db


class LoadPokemon(Command):

    "Loads pokemon"

    def run(self):
        data_frame = pandas.read_csv('data/pokemon.csv')

        for index, row in data_frame.iterrows():
            pokemon = Pokemon()
            pokemon.ndex = row['ndex']
            pokemon.name = row['species']
            pokemon.forme = row['forme']
            pokemon.attack = row['attack']
            pokemon.defense = row['defense']
            pokemon.sp_attack = row['spattack']
            pokemon.sp_defense = row['spdefense']
            pokemon.hp = row['hp']
            pokemon.total = row['total']
            pokemon.speed = row['speed']

            type1 = row['type1']
            type1_id = Type.query.filter_by(name=type1.lower()).first().id
            pokemon.type1_id = type1_id

            type2 = row['type2']
            if type(type2) is str:
                type2_id = Type.query.filter_by(name=type2.lower()).first().id
                pokemon.type2_id = type2_id

            ability1 = row['ability1']
            if type(ability1) is str:
                ability1_id = Ability.query.filter_by(name=ability1.lower()).first().id
                pokemon.ability1_id = ability1_id

            ability2 = row['ability2']
            if type(ability2) is str:
                try:
                    ability2_id = Ability.query.filter_by(name=ability2.lower()).first().id
                    pokemon.ability2_id = ability2_id
                except:
                    import pdb; pdb.set_trace()

            hidden_ability = row['abilityH']
            if type(hidden_ability) is str:
                hidden_ability_id = Ability.query.filter_by(name=hidden_ability.lower()).first().id
                pokemon.hidden_ability_id = hidden_ability_id

            db.session.add(pokemon)

        db.session.commit()
        print('Loaded {} pokemon'.format(len(data_frame)))
