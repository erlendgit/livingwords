def truth_factory(**kwargs):
    from truth.models import Truth

    defaults = {
        'statement': 'Some sample truth statement.',
    }

    defaults.update(kwargs)
    return Truth.objects.create(**defaults)
