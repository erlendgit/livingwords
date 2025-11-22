import uuid

from ninja import Router

router = Router()


@router.get("/")
def list_books(request):
    return {"nodes": [
        {"id": str(uuid.uuid4()), "title": "Book 1"},
        {"id": str(uuid.uuid4()), "title": "Book 2"},
        {"id": str(uuid.uuid4()), "title": "Book 3"}
    ]}


@router.get("/{book_id}/")
def get_book(request, book_id: str):
    return {
        "node": {
            "id": book_id,
            "title": f"Book {book_id[:8]}",
        }
    }
