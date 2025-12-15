from typing import List, Union
from uuid import UUID

from ninja import Schema


class StoryIn(Schema):
    title: str
    summary: str


class StoryOut(Schema):
    id: UUID
    title: str
    summary: str


class StoryResponse(Schema):
    node: Union[StoryOut, None]
    details: Union[str, None]


class StoryListResponse(Schema):
    nodes: List[StoryOut]
