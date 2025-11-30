BOOKS = (
    "Genisis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Songs of Salomon",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
)


def _next_book():
    from book.models import Book

    for title in BOOKS:
        if not Book.objects.filter(title=title).exists():
            return title

    n = 1
    while True:
        for title in BOOKS:
            title = f"{title} (round {n})"
            if not Book.objects.filter(title=title).exists():
                return title
        n += 1


def book_factory(**kwargs):
    from book.models import Book

    if "title" not in kwargs:
        kwargs['title'] = _next_book()

    if "sort_order" not in kwargs:
        kwargs['sort_order'] = Book.objects.count() + 1

    return Book.objects.create(**kwargs)
