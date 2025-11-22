from django.db import models

from shared.models import SharedBaseModel


class Word(SharedBaseModel):
    content = models.TextField()

    verse = models.IntegerField()
    chapter = models.IntegerField()
    notes = models.TextField(blank=True, null=True)
    book = models.ForeignKey(
        "core.Book",
        on_delete=models.CASCADE,
        related_name='content'
    )

    def __str__(self):
        return self.content


class Story(SharedBaseModel):
    title = models.CharField(max_length=255)
    summmary = models.TextField(blank=True, null=True)
    words = models.ManyToManyField(
        'core.Word',
        related_name='stories'
    )

    def __str__(self):
        return self.title


class Actor(SharedBaseModel):
    class RoleChoices(models.TextChoices):
        narrator = 'narrator', 'Narrator'
        speaker = 'speaker', 'Main Character'
        listener = 'listener', 'Supporting Character'
        bystander = 'bystander', 'Bystander'

    description = models.TextField(blank=True, null=True)
    persons = models.ManyToManyField(
        'core.Person',
        related_name='acting_as'
    )
    role = models.TextField(
        choices=RoleChoices.choices,
    )
    words = models.ManyToManyField(
        'core.Word',
        related_name='actors'
    )


class Context(SharedBaseModel):
    description = models.TextField()
    information = models.TextField(blank=True, null=True)
    words = models.ManyToManyField(
        'core.Word',
        related_name='contexts'
    )


class Question(SharedBaseModel):
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    suggestions = models.ManyToManyField(
        'core.Word',
        related_name='advices'
    )

    def __str__(self):
        return self.question


class Truth(SharedBaseModel):
    statement = models.TextField()
    related_words = models.ManyToManyField(
        'core.Word',
        related_name='truths'
    )

    def __str__(self):
        return self.statement


class Person(SharedBaseModel):
    name = models.CharField(max_length=255)
    biography = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Book(SharedBaseModel):
    title = models.CharField(max_length=255)
    authors = models.ManyToManyField(Person, related_name='books')
    sort_order = models.IntegerField()

    def __str__(self):
        return self.title
