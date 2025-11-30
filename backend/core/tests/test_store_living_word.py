from django.test import TestCase

from agency.agency_factory import agency_factory
from agency.models import RoleChoices
from core.factories import word_factory, context_factory
from core.utils.store import _update_stories, _update_contexts, _update_questions, _update_truths, _update_agency
from question.factories import question_factory
from story.factories import story_factory
from truth.factories import truth_factory


class TestUpdateStoriesTestCase(TestCase):
    def setUp(self):
        super().setUp()

        self.word = word_factory()
        self.story1 = story_factory(title="Story 1")
        self.story2 = story_factory(title="Story 2")
        self.story3 = story_factory(title="Story 3")

    def test_add_stories(self):
        _update_stories(self.word, [self.story1.id, self.story2.id])

        self.assertEqual(2, self.word.stories.count())
        self.assertIn(self.story1, self.word.stories.all())
        self.assertIn(self.story2, self.word.stories.all())
        self.assertNotIn(self.story3, self.word.stories.all())

    def test_remove_stories(self):
        self.word.stories.add(self.story1, self.story2)

        _update_stories(self.word, [self.story3.id])

        self.assertEqual(1, self.word.stories.count())
        self.assertNotIn(self.story1, self.word.stories.all())
        self.assertNotIn(self.story2, self.word.stories.all())
        self.assertIn(self.story3, self.word.stories.all())


class TestUpdateContextsTestCase(TestCase):
    def setUp(self):
        super().setUp()

        self.word = word_factory()
        self.context1 = context_factory(description="Context 1")
        self.context2 = context_factory(description="Context 2")
        self.context3 = context_factory(description="Context 3")

    def test_add_contexts(self):
        _update_contexts(self.word, [self.context1.id, self.context2.id])

        self.assertEqual(2, self.word.story_contexts.count())
        self.assertIn(self.context1, self.word.story_contexts.all())
        self.assertIn(self.context2, self.word.story_contexts.all())
        self.assertNotIn(self.context3, self.word.story_contexts.all())

    def test_remove_contexts(self):
        self.word.story_contexts.add(self.context1, self.context2)

        _update_contexts(self.word, [self.context3.id])

        self.assertEqual(1, self.word.story_contexts.count())
        self.assertNotIn(self.context1, self.word.story_contexts.all())
        self.assertNotIn(self.context2, self.word.story_contexts.all())
        self.assertIn(self.context3, self.word.story_contexts.all())


class TestUpdateQuestionsTestCase(TestCase):
    def setUp(self):
        super().setUp()

        self.word = word_factory()
        self.question1 = question_factory(question="Question 1")
        self.question2 = question_factory(question="Question 2")
        self.question3 = question_factory(question="Question 3")

    def test_add_questions(self):
        _update_questions(self.word, [self.question1.id, self.question2.id])

        self.assertEqual(2, self.word.advices.count())
        self.assertIn(self.question1, self.word.advices.all())
        self.assertIn(self.question2, self.word.advices.all())
        self.assertNotIn(self.question3, self.word.advices.all())

    def test_remove_questions(self):
        self.word.advices.add(self.question1, self.question2)

        _update_questions(self.word, [self.question3.id])

        self.assertEqual(1, self.word.advices.count())
        self.assertNotIn(self.question1, self.word.advices.all())
        self.assertNotIn(self.question2, self.word.advices.all())
        self.assertIn(self.question3, self.word.advices.all())


class TestUpdateTruthsTestCase(TestCase):
    def setUp(self):
        super().setUp()

        self.word = word_factory()
        self.truth1 = truth_factory(statement="Truth 1")
        self.truth2 = truth_factory(statement="Truth 2")
        self.truth3 = truth_factory(statement="Truth 3")

    def test_add_truths(self):
        _update_truths(self.word, [self.truth1.id, self.truth2.id])

        self.assertEqual(2, self.word.truths.count())
        self.assertIn(self.truth1, self.word.truths.all())
        self.assertIn(self.truth2, self.word.truths.all())
        self.assertNotIn(self.truth3, self.word.truths.all())

    def test_remove_truths(self):
        self.word.truths.add(self.truth1, self.truth2)

        _update_truths(self.word, [self.truth3.id])

        self.assertEqual(1, self.word.truths.count())
        self.assertNotIn(self.truth1, self.word.truths.all())
        self.assertNotIn(self.truth2, self.word.truths.all())
        self.assertIn(self.truth3, self.word.truths.all())


class TestUpdateAgencyTestCase(TestCase):
    def setUp(self):
        super().setUp()

        self.word = word_factory()
        self.agency1 = agency_factory(description="Agency 1")
        self.agency2 = agency_factory(description="Agency 2")
        self.agency3 = agency_factory(description="Agency 3")


    def test_update_agency(self):
        _update_agency(self.word, self.agency1.id, RoleChoices.narrator.value)

        self.assertEqual(1, self.word.agency_refs.count())
        ref = self.word.agency_refs.first()
        self.assertEqual(self.agency1.id, ref.agency_id)
        self.assertEqual('narrator', ref.role)

    def test_replace_agency(self):
        _update_agency(self.word, self.agency1.id, RoleChoices.narrator.value)
        _update_agency(self.word, self.agency2.id, RoleChoices.narrator.value)

        self.assertEqual(1, self.word.agency_refs.count())
        ref = self.word.agency_refs.first()
        self.assertEqual(self.agency2.id, ref.agency_id)
        self.assertEqual('narrator', ref.role)

    def test_keep_different_agencies(self):
        _update_agency(self.word, self.agency1.id, RoleChoices.narrator.value)
        _update_agency(self.word, self.agency2.id, RoleChoices.narrator.value)
        _update_agency(self.word, self.agency3.id, RoleChoices.speaker.value)

        self.assertEqual(2, self.word.agency_refs.count())
        ref = self.word.agency_refs.filter(role=RoleChoices.narrator.value).first()
        self.assertEqual(self.agency2.id, ref.agency_id)
        self.assertEqual('narrator', ref.role)
        ref = self.word.agency_refs.filter(role=RoleChoices.speaker.value).first()
        self.assertEqual(self.agency3.id, ref.agency_id)
        self.assertEqual('speaker', ref.role)
        ref = self.word.agency_refs.filter(role=RoleChoices.listener.value).first()
        self.assertIsNone(ref)
