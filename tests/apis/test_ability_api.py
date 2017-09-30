from test_base import BaseTestCase
from app.models.ability import Ability
from factories.ability_factory import AbilityFactory
from scripts.load_ability import LoadAbility


class TestAbilityApi(BaseTestCase):


    def setUp(self):
        super().setUp()
        AbilityFactory.create_batch(10)

    def tearDown(self):
        Ability.query.delete()
        super().tearDown()

    def test_api_should_return_10_abilities(self):
        response = self.client.get('/api/ability/')
        self.assertEqual(len(response.json['data']), 10)

    def test_json_should_have_columns_and_data_only(self):
        response = self.client.get('/api/ability/')
        self.assertEqual(len(response.json), 2)
        self.assertIn('columns', response.json)
        self.assertIn('data', response.json)

    def test_data_should_have_list_of_abilities(self):
        response = self.client.get('/api/ability/')
        self.assertEqual(len(response.json['data']), 10)

    def test_each_ability_should_have_two_elements(self):
        response = self.client.get('/api/ability/')
        for ability in response.json['data']:
            self.assertEqual(len(ability), 2)