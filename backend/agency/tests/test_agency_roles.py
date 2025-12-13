from django.test import TestCase


class TestAgencyRolesTestCase(TestCase):
    def test_agency_role_choices(self):
        from agency.models import RoleChoices

        self.assertEqual(RoleChoices.narrator.value, 'narrator')
        self.assertEqual(RoleChoices.speaker.value, 'speaker')
        self.assertEqual(RoleChoices.listener.value, 'listener')
        self.assertEqual(RoleChoices.bystander.value, 'bystander')
