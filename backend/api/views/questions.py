import uuid
from typing import Union, List

from ninja import Router, Schema
from question.models import Question

router = Router()


class QuestionIn(Schema):
    question: str
    answer: Union[str, None] = None


class QuestionOut(Schema):
    id: uuid.UUID
    question: str
    answer: Union[str, None]


class QuestionResponse(Schema):
    node: Union[QuestionOut, None]


class QuestionErrorResponse(Schema):
    details: str


class QuestionListResponse(Schema):
    nodes: List[QuestionOut]


@router.get("/", response=QuestionListResponse)
def list_questions(request):
    return QuestionListResponse(
        nodes=Question.objects.all()
    )


@router.get("/{id}/", response={200: QuestionResponse, 404: QuestionErrorResponse})
def get_question(request, id: str):
    try:
        return 200, QuestionResponse(
            node=Question.objects.get(id=id)
        )
    except Question.DoesNotExist:
        return 404, QuestionErrorResponse(details="Not found")


@router.post("/", response={201: QuestionResponse, 400: QuestionErrorResponse})
def add_question(request, payload: QuestionIn):
    if not payload.question or payload.question.strip() == "":
        return 400, QuestionErrorResponse(details="Question cannot be empty")

    question = Question.objects.create(
        question=payload.question,
        answer=payload.answer,
    )

    return 201, QuestionResponse(node=question)


@router.post("/{id}/", response={200: QuestionResponse, 400: QuestionErrorResponse, 404: QuestionErrorResponse})
def update_question(request, id: str, payload: QuestionIn):
    if not payload.question or payload.question.strip() == "":
        return 400, QuestionErrorResponse(details="Question cannot be empty")

    try:
        question = Question.objects.get(id=id)
    except Question.DoesNotExist:
        return 404, QuestionErrorResponse(details="Not found")

    question.question = payload.question
    question.answer = payload.answer
    question.save()

    return 200, QuestionResponse(node=question)
