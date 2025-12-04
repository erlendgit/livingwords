import logging

from ninja import Router

from core.schemas import LivingWordResponse, LivingWord
from core.utils.collect import get_living_word_data, get_surrounding_words
from core.utils.store import store_living_word_data
from shared.schemas import ErrorResponse

router = Router()
logger = logging.getLogger(__name__)


@router.get("/{book_id}/{chapter}/{verse}/", response={200: LivingWordResponse, 400: ErrorResponse})
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
        return 200, _generic_living_word_response(result.book_id, result.chapter, result.verse)
    except Exception:
        msg = "Error saving living word"
        logger.exception(msg)
        return 400, ErrorResponse(msg=msg)


def _generic_living_word_response(book_id, chapter, verse):
    return LivingWordResponse(
        node=get_living_word_data(book_id, chapter, verse),
        before=get_surrounding_words(book_id, chapter, verse, before=True),
        after=get_surrounding_words(book_id, chapter, verse, after=True),
    )
