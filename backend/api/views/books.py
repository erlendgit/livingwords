from ninja import Router

router = Router()


@router.get("/")
def list_books(request):
    return {"nodes": [
        {"title": "Book 1"},
        {"title": "Book 2"},
        {"title": "Book 3"}
    ]}
