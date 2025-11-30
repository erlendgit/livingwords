import uuid
from typing import Union, List

from django.core.exceptions import ValidationError
from ninja import Router, Schema

from book.models import Book

router = Router()


class BookIn(Schema):
    title: str
    summary: Union[str, None] = None


class BookOut(Schema):
    id: uuid.UUID
    title: str
    summary: Union[str, None] = None


class BookResponse(Schema):
    node: Union[BookOut, None]


class BookErrorResponse(Schema):
    details: str


class BookListResponse(Schema):
    nodes: List[BookOut]


@router.get("/")
def list_books(request):
    return BookListResponse(
        nodes=Book.objects.all()
    )


@router.get("/{id}/")
def get_book(request, id: str):
    return BookResponse(
        node=Book.objects.get(id=id)
    )


@router.post("/")
def add_book(request, payload: BookIn):
    try:
        if not payload.title:
            raise ValidationError("Title is required.")
        return BookResponse(
            node=Book.objects.create(
                title=payload.title,
                summary=payload.summary,
                sort_order=Book.objects.count() + 1
            )
        )
    except ValidationError as e:
        return 400, BookErrorResponse(details=str(e))


@router.post("/{id}/")
def update_book(request, id: str, payload: BookIn):
    try:
        book = Book.objects.get(id=id)
        if not payload.title:
            raise ValidationError("Title is required.")
        book.title = payload.title
        book.summary = payload.summary
        book.save()
        return BookResponse(
            node=book
        )
    except Book.DoesNotExist:
        return 404, BookErrorResponse(details="Book not found.")
    except ValidationError as e:
        return 400, BookErrorResponse(details=str(e))
