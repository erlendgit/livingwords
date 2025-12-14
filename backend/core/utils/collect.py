import logging

from django.db.models import Q

from book.models import Book
from core.models import Word
from core.schemas import LivingWord, LivingWordCollection

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


def get_surrounding_words_before(book_id, chapter, verse):
    qs = Word.objects.filter(book_id=book_id).order_by('chapter', 'verse')
    this_chapter = Q(chapter=chapter, verse__lt=verse)
    previous_chapter = Q(chapter=chapter - 1)
    if chapter > 1:
        qs = qs.filter(this_chapter | previous_chapter)
    else:
        qs = qs.filter(this_chapter)

    return LivingWordCollection(
        nodes=list(qs)[-5:]
    )


def get_surrounding_words_after(book_id, chapter, verse):
    qs = Word.objects.filter(book_id=book_id).order_by('chapter', 'verse')

    this_chapter = Q(chapter=chapter, verse__gt=verse)
    next_chapter = Q(chapter=chapter + 1)
    qs = qs.filter(this_chapter | next_chapter)
    return LivingWordCollection(
        nodes=qs[:5]
    )
