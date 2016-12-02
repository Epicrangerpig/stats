from sqlalchemy import Column, Integer, String
from app import db


class Type(db.Model):
    __tablename__ = 'type'

    id = Column(Integer, primary_key=True)
    name = Column(String)
