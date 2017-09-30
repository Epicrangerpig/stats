from test_base import BaseTestCase
from factories.pokemon_factory import PokemonFactory
import json


class TestPokemonApi(BaseTestCase):

    def __get_data(self, response):
        data = json.loads(response.data.decode())
        data = data.get('data')
        return data

    def test_should_return_ok_to_pokemon_path(self):
        response = self.client.get('/api/pokemon/')
        self.assert_200(response)

    def test_get_should_return_empty_list(self):
        response = self.client.get('/api/pokemon/')
        data = self.__get_data(response)
        self.assertEqual(len(data), 0)

    def test_get_should_return_five_pokemon(self):
        PokemonFactory.create_batch(5)

        response = self.client.get('/api/pokemon/')
        data = self.__get_data(response)
        self.assertEqual(len(data), 5)

    def test_get_json_format(self):
        PokemonFactory()

        response = self.client.get('/api/pokemon/')
        data = self.__get_data(response)

        pokemon_data = data[0]
        stats = [
            'id', 'ndex', 'name', 'forme', 'total', 'hp', 'attack', 
            'defense', 'sp_attack', 'sp_defense', 'speed', 'type1', 'type2',
            'ability1', 'ability2', 'hidden_ability'
        ]

        self.assertEqual(len(pokemon_data.keys()), len(stats))
        
        for stat in stats:
            self.assertIn(stat, pokemon_data)

    def test_get_json_values_match_pokemon_values(self):
        pokemon = PokemonFactory()

        response = self.client.get('/api/pokemon/')
        data = self.__get_data(response)

        pokemon_data = data[0]
        pokemon_dict = dict(pokemon)

        for stat, value in pokemon_data.items():
            self.assertEqual(value, pokemon_dict.get(stat))
