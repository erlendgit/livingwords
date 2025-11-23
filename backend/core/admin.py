from django.contrib import admin

from .models import Word, Story, Actor, StoryContext, Question, Truth, Person, Book


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ("content", "verse", "chapter", "book")
    search_fields = ("content", "book__title")
    ordering = ("book__sort_order", "chapter", "verse", "created_at")


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)
    ordering = ("title",)


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = ("description", "role")
    search_fields = ("word__content", "person__name", "role")
    ordering = ("-created_at",)


@admin.register(StoryContext)
class ContextAdmin(admin.ModelAdmin):
    list_display = ("description",)
    search_fields = ("description",)
    ordering = ("description",)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("question",)
    search_fields = ("question", "answer")
    ordering = ("question",)


@admin.register(Truth)
class TruthAdmin(admin.ModelAdmin):
    list_display = ("statement",)
    search_fields = ("statement",)
    ordering = ("statement",)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name", "biography",)
    ordering = ("name",)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_order",)
    search_fields = ("title", "authors__name",)
    ordering = ("sort_order",)
