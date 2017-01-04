from sqlalchemy import Column, Integer, String
from app import db


class Ability(db.Model):
    __tablename__ = 'ability'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    description = Column(String(510))
