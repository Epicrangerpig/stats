from test_base import BaseTestCase


class TestPokemonApi(BaseTestCase):

    def test_should_respond_ok_to_types_path(self):
        response = self.client.get('/api/types/')
        self.assert_200(response)
