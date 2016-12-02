from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app import db
from app.models.type import Type


class Pokemon(db.Model):
    __tablename__ = 'pokemon'

    id = Column(Integer, primary_key=True)
    ndex = Column(Integer)
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
        yield 'ndex', self.ndex
        yield 'name', self.name
        yield 'total', self.total
        yield 'hp', self.hp
        yield 'attack', self.attack
        yield 'defense', self.defense
        yield 'sp_attack', self.sp_attack
        yield 'sp_defense', self.sp_defense
        yield 'speed', self.speed
        yield 'type1', Type.query.get(self.type1_id).name
        if self.type2_id:
            yield 'type2', Type.query.get(self.type2_id).name
