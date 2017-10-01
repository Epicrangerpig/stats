from test_base import BaseTestCase
from app.models.type import Type
from factories.type_factory import TypeFactory
from scripts.load_types import LoadTypes
import json


class TestTypesApi(BaseTestCase):

    def __get_data(self, response):
        data = json.loads(response.data.decode())
        data = data.get('data')
        return data

    def test_should_return_ok_to_types_path(self):
        response = self.client.get('/api/types/')
        self.assert_200(response)

    def test_get_should_return_empty_list(self):
        response = self.client.get('/api/types/')
        data = self.__get_data(response)
        self.assertEqual(len(data), 0)

    def test_get_should_return_five_types(self):
        TypeFactory.create_batch(5)

        response = self.client.get('/api/types/')
        data = self.__get_data(response)
        self.assertEqual(len(data), 5)

    def test_get_json_format(self):
        TypeFactory()

        response = self.client.get('/api/types/')
        data = self.__get_data(response)

        type_data = data[0]

        self.assertEqual(len(type_data.keys()), 2)
        self.assertIn('name', type_data)
        self.assertIn('color', type_data)

    def test_get_json_values_match_type_values(self):
        pokemon_type = TypeFactory()

        response = self.client.get('/api/types/')
        data = self.__get_data(response)

        type_data = data[0]
        type_dict = dict(pokemon_type)

        self.assertEqual(type_data['name'], type_dict.get('name'))
        self.assertEqual(type_data['color'], type_dict.get('color'))
