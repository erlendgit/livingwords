import logging
from typing import List, Union
from uuid import UUID

from django.core.exceptions import ValidationError
from ninja import Router, Schema
from shared.schemas import ErrorResponse

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


@router.post("/", response={200: ContextResponse, 400: ErrorResponse})
def add_context(request, payload: ContextIn):
    try:
        return ContextResponse(
            node=StoryContext.objects.create(
                description=payload.description,
            ),
            details=None,
        )
    except Exception:
        msg = "Error on add context"
        logger.exception(msg)
        return 400, ErrorResponse(error=msg)


class ContextListResponse(Schema):
    nodes: List[ContextOut]


@router.get("/")
def list_context(request):
    return ContextListResponse(nodes=StoryContext.objects.all())


@router.get("/{id}/", response={200: ContextResponse, 404: ErrorResponse})
def get_context(request, id):
    try:
        return ContextResponse(
            node=StoryContext.objects.get(id=id),
            details=None,
        )
    except (StoryContext.DoesNotExist, ValueError, ValidationError):
        return 404, ErrorResponse(error="Not found")


@router.post(
    "/{id}/",
    response={
        200: ContextResponse,
        404: ErrorResponse,
        400: ErrorResponse,
    },
)
def update_context(request, id, payload: ContextIn):
    try:
        context = StoryContext.objects.get(id=id)
    except (StoryContext.DoesNotExist, ValueError, ValidationError):
        return 404, ErrorResponse(error="Not found")

    try:
        context.description = payload.description
        context.save()

        return ContextResponse(
            node=context,
        )
    except Exception:
        msg = "Error on update context"
        logger.exception(msg)
        return 400, ErrorResponse(error=msg)
