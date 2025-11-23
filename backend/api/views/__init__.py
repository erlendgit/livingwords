from ninja import NinjaAPI

api = NinjaAPI()

api.add_router("/book/", "api.views.books.router")
api.add_router("/story/", "api.views.stories.router")
api.add_router("/context/", "api.views.contexts.router")
api.add_router("/question/", "api.views.questions.router")
api.add_router("/truth/", "api.views.truths.router")
