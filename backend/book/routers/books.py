from django.core.exceptions import ValidationError
from ninja import Router
from shared.schemas import ErrorResponse
from shared.utils.data import DefaultOrderedDict

from book.models import Book
from book.schemas import (
    BookCategory,
    BookIn,
    BookListResponse,
    BookResponse,
    BooksByCategoryResponse,
    BookStatsResponse,
)

router = Router()


@router.get("/", response={200: BookListResponse})
def list_books(request):
    return BookListResponse(nodes=Book.objects.all())


@router.post("/", response={200: BookResponse, 400: ErrorResponse})
def add_book(request, payload: BookIn):
    try:
        if not payload.title:
            msg = "Title is required."
            raise AssertionError(msg)
        return BookResponse(
            node=Book.objects.create(
                title=payload.title,
                summary=payload.summary,
                category=None or payload.category,
                sort_order=Book.objects.count() + 1,
            )
        )
    except ValidationError as e:
        return 400, ErrorResponse(error=str(e))


@router.get("/stats/", response={200: BookStatsResponse})
def get_book_stats(request):
    return BookStatsResponse(
        book_count=Book.objects.count(),
        categories=Book.objects.values_list("category", flat=True).distinct(),
    )


@router.get("/by_category/", response={200: BooksByCategoryResponse})
def get_books_per_category(request):
    nodes = DefaultOrderedDict(list)
    for book in Book.objects.all():
        nodes[book.category].append(book)
    return BooksByCategoryResponse(
        nodes=(
            BookCategory(category=category, total=len(books), books=books)
            for category, books in nodes.items()
        )
    )


@router.get("/{id}/", response={200: BookResponse, 404: ErrorResponse})
def get_book(request, id: str):
    try:
        return BookResponse(node=Book.objects.get(id=id))
    except (Book.DoesNotExist, ValidationError):
        return 404, ErrorResponse(error="Book not found.")


@router.post(
    "/{id}/",
    response={
        200: BookResponse,
        400: ErrorResponse,
        404: ErrorResponse,
    },
)
def update_book(request, id: str, payload: BookIn):
    try:
        book = Book.objects.get(id=id)
    except (Book.DoesNotExist, ValidationError):
        return 404, ErrorResponse(error="Book not found.")

    try:
        if not payload.title:
            msg = "Title is required."
            raise ValidationError(msg)
        book.title = payload.title
        book.summary = payload.summary
        book.category = None or payload.category
        book.save()
        return BookResponse(node=book)
    except ValidationError as e:
        return 400, ErrorResponse(error=str(e))
