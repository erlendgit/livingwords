from django.contrib import admin

from question.models import Question


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("question",)
    search_fields = ("question", "answer")
    ordering = ("question",)
