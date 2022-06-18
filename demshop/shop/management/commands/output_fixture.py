import importlib

from importlib import import_module
from django.core import serializers
from django.core.management.base import BaseCommand
from django.db import models
from django.db.models.fields.related import RelatedField
from django.conf import settings
from django.apps import apps


path_to_fixtures = str(settings.BASE_DIR) + '\\fixtures'


class Command(BaseCommand):
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
        try:
            queryset = model.objects.all()
        except Exception as e:
            self.print_log(
                message=e,
                current_verbosity=verbosity,
                threshold=2
            )
            return []

        if queryset.exists():
            return queryset[0:max_element_per_table]
        else:
            return []

    def create_fixture_file(self, elements, filename):
        with open(filename, 'w', encoding='utf8') as f:
            data = serializers.serialize('json', elements)
            f.write(data)

    def print_log(self, message, threshold):
        if self.verbosity >= threshold:
            self.stdout.write(
                str(message),
                ending='\n')

    def model_processe(self, model):

        self.print_log(
            message='try get objects from: ' + str(model),
            threshold=1
        )
        try:
            elements = self.get_elements(
                model,
                self.max_element_per_table,
                self.verbosity)

            self.model_processed += 1

            self.print_log(
                message=elements,
                threshold=2
            )

            if elements:
                filename = path_to_fixtures + '\\fixture_' + model.__name__ + '.json'
                self.create_fixture_file(elements, filename)
                self.created_file += 1

            self.print_log(
                message='{0} elements add to {1}'.format(
                        len(elements),
                        filename
                ),
                threshold=1
            )

        except Exception as e:
            self.print_log(
                message=e,
                threshold=1
            )
        self.print_log(
            message='============================================',
            threshold=0
        )

    def handle(self, *args, **options):
        self.verbosity = options['command_verbosity']
        self.max_element_per_table = options['max_element_per_table']
        self.created_file = 0
        self.model_processed = 0

        for model in apps.get_models():
            self.model_processe(model)

        self.print_log(
            message='created fixtures = {0}, model processed = {1}'.format(
                self.created_file,
                self.model_processed),
            threshold=1
        )
