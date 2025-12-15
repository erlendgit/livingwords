def story_factory(**kwargs):
    from story.models import Story

    defaults = {
        "title": "Some story title",
        "summary": "Once upon a time...",
    }
    defaults.update(kwargs)
    return Story.objects.create(**defaults)
