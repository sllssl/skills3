from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (superheroes)
        users = [
            {'email': 'tony@stark.com', 'username': 'IronMan', 'team': marvel},
            {'email': 'steve@rogers.com', 'username': 'CaptainAmerica', 'team': marvel},
            {'email': 'bruce@wayne.com', 'username': 'Batman', 'team': dc},
            {'email': 'clark@kent.com', 'username': 'Superman', 'team': dc},
        ]
        user_objs = []
        for u in users:
            user = User.objects.create_user(email=u['email'], username=u['username'], password='password', team=u['team'])
            user_objs.append(user)

        # Create Workouts
        workout1 = Workout.objects.create(name='Pushups', description='Upper body strength')
        workout2 = Workout.objects.create(name='Running', description='Cardio endurance')

        # Create Activities
        Activity.objects.create(user=user_objs[0], workout=workout1, duration=30, calories=200)
        Activity.objects.create(user=user_objs[1], workout=workout2, duration=45, calories=350)
        Activity.objects.create(user=user_objs[2], workout=workout1, duration=20, calories=150)
        Activity.objects.create(user=user_objs[3], workout=workout2, duration=60, calories=500)

        # Create Leaderboard
        Leaderboard.objects.create(user=user_objs[0], score=200)
        Leaderboard.objects.create(user=user_objs[1], score=350)
        Leaderboard.objects.create(user=user_objs[2], score=150)
        Leaderboard.objects.create(user=user_objs[3], score=500)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
