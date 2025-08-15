from django.core.management.base import BaseCommand
from app.models import User2FA
from collections import defaultdict

class Command(BaseCommand):
    help = 'Remove duplicate users with the same email, keeping only one (the first) for each email.'

    def handle(self, *args, **options):
        email_map = defaultdict(list)
        for user in User2FA.objects.all():
            if user.email:
                email_map[user.email].append(user)
        removed = 0
        for email, users in email_map.items():
            if len(users) > 1:
                # Keep the first, delete the rest
                for user in users[1:]:
                    self.stdout.write(f"Deleting duplicate user: {user.username} ({user.email}) [id={user.id}]")
                    user.delete()
                    removed += 1
        self.stdout.write(self.style.SUCCESS(f"Removed {removed} duplicate users."))
