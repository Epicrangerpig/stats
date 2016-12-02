from test_base import BaseTestCase


class TestPokemonApi(BaseTestCase):

    def test_should_respond_ok_to_pokemon_path(self):
        response = self.client.get('/api/pokemon/')
        self.assert_200(response)
