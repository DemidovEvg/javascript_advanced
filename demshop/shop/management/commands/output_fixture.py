import importlib

from importlib import import_module
from django.core import serializers
from django.core.management.base import BaseCommand
from django.db import models
from django.db.models.fields.related import RelatedField
from django.conf import settings


path_to_fixtures = str(settings.BASE_DIR) + '\\fixtures'


list_modules_with_models = [
    'shop.models',
    'django.contrib.auth.models',
    'django.contrib.admin.models',
]

modules_with_models = []
for module in list_modules_with_models:
    modules_with_models += [importlib.import_module(module)]


class Command(BaseCommand):
    def get_list_of_models(self):
        list_of_models = []
        for module in modules_with_models:
            attrs = dir(module)
            for attr in attrs:
                possible_model = getattr(module, attr)
                if type(possible_model) == type(models.Model) and issubclass(possible_model, models.Model):
                    list_of_models += [possible_model]
        return list_of_models

    def add_arguments(self, parser):
        parser.add_argument('-cv',
                            '--command_verbosity',
                            default=0,
                            help='Enter command_verbosity',
                            type=int
                            )

        parser.add_argument('-max',
                            '--max_element_per_table',
                            default=1000,
                            help='Enter max_element_per_table',
                            type=int
                            )

    def get_elements(self,
                     model,
                     max_element_per_table,
                     verbosity):

        if not getattr(model, 'objects'):
            return []

        queryset = model.objects.all()

        if queryset.exists():
            return queryset[0:max_element_per_table]
        else:
            return []

    def handle(self, *args, **options):
        verbosity = options['command_verbosity']
        max_element_per_table = options['max_element_per_table']
        created_file = 0
        model_processed = 0

        for model in self.get_list_of_models():

            if verbosity > 0:
                self.stdout.write('try get objects from: ' +
                                  str(model), ending='\n')
            try:
                elements = self.get_elements(
                    model,
                    max_element_per_table,
                    verbosity)

                model_processed += 1

                if verbosity > 1:
                    self.stdout.write(str(elements), ending='\n')

                filename = path_to_fixtures + '\\fixture_' + model.__name__ + '.json'

                if elements:
                    with open(filename, 'w', encoding='utf8') as f:
                        data = serializers.serialize('json', elements)
                        f.write(data)
                        created_file += 1

                if verbosity > 0:
                    self.stdout.write(
                        '{0} elements add to {1}'.format(
                            len(elements),
                            filename),
                        ending='\n'
                    )

            except Exception as e:
                self.stdout.write(str(e), ending='\n')

        if verbosity > 0:
            self.stdout.write(
                'created fixtures = {0}, model processed = {1}'.format(
                    created_file,
                    model_processed),
                ending='\n')
