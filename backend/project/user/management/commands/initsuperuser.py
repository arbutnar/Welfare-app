from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

import os
from datetime import date
from user.models import Worksite


class Command(BaseCommand):
	help = 'Create a superuser if none exists'

	def handle(self, *args, **options):
		User = get_user_model()
		email = os.getenv('DJANGO_SUPERUSER_EMAIL')
		password = os.getenv('DJANGO_SUPERUSER_PASSWORD')

		if not User.objects.filter(email=email).exists():
			try:
				User.objects.create_superuser(
					email=email,
					password=password,
					name='admin',
					surname='admin',
					birthday=date.today().replace(year=date.today().year - int(os.getenv('BIRTHDAY_MAX_OFFSET'))).isoformat(),
					worksite=Worksite.objects.get(id='1'),
					street='admin',
					postal_code='admin',
					city='admin',
					country='admin'
				)
				self.stdout.write(self.style.SUCCESS('Successfully created new superuser.'))
			except Exception as e:
				self.stdout.write(self.style.ERROR(f'Error creating superuser: {e}'))
		else:
			self.stdout.write(self.style.WARNING('Superuser already exists.'))