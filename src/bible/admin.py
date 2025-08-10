from django.contrib import admin

from .models import Book, Testament


@admin.register(Testament)
class TestamentAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    search_fields = ("name",)
    ordering = ("order", "name",)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("name", "author", "testament", "order")
    search_fields = ("name", "testament__name")
    ordering = ("testament__order", "order",)
    list_filter = ("testament",)
