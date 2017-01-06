from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app import db


class Pokemon(db.Model):
    __tablename__ = 'pokemon'

    id = Column(Integer, primary_key=True)
    ndex = Column(Integer)
    name = Column(String(255))
    forme = Column(String(255))
    total = Column(Integer)
    hp = Column(Integer)
    attack = Column(Integer)
    defense = Column(Integer)
    sp_attack = Column(Integer)
    sp_defense = Column(Integer)
    speed = Column(Integer)

    type1_id = Column(Integer, ForeignKey('type.id'))
    type2_id = Column(Integer, ForeignKey('type.id'))
    type1 = db.relationship("Type", foreign_keys=[type1_id]) 
    type2 = db.relationship("Type", foreign_keys=[type2_id]) 

    ability1_id = Column(Integer, ForeignKey('ability.id'))
    ability2_id = Column(Integer, ForeignKey('ability.id'))
    hidden_ability_id = Column(Integer, ForeignKey('ability.id'))
    ability1 = db.relationship("Ability", foreign_keys=[ability1_id])
    ability2 = db.relationship("Ability", foreign_keys=[ability2_id])
    hidden_ability = db.relationship("Ability", foreign_keys=[hidden_ability_id])


    def __iter__(self):
        yield 'id', self.id
        yield 'ndex', self.ndex
        yield 'name', self.name
        yield 'forme', self.forme
        yield 'total', self.total
        yield 'hp', self.hp
        yield 'attack', self.attack
        yield 'defense', self.defense
        yield 'sp_attack', self.sp_attack
        yield 'sp_defense', self.sp_defense
        yield 'speed', self.speed
        yield 'type1', self.type1.name
        yield 'type2', self.type2.name if self.type2_id else ''
        yield 'ability1', self.ability1.name if self.ability1_id else ''
        yield 'ability2', self.ability2.name if self.ability2_id else ''
        yield 'hidden_ability', self.hidden_ability.name if self.hidden_ability_id else ''
