import logging

from book.models import Book

from core.models import Word
from core.schemas import LivingWord

logger = logging.getLogger(__name__)


def get_living_word_data(book_id, chapter, verse) -> LivingWord:
    try:
        Book.objects.get(id=book_id)
        word = Word.objects.get(book_id=book_id, chapter=chapter, verse=verse)

        return LivingWord.from_orm(word)
    except Book.DoesNotExist:
        msg = "Book does not exist"
        raise ValueError(msg)
    except Word.DoesNotExist:
        last_verse = Word.objects.select_before(book_id, chapter, verse).first()
        return LivingWord(
            content="",
            book_id=book_id,
            chapter=chapter,
            verse=verse,
            **(
                {}
                if not last_verse
                else {
                    "narrator_id": last_verse.get_agency_id_by_role("narrator"),
                    "speaker_id": last_verse.get_agency_id_by_role("speaker"),
                    "listener_id": last_verse.get_agency_id_by_role("listener"),
                    "bystander_id": last_verse.get_agency_id_by_role("bystander"),
                    "story_ids": list(last_verse.stories.values_list("id", flat=True)),
                    "context_ids": list(
                        last_verse.story_contexts.values_list("id", flat=True)
                    ),
                    "question_ids": list(
                        last_verse.advices.values_list("id", flat=True)
                    ),
                    "truth_ids": list(last_verse.truths.values_list("id", flat=True)),
                }
            ),
        )
