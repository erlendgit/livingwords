from agency.models import AgencyWord, RoleChoices
from core.models import Word
from core.schemas import LivingWordPayload
from django.db import transaction


@transaction.atomic
def store_living_word_data(payload: LivingWordPayload):
    word, _created = Word.objects.get_or_create(
        book_id=payload.book_id,
        chapter=payload.chapter,
        verse=payload.verse,
        defaults={'text': payload.text, 'notes': payload.notes}
    )

    if not _created:
        word.text = payload.text
        word.notes = payload.notes
        word.save()

    _update_stories(word, payload.story_ids)
    _update_contexts(word, payload.context_ids)
    _update_questions(word, payload.question_ids)
    _update_truths(word, payload.truth_ids)
    _update_agency(word, payload.narrator_id, RoleChoices.narrator.value)
    _update_agency(word, payload.speaker_id, RoleChoices.speaker.value)
    _update_agency(word, payload.listener_id, RoleChoices.listener.value)
    _update_agency(word, payload.bystander_id, RoleChoices.bystander.value)

    return word


def _update_stories(word, story_ids):
    current_stories = set(word.stories.values_list('id', flat=True))

    word.stories.add(*(set(story_ids) - current_stories))
    word.stories.remove(*(current_stories - set(story_ids)))


def _update_contexts(word, context_ids):
    current_contexts = set(word.story_contexts.values_list('id', flat=True))

    word.story_contexts.add(*(set(context_ids) - current_contexts))
    word.story_contexts.remove(*(current_contexts - set(context_ids)))


def _update_questions(word, question_ids):
    current_questions = set(word.advices.values_list('id', flat=True))

    word.advices.add(*(set(question_ids) - current_questions))
    word.advices.remove(*(current_questions - set(question_ids)))


def _update_truths(word, truth_ids):
    current_truths = set(word.truths.values_list('id', flat=True))

    word.truths.add(*(set(truth_ids) - current_truths))
    word.truths.remove(*(current_truths - set(truth_ids)))


def _update_agency(word, agent_id, role):
    AgencyWord.objects.get_or_create(
        agency_id=agent_id,
        word=word,
        role=role
    )
    for ref in word.agency_refs.filter(role=role).all():
        if ref.agency_id != agent_id:
            ref.delete()
