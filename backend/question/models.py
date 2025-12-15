from django.db import models
from shared.models import SharedBaseModel


class Question(SharedBaseModel):
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    suggestions = models.ManyToManyField("core.Word", related_name="advices")

    def __str__(self):
        return self.question
