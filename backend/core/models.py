from django.db import models

from shared.models import SharedBaseModel


class Word(SharedBaseModel):
    content = models.TextField()

    verse = models.IntegerField()
    chapter = models.IntegerField()
    notes = models.TextField(blank=True, null=True)
    book = models.ForeignKey(
        "book.Book",
        on_delete=models.CASCADE,
        related_name='content'
    )

    def __str__(self):
        return self.content


class StoryContext(SharedBaseModel):
    description = models.TextField()
    words = models.ManyToManyField(
        'core.Word',
        related_name='story_contexts'
    )


