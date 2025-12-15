from django.db import models
from shared.models import SharedBaseModel


class Story(SharedBaseModel):
    title = models.CharField(max_length=255)
    summary = models.TextField(blank=True, null=True)
    words = models.ManyToManyField("core.Word", related_name="stories")

    def __str__(self):
        return self.title
