from app import flask, db
from flask.ext.testing import TestCase
import logging

logging.getLogger('factory').setLevel(logging.WARN)


class BaseTestCase(TestCase):

    def create_app(self):
        flask.config.from_object('config.Testing')
        return flask

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
