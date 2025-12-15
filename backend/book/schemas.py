import uuid
from typing import List, Union

from ninja import Schema


class BookIn(Schema):
    title: str
    summary: Union[str, None] = None
    category: Union[str, None] = None


class BookOut(Schema):
    id: uuid.UUID
    title: str
    summary: Union[str, None] = None
    category: Union[str, None] = None


class BookResponse(Schema):
    node: Union[BookOut, None]


class BookErrorResponse(Schema):
    details: str


class BookListResponse(Schema):
    nodes: List[BookOut]


class BookStatsResponse(Schema):
    book_count: int
    categories: List[Union[str, None]]


class BookCategory(Schema):
    total: int
    category: Union[str, None]
    books: List[BookOut]


class BooksByCategoryResponse(Schema):
    nodes: List[BookCategory]
