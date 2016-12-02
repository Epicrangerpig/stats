from sqlalchemy import Column, Integer, String, ForeignKey
from app import db
from app.models.type import Type


class Pokemon(db.Model):
    __tablename__ = 'pokemon'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    total = Column(Integer)
    hp = Column(Integer)
    attack = Column(Integer)
    defense = Column(Integer)
    sp_attack = Column(Integer)
    sp_defense = Column(Integer)
    speed = Column(Integer)
    type1_id = Column(Integer, ForeignKey('type.id'))
    type2_id = Column(Integer, ForeignKey('type.id'))

    def __iter__(self):
        yield 'id', self.id
        yield 'name', self.name
        yield 'total', self.total
        yield 'hp', self.hp
        yield 'attack', self.attack
        yield 'defense', self.defense
        yield 'sp_attack', self.sp_attack
        yield 'sp_defense', self.sp_defense
        yield 'speed', self.speed
