import uuid
from typing import Union, List

from core.models import Book
from ninja import Router, Schema

router = Router()


class BookIn(Schema):
    title: str


class BookOut(Schema):
    id: uuid.UUID
    title: str


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
    return BookResponse(
        node=Book.objects.create(
            title=payload.title,
            sort_order=Book.objects.count() + 1
        )
    )
