from django.contrib import admin

from story.models import Story


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)
    ordering = ("title",)
