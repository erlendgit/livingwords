from book.factories import book_factory
from django.test import TestCase

from core.factories import word_factory
from core.schemas import CrossReference, LivingWord
from core.utils.collect import get_living_word_data
from core.utils.store import _update_references


class TestApiResponseTestCase(TestCase):
    def setUp(self):
        super().setUp()
        self.book = book_factory()

    def test_minimum_schema(self):
        response = get_living_word_data(self.book.id, chapter=1, verse=1)
        self.assertIsNotNone(response)
        self.assertIsInstance(response, LivingWord)

    def test_word_with_references(self):
        word = word_factory(
            book_id=self.book.id,
            chapter=1,
            verse=1,
            content="In the beginning...",
            notes="Not the absolute beginning. The beginning is a Person. But close enough.",
        )
        another_book = book_factory()
        _update_references(
            word,
            [
                CrossReference(
                    book_id=another_book.id,
                    chapter=2,
                    verse=3,
                )
            ],
        )

        response = get_living_word_data(self.book.id, chapter=1, verse=1)

        self.assertIsNotNone(response)
        self.assertIsInstance(response, LivingWord)
        self.assertEqual(1, len(response.references))
