import logging

from ninja import Router

from core.schemas import LivingWordResponse, LivingWord
from core.utils.collect import get_living_word_data, get_surrounding_words
from core.utils.store import store_living_word_data

router = Router()
logger = logging.getLogger(__name__)


@router.get("/{book_id}/{chapter}/{verse}/")
def get_living_word(request, book_id: str, chapter: int, verse: int):
    try:
        return 200, _generic_living_word_response(book_id, chapter, verse)
    except Exception as e:
        logger.error(f"Error retrieving living word: {e}")
        return {"error": "Unable to retrieve living word at this time."}


@router.post("/")
def store_living_word(request, payload: LivingWord):
    try:
        result = store_living_word_data(payload)
        return 200, _generic_living_word_response(result.book_id, result.chapter, result.verse)
    except Exception as e:
        logger.error(f"Error saving living word: {e}")
        return {"error": "Unable to save living word at this time."}


def _generic_living_word_response(book_id, chapter, verse):
    return LivingWordResponse(
        node=get_living_word_data(book_id, chapter, verse),
        before=get_surrounding_words(book_id, chapter, verse, before=True),
        after=get_surrounding_words(book_id, chapter, verse, after=True),
    )
