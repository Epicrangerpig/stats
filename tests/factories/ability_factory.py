import factory
from app import db
from app.models.ability import Ability
from faker import Faker

faker = Faker()


class AbilityFactory(factory.alchemy.SQLAlchemyModelFactory):

    class Meta:
        model = Ability
        sqlalchemy_session = db.session
    
    name = faker.sentence(nb_words=1)
    description = faker.sentence(nb_words=20)
