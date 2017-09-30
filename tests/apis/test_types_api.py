from test_base import BaseTestCase
from app.models.type import Type
from factories.type_factory import TypeFactory
from scripts.load_types import LoadTypes


class TestTypesApi(BaseTestCase):


    def setUp(self):
        super(TestTypesApi, self).setUp()
        TypeFactory.create_batch(10)

    def tearDown(self):
        Type.query.delete()
        super(TestTypesApi, self).tearDown()

    def test_api_should_return_10_types(self):
        response = self.client.get('/api/types/')
        self.assertEqual(len(response.json['data']), 10)

    def test_json_should_have_columns_and_data_only(self):
        response = self.client.get('/api/types/')
        self.assertEqual(len(response.json), 2)
        self.assertIn('columns', response.json)
        self.assertIn('data', response.json)
