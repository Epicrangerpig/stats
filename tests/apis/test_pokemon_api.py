from test_base import BaseTestCase
from factories.pokemon_factory import PokemonFactory
import json


STATS = [
    'id', 'ndex', 'name', 'forme', 'total', 'hp', 'attack', 
    'defense', 'sp_attack', 'sp_defense', 'speed', 'type1', 'type2',
    'ability1', 'ability2', 'hidden_ability'
]

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

        self.assertEqual(len(pokemon_data.keys()), len(STATS))
        
        for stat in STATS:
            self.assertIn(stat, pokemon_data)

    def test_get_json_values_match_pokemon_values(self):
        pokemon = PokemonFactory()

        response = self.client.get('/api/pokemon/')
        data = self.__get_data(response)

        pokemon_data = data[0]
        pokemon_dict = dict(pokemon)

        for stat, value in pokemon_data.items():
            self.assertEqual(value, pokemon_dict.get(stat))


    def test_get_with_id_should_return_only_one_pokemon(self):
        pokemon_list = PokemonFactory.create_batch(5)
        pokemon = pokemon_list[0]

        response = self.client.get('/api/pokemon/{}'.format(pokemon.id))
        data = self.__get_data(response)

        self.assertEqual(type(data), dict)
        self.assertEqual(len(data), 16)

    def test_get_with_id_json_format(self):
        pokemon_list = PokemonFactory.create_batch(5)
        pokemon = pokemon_list[0]

        response = self.client.get('/api/pokemon/{}'.format(pokemon.id))
        data = self.__get_data(response)

        self.assertEqual(len(data.keys()), len(STATS))
        
        for stat in STATS:
            self.assertIn(stat, data)
