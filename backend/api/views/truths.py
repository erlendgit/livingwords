import uuid
from typing import Union, List

from ninja import Router, Schema
from truth.models import Truth

router = Router()


class TruthIn(Schema):
    statement: str


class TruthOut(Schema):
    id: uuid.UUID
    statement: str


class TruthResponse(Schema):
    node: Union[TruthOut, None]


class TruthErrorResponse(Schema):
    details: str


class TruthListResponse(Schema):
    nodes: List[TruthOut]


@router.get("/", response=TruthListResponse)
def list_truths(request):
    return TruthListResponse(
        nodes=Truth.objects.all()
    )


@router.get("/{id}/", response={200: TruthResponse, 404: TruthErrorResponse})
def get_truth(request, id: str):
    try:
        return 200, TruthResponse(
            node=Truth.objects.get(id=id)
        )
    except Truth.DoesNotExist:
        return 404, TruthErrorResponse(details="Not found")


@router.post("/", response={201: TruthResponse, 400: TruthErrorResponse})
def add_truth(request, payload: TruthIn):
    if not payload.statement or payload.statement.strip() == "":
        return 400, TruthErrorResponse(details="Statement cannot be empty")

    truth = Truth.objects.create(
        statement=payload.statement
    )

    return 201, TruthResponse(node=truth)


@router.post("/{id}/", response={200: TruthResponse, 400: TruthErrorResponse, 404: TruthErrorResponse})
def update_truth(request, id: str, payload: TruthIn):
    if not payload.statement or payload.statement.strip() == "":
        return 400, TruthErrorResponse(details="Statement cannot be empty")

    try:
        truth = Truth.objects.get(id=id)
    except Truth.DoesNotExist:
        return 404, TruthErrorResponse(details="Not found")

    truth.statement = payload.statement
    truth.save()

    return 200, TruthResponse(node=truth)
