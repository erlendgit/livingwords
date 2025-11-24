from ninja import NinjaAPI

api = NinjaAPI()
api.add_router("/book/", "book.routers.books.router", tags=["Book"])
api.add_router("/story/", "story.routers.stories.router", tags=["Story"])
api.add_router("/context/", "core.routers.contexts.router", tags=["Context"])
api.add_router("/question/", "question.routers.questions.router", tags=["Question"])
api.add_router("/truth/", "truth.routers.truths.router", tags=["Truth"])
api.add_router("/agency/", "agency.routers.agencies.router", tags=["Agency"])
api.add_router("/person/", "agency.routers.persons.router", tags=["Person"])