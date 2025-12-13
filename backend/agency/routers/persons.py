import uuid
from typing import Union, List

from ninja import Router, Schema
from agency.models import Person

router = Router()


class PersonIn(Schema):
    name: str
    biography: Union[str, None] = None


class PersonOut(Schema):
    id: uuid.UUID
    name: str
    biography: Union[str, None]


class PersonResponse(Schema):
    node: Union[PersonOut, None]


class PersonErrorResponse(Schema):
    details: str


class PersonListResponse(Schema):
    total: int
    nodes: List[PersonOut]


@router.get("/", response=PersonListResponse)
def list_people(request, query: Union[str, None] = None):
    qs = Person.objects.all()
    if query:
        qs = qs.filter(name__icontains=query)

    return PersonListResponse(
        total=qs.count(),
        nodes=qs.all()
    )


@router.get("/{id}/", response={200: PersonResponse, 404: PersonErrorResponse})
def get_person(request, id: str):
    try:
        return 200, PersonResponse(node=Person.objects.get(id=id))
    except Person.DoesNotExist:
        return 404, PersonErrorResponse(details="Not found")


@router.post("/", response={201: PersonResponse, 400: PersonErrorResponse})
def add_person(request, payload: PersonIn):
    if not payload.name or payload.name.strip() == "": return 400, PersonErrorResponse(details="Name cannot be empty")
    person = Person.objects.create(name=payload.name, biography=payload.biography)
    return 201, PersonResponse(node=person)


@router.post("/{id}/", response={200: PersonResponse, 400: PersonErrorResponse, 404: PersonErrorResponse})
def update_person(request, id: str, payload: PersonIn):
    if not payload.name or payload.name.strip() == "": return 400, PersonErrorResponse(details="Name cannot be empty")
    try:
        person = Person.objects.get(id=id)
    except Person.DoesNotExist:
        return 404, PersonErrorResponse(details="Not found")
    person.name = payload.name
    person.biography = payload.biography
    person.save()
    return 200, PersonResponse(node=person)
