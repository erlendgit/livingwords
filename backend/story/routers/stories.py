import logging
from uuid import UUID

from django.core.exceptions import ValidationError
from ninja import Router
from shared.schemas import ErrorResponse

from story.models import Story
from story.schemas import StoryIn, StoryListResponse, StoryResponse

router = Router()
logger = logging.getLogger(__name__)


@router.post("/", response={200: StoryResponse, 400: ErrorResponse})
def add_story(request, payload: StoryIn):
    try:
        if not payload.title:
            msg = "Title is required."
            raise ValidationError(msg)

        return StoryResponse(
            node=Story.objects.create(
                title=payload.title,
                summary=payload.summary,
            ),
            details=None,
        )
    except Exception:
        msg = "Error when storing new story reference"
        logger.exception(msg)
        return 400, ErrorResponse(error=msg)


@router.get("/")
def list_stories(request):
    return StoryListResponse(nodes=Story.objects.all())


@router.get("/{id}/")
def get_story(request, id):
    try:
        return StoryResponse(
            node=Story.objects.get(id=id),
            details=None,
        )
    except (Story.DoesNotExist, ValueError, ValidationError):
        return 404, StoryResponse(node=None, details="Not found")


@router.post("/{id}/", response={200: StoryResponse, 400: ErrorResponse})
def update_story(request, id: UUID, payload: StoryIn):
    try:
        story = Story.objects.get(id=id)

        if not payload.title:
            msg = "Title is required."
            raise ValidationError(msg)

        story.title = payload.title
        story.summary = payload.summary
        story.save()

        return StoryResponse(node=story, details=None)
    except Story.DoesNotExist:
        return 404, StoryResponse(node=None, details="Not found")
    except Exception:
        msg = "Error when updating story reference"
        logger.exception(msg)
        return 400, ErrorResponse(error=msg)
