import factory
from app import db
from app.models.type import Type
from faker import Faker

faker = Faker()


class TypeFactory(factory.alchemy.SQLAlchemyModelFactory):

    class Meta:
        model = Type
        sqlalchemy_session = db.session
    
    id = factory.Sequence(lambda n: n+1)
    name = faker.sentence(nb_words=1)
