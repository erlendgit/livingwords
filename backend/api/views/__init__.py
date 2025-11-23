from ninja import NinjaAPI

api = NinjaAPI()

api.add_router("/book/", "api.views.books.router")
api.add_router("/story/", "api.views.stories.router")
api.add_router("/context/", "api.views.contexts.router")