def question_factory(**kwargs):
    from question.models import Question

    defaults = {
        'question': 'Some sample question?',
        'answer': "This is a sample answer.",
    }

    defaults.update(kwargs)
    return Question.objects.create(**defaults)