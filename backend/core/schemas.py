from typing import Any, List, Type, Union
from uuid import UUID

from ninja import Schema
from ninja.schema import S


class CrossReference(Schema):
    book_id: UUID
    chapter: int
    verse: int
    content: Union[str, None] = None


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
    references: Union[list[CrossReference], None] = None

    @classmethod
    def from_orm(cls: Type[S], obj: Any, **kw: Any) -> S:
        return cls(
            content=obj.content,
            book_id=obj.book_id,
            chapter=obj.chapter,
            verse=obj.verse,
            notes=obj.notes,
            narrator_id=obj.get_agency_id_by_role("narrator"),
            speaker_id=obj.get_agency_id_by_role("speaker"),
            listener_id=obj.get_agency_id_by_role("listener"),
            bystander_id=obj.get_agency_id_by_role("bystander"),
            story_ids=list(obj.stories.values_list("id", flat=True)),
            context_ids=list(obj.story_contexts.values_list("id", flat=True)),
            question_ids=list(obj.advices.values_list("id", flat=True)),
            truth_ids=list(obj.truths.values_list("id", flat=True)),
            references=[
                CrossReference(
                    book_id=ref.reference.book_id,
                    chapter=ref.reference.chapter,
                    verse=ref.reference.verse,
                    content=ref.reference.content,
                )
                for ref in obj.references.all()
            ]
            if obj.references.exists()
            else None,
        )


class LivingWordCollection(Schema):
    nodes: List[LivingWord]


class LivingWordResponse(Schema):
    node: LivingWord
    before: Union[LivingWordCollection, None] = None
    after: Union[LivingWordCollection, None] = None
