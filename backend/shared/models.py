import uuid

from django.db import models


class SharedBaseModel(models.Model):
    class Meta:
        abstract = True

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        raise NotImplementedError("Implement __str__ for %s" % self.__class__.__name__)
