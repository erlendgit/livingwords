import logging

from ninja import Router
from shared.schemas import ErrorResponse

from core.models import Word
from core.schemas import LivingWord, LivingWordResponse
from core.utils.collect import (
    get_living_word_data,
    get_surrounding_words_after,
    get_surrounding_words_before,
)
from core.utils.store import store_living_word_data

router = Router()
logger = logging.getLogger(__name__)


@router.get(
    "/{book_id}/{chapter}/{verse}/",
    response={200: LivingWordResponse, 400: ErrorResponse},
)
def get_living_word(request, book_id: str, chapter: int, verse: int):
    try:
        return 200, _generic_living_word_response(book_id, chapter, verse)
    except Exception:
        msg = "Error retrieving living word"
        logger.exception(msg)
        return ErrorResponse(error=msg)


@router.post("/", response={200: LivingWordResponse, 400: ErrorResponse})
def store_living_word(request, payload: LivingWord):
    try:
        result = store_living_word_data(payload)
        return 200, _generic_living_word_response(
            result.book_id, result.chapter, result.verse
        )
    except Exception:
        msg = "Error saving living word"
        logger.exception(msg)
        return 400, ErrorResponse(error=msg)


@router.delete(
    "/{book_id}/{chapter}/{verse}/",
    response={200: LivingWordResponse, 400: ErrorResponse},
)
def reset_living_word(request, book_id: str, chapter: int, verse: int):
    try:
        word = Word.objects.get(book_id=book_id, chapter=chapter, verse=verse)
        word.delete()
        return 200, _generic_living_word_response(book_id, chapter, verse)
    except Word.DoesNotExist:
        return 200, _generic_living_word_response(book_id, chapter, verse)
    except Exception:
        msg = "Error resetting living word"
        logger.exception(msg)
        return 400, ErrorResponse(error=msg)


def _generic_living_word_response(book_id, chapter, verse):
    return LivingWordResponse(
        node=get_living_word_data(book_id, chapter, verse),
        before=get_surrounding_words_before(book_id, chapter, verse),
        after=get_surrounding_words_after(book_id, chapter, verse),
    )
