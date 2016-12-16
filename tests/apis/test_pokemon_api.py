from test_base import BaseTestCase
from app.models.pokemon import Pokemon
from app.models.type import Type
from factories.pokemon_factory import PokemonFactory
from scripts.load_types import LoadTypes


class TestPokemonApi(BaseTestCase):


    def setUp(self):
        PokemonFactory.create_batch(10)


    def tearDown(self):
        Pokemon.query.delete()


    def test_api_should_return_10_pokemon(self):
        response = self.client.get('/api/pokemon/')
        self.assertEqual(len(response.json['data']), 10)


    def test_each_pokemon_in_json_should_have_13_attrs(self):
        response = self.client.get("/api/pokemon/")
        for pokemon in response.json['data']:
            fields = ['ndex', 'name', 'forme', 'total', 'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed', 'type1', 'type2', 'id']
            self.assertTrue(set(fields).issubset(pokemon))
            self.assertEqual(len(pokemon), 13)


    def test_pokemon_attrs_should_have_right_variable_types(self):
        response = self.client.get("/api/pokemon/")
        for pokemon in response.json['data']:
            self.assertTrue(type(pokemon['ndex']) is int)
            self.assertTrue(type(pokemon['name']) in [str, unicode])
            self.assertTrue(type(pokemon['forme']) in [str, unicode])
            self.assertTrue(type(pokemon['total']) is int)
            self.assertTrue(type(pokemon['hp']) is int)
            self.assertTrue(type(pokemon['attack']) is int)
            self.assertTrue(type(pokemon['defense']) is int)
            self.assertTrue(type(pokemon['sp_attack']) is int)
            self.assertTrue(type(pokemon['sp_defense']) is int)
            self.assertTrue(type(pokemon['speed']) is int)
            self.assertTrue(type(pokemon['type1']) in [str, unicode])
            self.assertTrue(type(pokemon['type2']) in [str, unicode])
            self.assertTrue(type(pokemon['id']) is int)


    def test_pokemon_total_should_be_sum_of_other_stats(self):
        response = self.client.get("/api/pokemon/")
        for pokemon in response.json['data']:
            total = pokemon['attack'] + pokemon['defense'] + pokemon['sp_attack'] + pokemon['sp_defense'] + pokemon['hp'] + pokemon['speed']
            self.assertEqual(total, pokemon['total'])
