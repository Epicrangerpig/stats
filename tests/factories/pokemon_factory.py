import factory
from app import db
from app.models.pokemon import Pokemon
from factories.type_factory import TypeFactory
from factories.ability_factory import AbilityFactory
from faker import Faker
from random import randint
from tests.factories import BaseFactory


faker = Faker()


class PokemonFactory(BaseFactory):

    class Meta:
        model = Pokemon
        sqlalchemy_session = db.session
    
    name = faker.name()
    forme = faker.name()
    ndex = randint(1, 900)
    attack = randint(1, 200)
    defense = randint(1, 200)
    sp_attack = randint(1, 200)
    sp_defense = randint(1, 200)
    hp = randint(1, 200)
    speed = randint(1, 200)
    total = attack + defense + sp_attack + sp_defense + hp + speed
    type1 = factory.SubFactory(TypeFactory)
    type2 = factory.SubFactory(TypeFactory)
    ability1 = factory.SubFactory(AbilityFactory)
    ability2 = factory.SubFactory(AbilityFactory)
    hidden_ability = factory.SubFactory(AbilityFactory)
