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
