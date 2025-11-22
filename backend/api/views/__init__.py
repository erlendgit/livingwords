from ninja import NinjaAPI

api = NinjaAPI()

api.add_router("/book/", "api.views.books.router")