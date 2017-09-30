import factory
from app import db
from app.models.ability import Ability
from faker import Faker
from base_factory import BaseFactory

faker = Faker()


class AbilityFactory(BaseFactory):

    class Meta:
        model = Ability
    
    name = faker.sentence(nb_words=1)
    description = faker.sentence(nb_words=10)
