from agency.routers.agencies import router as agency_router
from agency.routers.persons import router as person_router
from book.routers.books import router as book_router
from ninja import NinjaAPI
from question.routers.questions import router as question_router
from story.routers.stories import router as story_router
from truth.routers.truths import router as truth_router

from core.routers.contexts import router as context_router
from core.routers.words import router as word_router

api = NinjaAPI()
api.add_router("/book/", book_router, tags=["Book"])
api.add_router("/story/", story_router, tags=["Story"])
api.add_router("/context/", context_router, tags=["Context"])
api.add_router("/question/", question_router, tags=["Question"])
api.add_router("/truth/", truth_router, tags=["Truth"])
api.add_router("/agency/", agency_router, tags=["Agency"])
api.add_router("/person/", person_router, tags=["Person"])
api.add_router("/word/", word_router, tags=["Living Words"])
