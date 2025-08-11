from django.contrib import admin

from .models import Given, Question, Tag


@admin.register(Given)
class GivenAdmin(admin.ModelAdmin):
    list_display = ("content", "created_at")
    search_fields = ("content", "context")
    ordering = ("-created_at",)
    filter_horizontal = ("tags", "verses")
    list_filter = ("tags",)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("content",)
    search_fields = ("content",)
    ordering = ("-created_at",)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name",)
    ordering = ("name",)
