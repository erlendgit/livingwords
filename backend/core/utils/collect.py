import logging

from book.models import Book
from core.models import Word
from core.schemas import LivingWord

logger = logging.getLogger(__name__)


def get_living_word_data(book_id, chapter, verse) -> LivingWord:
    try:
        Book.objects.get(id=book_id)
        word = Word.objects.get(book_id=book_id, chapter=chapter, verse=verse)

        return LivingWord(
            content=word.content,
            book_id=word.book_id,
            chapter=word.chapter,
            verse=word.verse,
            notes=word.notes
        )
    except Book.DoesNotExist:
        raise ValueError("Book does not exist")
    except Word.DoesNotExist:
        logger.error("Word does not yet exist")
        return LivingWord(
            content="",
            book_id=book_id,
            chapter=chapter,
            verse=verse,
        )


def get_surrounding_words(book_id, chapter, verse, before=False, after=False):
    return None
