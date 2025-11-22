from ninja import NinjaAPI

api = NinjaAPI()

api.add_router("/books/", "api.views.books.router")