from django.db import models

from shared.models import SharedBaseModel


class Agency(SharedBaseModel):
    class RoleChoices(models.TextChoices):
        narrator = 'narrator', 'Narrator'
        speaker = 'speaker', 'Main Character'
        listener = 'listener', 'Supporting Character'
        bystander = 'bystander', 'Bystander'

    description = models.TextField(blank=True, null=True)
    persons = models.ManyToManyField(
        'agency.Person',
        related_name='acting_as'
    )
    role = models.TextField(
        choices=RoleChoices.choices,
    )
    words = models.ManyToManyField(
        'core.Word',
        related_name='actors'
    )


class Person(SharedBaseModel):
    name = models.CharField(max_length=255)
    biography = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
