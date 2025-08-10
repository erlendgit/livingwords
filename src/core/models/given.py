from django.db import models

from shared.models import SharedBaseModel


class Given(SharedBaseModel):
    content = models.TextField()
    context = models.TextField(blank=True, null=True)
    tags = models.ManyToManyField("core.Tag", related_name="givens", blank=True)

    verses = models.ManyToManyField("bible.Verse", related_name="givens", blank=True)

    def __str__(self):
        return self.content


class Question(SharedBaseModel):
    content = models.TextField(blank=True, null=True)
    givens = models.ManyToManyField("core.Given", related_name="questions", blank=True)

    def __str__(self):
        return self.content or "Question"


class Tag(SharedBaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
