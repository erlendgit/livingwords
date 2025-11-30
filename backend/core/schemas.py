from typing import Union
from uuid import UUID

from ninja import Schema


class LivingWord(Schema):
    content: str
    book_id: UUID
    chapter: int
    verse: int
    notes: Union[str, None] = None
    narrator_id: Union[UUID, None] = None
    speaker_id: Union[UUID, None] = None
    listener_id: Union[UUID, None] = None
    bystander_id: Union[UUID, None] = None
    story_ids: Union[list[UUID], None] = None
    context_ids: Union[list[UUID], None] = None
    question_ids: Union[list[UUID], None] = None
    truth_ids: Union[list[UUID], None] = None


class LivingWordCollection(Schema):
    nodes: list[LivingWord]


class LivingWordResponse(Schema):
    node: LivingWord
    before: Union[LivingWordCollection, None] = None
    after: Union[LivingWordCollection, None] = None
