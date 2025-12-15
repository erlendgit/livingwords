from django.contrib import admin

from book.models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "sort_order",
    )
    search_fields = (
        "title",
        "authors__name",
    )
    ordering = ("sort_order",)
