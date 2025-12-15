def word_factory(**kwargs):
    from core.models import Word

    if "book" not in kwargs:
        from book.factories import book_factory

        kwargs["book"] = book_factory()

    if "chapter" not in kwargs or "verse" not in kwargs:
        chapter, verse = kwargs.get("chapter", 1), kwargs.get("verse", 1)

        while True:
            if not Word.objects.filter(
                book=kwargs["book"], chapter=chapter, verse=verse
            ).exists():
                kwargs["chapter"] = chapter
                kwargs["verse"] = verse
                break
            chapter, verse = _next_chapter_verse(chapter, verse)

    if "content" not in kwargs:
        kwargs["content"] = (
            f"Sample content for chapter {kwargs['chapter']}, verse {kwargs['verse']}."
        )

    return Word.objects.create(**kwargs)


def _next_chapter_verse(chapter, verse):
    if verse < 50:
        return chapter, verse + 1
    else:
        return chapter + 1, 1


def context_factory(**kwargs):
    from core.models import StoryContext

    if "description" not in kwargs:
        kwargs["description"] = "Sample story context description."

    context = StoryContext.objects.create(**kwargs)

    if "words" in kwargs:
        context.words.add(*kwargs["words"])

    return context
