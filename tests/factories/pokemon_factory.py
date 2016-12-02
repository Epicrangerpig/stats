import factory
from app import db
from app.models.pokemon import Pokemon


class PokemonFactory(factory.alchemy.SQLAlchemyModelFactory):

    class Meta:
        model = Pokemon
        sqlalchemy_session = db.session
    
    name = 'asddfdsa'
    ndex = 1
    attack = 10
    defense = 10
    sp_attack = 10
    sp_defense = 10
    hp = 10
    total = 60
    speed = 10
    type1_id = 1
    type2_id = 2
