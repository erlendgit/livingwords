from django.db import models
from shared.models import SharedBaseModel


class RoleChoices(models.TextChoices):
    narrator = "narrator", "Narrator"
    speaker = "speaker", "Main Character"
    listener = "listener", "Supporting Character"
    bystander = "bystander", "Bystander"


class Agency(SharedBaseModel):
    description = models.TextField(blank=True, null=True)
    persons = models.ManyToManyField("agency.Person", related_name="acting_as")
    words = models.ManyToManyField("core.Word", related_name="actors")

    def __str__(self):
        return self.description or f"Agency: {self.description}"


class AgencyWord(SharedBaseModel):
    agency = models.ForeignKey(
        "agency.Agency", on_delete=models.CASCADE, related_name="word_refs"
    )
    word = models.ForeignKey(
        "core.Word", on_delete=models.CASCADE, related_name="agency_refs"
    )
    role = models.TextField(choices=RoleChoices.choices)

    def __str__(self):
        return f"{self.agency} as {self.get_role_display()} in {self.word}"


class Person(SharedBaseModel):
    name = models.CharField(max_length=255)
    biography = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
