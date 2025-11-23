import logging
from traceback import format_exc
from typing import Union, List
from uuid import UUID

from ninja import Router, Schema

from django.core.exceptions import ValidationError

from core.models import Story

router = Router()
logger = logging.getLogger(__name__)


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


@router.post("/", response={200: StoryResponse, 400: StoryResponse})
def add_story(request, payload: StoryIn):
    try:
        return StoryResponse(
            node=Story.objects.create(
                title=payload.title,
                summary=payload.summary,
            ),
            details=None
        )
    except Exception as e:
        logger.error(format_exc())
        return 400, StoryResponse(
            node=None,
            details=str(e)
        )


class StoryListResponse(Schema):
    nodes: List[StoryOut]


@router.get("/")
def list_stories(request):
    return StoryListResponse(
        nodes=Story.objects.all()
    )


@router.get("/{id}/")
def get_story(request, id):
    try:
        return StoryResponse(
            node=Story.objects.get(id=id),
            details=None,
        )
    except (Story.DoesNotExist, ValueError, ValidationError):
        return 404, StoryResponse(
            node=None,
            details="Not found"
        )
