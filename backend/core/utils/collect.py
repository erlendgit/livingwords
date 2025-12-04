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
            notes=word.notes,
            narrator_id=word.get_agency_id_by_role("narrator"),
            speaker_id=word.get_agency_id_by_role("speaker"),
            listener_id=word.get_agency_id_by_role("listener"),
            bystander_id=word.get_agency_id_by_role("bystander"),
            story_ids=list(word.stories.values_list('id', flat=True)),
            context_ids=list(word.story_contexts.values_list('id', flat=True)),
            question_ids=list(word.advices.values_list('id', flat=True)),
            truth_ids=list(word.truths.values_list('id', flat=True)),
        )
    except Book.DoesNotExist:
        raise ValueError("Book does not exist")
    except Word.DoesNotExist:
        return LivingWord(
            content="",
            book_id=book_id,
            chapter=chapter,
            verse=verse,
        )


def get_surrounding_words(book_id, chapter, verse, before=False, after=False):
    return None
