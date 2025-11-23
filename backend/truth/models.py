from django.db import models

from shared.models import SharedBaseModel


class Truth(SharedBaseModel):
    statement = models.TextField()
    related_words = models.ManyToManyField(
        'core.Word',
        related_name='truths'
    )

    def __str__(self):
        return self.statement
