def agency_factory(**kwargs):
    from agency.models import Agency

    defaults = {
        "description": "This is a sample agency.",
    }

    defaults.update(kwargs)
    return Agency.objects.create(**defaults)
