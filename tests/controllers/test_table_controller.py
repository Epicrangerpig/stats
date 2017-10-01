from test_base import BaseTestCase


class TestTableController(BaseTestCase):

    def test_table_path_should_be_ok(self):
        response = self.client.get('/')
        self.assert_200(response)
