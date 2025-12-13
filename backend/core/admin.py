from django.contrib import admin

from .models import Word, StoryContext


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ("content", "verse", "chapter", "book")
    search_fields = ("content", "book__title")
    ordering = ("book__sort_order", "chapter", "verse", "created_at")


@admin.register(StoryContext)
class ContextAdmin(admin.ModelAdmin):
    list_display = ("description",)
    search_fields = ("description",)
    ordering = ("description",)
