from django.contrib import admin

from agency.models import Agency, Person


@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ("description",)
    search_fields = ("word__content", "person__name")
    ordering = ("-created_at",)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = (
        "name",
        "biography",
    )
    ordering = ("name",)
