from test_base import BaseTestCase


class TestHomeController(BaseTestCase):

    def test_home_path_should_be_ok(self):
        response = self.client.get('/charts/')
        self.assert_200(response)
