import importlib

from importlib import import_module
from django.core import serializers
from django.core.management.base import BaseCommand
from django.db import models
from django.conf import settings
from django.core import management
from django.core.management.commands import loaddata
from os import listdir
from os.path import isfile, join
import re

path_to_fixtures = str(settings.BASE_DIR) + '\\fixtures'

# Note that these paths should use Unix-style forward slashes, even on Windows.
settings.FIXTURE_DIRS = [path_to_fixtures.replace('\\', '/')]

modules_with_models = [
    'shop.models',
    'django.contrib.auth.models',
    'django.contrib.admin.models',
]

modules_with_models = []
for module in modules_with_models:
    modules_with_models += [importlib.import_module(module)]


class Command(BaseCommand):
    def get_list_of_fixtures(self, pattern: str):
        pattern = pattern.replace('\\', '/')
        pattern = pattern.replace('.', '\.')
        pattern = pattern.replace('*', '.*')
        RE_FIXTURE = re.compile(pattern)
        list_of_fixtures = []
        for f in listdir(path_to_fixtures):
            file = join(path_to_fixtures, f).replace('\\', '/')
            if isfile(file) and RE_FIXTURE.search(file):
                list_of_fixtures += [f]

        return list_of_fixtures

    def add_arguments(self, parser):
        parser.add_argument('pattern',
                            help='Enter regular pattern for find fixture')

        parser.add_argument('-cv',
                            '--command_verbosity',
                            default=0,
                            help='Enter command_verbosity',
                            type=int
                            )

    def handle(self, *args, **options):
        fixture_pattern = options['pattern']
        verbosity = options.get('command_verbosity', '0')
        list_of_fixteres = self.get_list_of_fixtures(fixture_pattern)

        self.stdout.write(str(list_of_fixteres))

        management.call_command(
            'loaddata',
            *list_of_fixteres,
            verbosity=verbosity
        )
