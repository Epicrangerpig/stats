from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app import db


class Type(db.Model):
    __tablename__ = 'type'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    color = Column(String(10))
    
    def __iter__(self):
        yield 'name', self.name
        yield 'color', self.color
