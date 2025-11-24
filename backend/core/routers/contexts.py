import logging
from traceback import format_exc
from typing import Union, List
from uuid import UUID

from ninja import Router, Schema

from django.core.exceptions import ValidationError

from core.models import StoryContext

router = Router()
logger = logging.getLogger(__name__)


class ContextIn(Schema):
    description: str


class ContextOut(Schema):
    id: UUID
    description: str


class ContextResponse(Schema):
    node: Union[ContextOut, None]
    details: Union[str, None]


@router.post("/", response={200: ContextResponse, 400: ContextResponse})
def add_context(request, payload: ContextIn):
    try:
        return ContextResponse(
            node=StoryContext.objects.create(
                description=payload.description,
            ),
            details=None
        )
    except Exception as e:
        logger.error(format_exc())
        return 400, ContextResponse(
            node=None,
            details=str(e)
        )


class ContextListResponse(Schema):
    nodes: List[ContextOut]


@router.get("/")
def list_context(request):
    return ContextListResponse(
        nodes=StoryContext.objects.all()
    )


@router.get("/{id}/", response={200: ContextResponse, 404: ContextResponse})
def get_context(request, id):
    try:
        return ContextResponse(
            node=StoryContext.objects.get(id=id),
            details=None,
        )
    except (StoryContext.DoesNotExist, ValueError, ValidationError):
        return 404, ContextResponse(
            node=None,
            details="Not found"
        )
