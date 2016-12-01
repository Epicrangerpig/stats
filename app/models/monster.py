from sqlalchemy import Column, Integer, Boolean
from app import db


class Monster(db.Model):
    __tablename__ = 'monster'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    total = Column(Integer)
    hp = Column(Integer)
    attack = Column(Integer)
    defense = Column(Integer)
    sp_attack = Column(Integer)
    sp_defense = Column(Integer)
    speed = Column(Integer)
    gen = Column(Integer) 
    legendary = Column(Boolean) 

    def __iter__(self):
        yield 'name', self.name
        yield 'total', self.total
        yield 'hp', self.hp
        yield 'attack', self.attack
        yield 'defense', self.defense
        yield 'sp_attack', self.sp_attack
        yield 'sp_defense', self.sp_defense
        yield 'speed', self.speed
        yield 'gen', self.gen
        yield 'legendary', self.legendary
