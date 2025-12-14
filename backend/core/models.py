from django.db import models

from shared.models import SharedBaseModel


class WordQuerySet(models.QuerySet):
    def select_before(self, book_id, chapter, verse):
        return self.filter(
            models.Q(book_id=book_id) &
            (models.Q(chapter=chapter, verse__lt=verse) |
             models.Q(chapter__lt=chapter))
        ).order_by('-chapter', '-verse')

    def select_after(self, book_id, chapter, verse):
        return self.filter(
            models.Q(book_id=book_id) &
            (models.Q(chapter=chapter, verse__gt=verse) |
             models.Q(chapter__gt=chapter))
        ).order_by('chapter', 'verse')


class Word(SharedBaseModel):
    objects = WordQuerySet.as_manager()

    content = models.TextField()
    notes = models.TextField(blank=True, null=True)

    verse = models.IntegerField()
    chapter = models.IntegerField()
    book = models.ForeignKey(
        "book.Book",
        on_delete=models.CASCADE,
        related_name='content'
    )

    def get_agency_id_by_role(self, role):
        if ref := self.agency_refs.filter(role=role).first():
            return ref.agency_id
        return None

    def __str__(self):
        return f"{self.book} {self.chapter}:{self.verse}; {self.content}"


class StoryContext(SharedBaseModel):
    description = models.TextField()
    words = models.ManyToManyField(
        'core.Word',
        related_name='story_contexts'
    )
