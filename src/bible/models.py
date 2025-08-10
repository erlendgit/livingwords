from django.db import models
from django.utils.translation import gettext_lazy as _

from shared.models import SharedBaseModel


class TestamentManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class Testament(SharedBaseModel):
    class Parts(models.TextChoices):
        OLD_TESTAMENT = "OT", _("Old Testament")
        NEW_TESTAMENT = "NT", _("New Testament")

    objects = TestamentManager()

    name = models.CharField(
        max_length=50, blank=True, null=True, choices=Parts.choices, unique=True
    )
    order = models.PositiveIntegerField()

    def natural_key(self):
        return (self.name,)

    def __str__(self):
        return self.name


class Book(SharedBaseModel):
    name = models.CharField(max_length=100, unique=True)
    testament = models.ForeignKey(
        "bible.Testament", related_name="books", on_delete=models.CASCADE
    )
    author = models.CharField(max_length=100, blank=True, null=True)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ("testament__order", "order")

    def __str__(self):
        return self.name


class Verse(SharedBaseModel):
    book = models.ForeignKey(
        "bible.Book", related_name="verses", on_delete=models.CASCADE
    )
    chapter = models.PositiveIntegerField()
    verse = models.PositiveIntegerField()

    class Meta:
        ordering = ("book__order", "chapter", "verse")
        unique_together = ("book", "chapter", "verse")

    @property
    def url(self):
        return f"https://www.debijbel.nl/bijbel//JHN.{self.chapter}.{self.verse}"
