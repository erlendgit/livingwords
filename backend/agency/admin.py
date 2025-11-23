from agency.models import Agency, Person
from django.contrib import admin


@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ("description", "role")
    search_fields = ("word__content", "person__name", "role")
    ordering = ("-created_at",)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name", "biography",)
    ordering = ("name",)
