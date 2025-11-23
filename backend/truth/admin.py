from django.contrib import admin
from truth.models import Truth


@admin.register(Truth)
class TruthAdmin(admin.ModelAdmin):
    list_display = ("statement",)
    search_fields = ("statement",)
    ordering = ("statement",)
