from shared.models import SharedBaseModel
from django.db import models


class Book(SharedBaseModel):
    title = models.CharField(max_length=255)
    summary = models.TextField(null=True, blank=True)
    authors = models.ManyToManyField("agency.Agency", related_name='books')
    sort_order = models.IntegerField()

    def __str__(self):
        return self.title
