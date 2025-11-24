import uuid
from typing import Union, List, Optional

from ninja import Router, Schema
from agency.models import Agency
from agency.models import Person
from agency.routers.persons import PersonOut

router = Router()


class AgencyIn(Schema):
    description: str
    role: str
    person_ids: Optional[List[uuid.UUID]] = None


class AgencyOut(Schema):
    id: uuid.UUID
    description: str
    role: str
    persons: List[PersonOut]


class AgencyResponse(Schema):
    node: Union[AgencyOut, None]


class AgencyErrorResponse(Schema):
    details: str


class AgencyListResponse(Schema):
    nodes: List[AgencyOut]


@router.get("/", response=AgencyListResponse)
def list_agencies(request):
    return AgencyListResponse(nodes=Agency.objects.all())


@router.get("/{id}/", response={200: AgencyResponse, 404: AgencyErrorResponse})
def get_agency(request, id: str):
    try:
        return 200, AgencyResponse(node=Agency.objects.get(id=id))
    except Agency.DoesNotExist:
        return 404, AgencyErrorResponse(details="Not found")


@router.post("/", response={201: AgencyResponse, 400: AgencyErrorResponse})
def add_agency(request, payload: AgencyIn):
    if not payload.description or payload.description.strip() == "":
        return 400, AgencyErrorResponse(details="Description cannot be empty")
    if not payload.role or payload.role.strip() == "":
        return 400, AgencyErrorResponse(details="Role cannot be empty")

    agency = Agency.objects.create(
        description=payload.description,
        role=payload.role,
    )

    if payload.person_ids is not None:
        persons = Person.objects.filter(id__in=payload.person_ids)
        agency.persons.set(persons)

    return 201, AgencyResponse(node=agency)


@router.post("/{id}/", response={200: AgencyResponse, 400: AgencyErrorResponse, 404: AgencyErrorResponse})
def update_agency(request, id: str, payload: AgencyIn):
    if not payload.description or payload.description.strip() == "":
        return 400, AgencyErrorResponse(details="Description cannot be empty")
    if not payload.role or payload.role.strip() == "":
        return 400, AgencyErrorResponse(details="Role cannot be empty")

    try:
        agency = Agency.objects.get(id=id)
    except Agency.DoesNotExist:
        return 404, AgencyErrorResponse(details="Not found")

    agency.description = payload.description
    agency.role = payload.role
    agency.save()

    # Alleen aanpassen als expliciet meegestuurd
    if payload.person_ids is not None:
        persons = Person.objects.filter(id__in=payload.person_ids)
        agency.persons.set(persons)

    return 200, AgencyResponse(node=agency)
