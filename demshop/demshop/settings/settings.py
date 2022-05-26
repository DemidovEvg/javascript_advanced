from .settings_installed_apps import INSTALLED_APPS
from .settings_middleware import MIDDLEWARE
from .settings_templates import TEMPLATES
from .settings_databases import DATABASES
from .settings_auth_password_validators import AUTH_PASSWORD_VALIDATORS
from .settings_logging import LOGGING

from django.utils.translation import gettext_lazy as _

from pathlib import Path
from environs import Env
import mimetypes

env = Env()
env.read_env()


BASE_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIR = Path(BASE_DIR, 'content')

SECRET_KEY = env.str('SECRET_KEY')

DEBUG = env.bool('DEBUG')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

mimetypes.add_type("application/javascript", ".js", True)


ROOT_URLCONF = 'demshop.urls'


WSGI_APPLICATION = 'demshop.wsgi.application'


LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = False


STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = [
]

LOCALE_PATHS = [
    # Path(CONTENT_DIR, 'locale')
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_ROOT = BASE_DIR.parent / 'media'
MEDIA_URL = '/media/'


# EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

EMAIL_FILE_PATH = Path(CONTENT_DIR, 'tmp/emails')
EMAIL_HOST_USER = 'test@example.com'
DEFAULT_FROM_EMAIL = 'test@example.com'

ENABLE_USER_ACTIVATION = True

DISABLE_USERNAME = False
LOGIN_VIA_EMAIL = True
LOGIN_VIA_EMAIL_OR_USERNAME = False
LOGIN_REDIRECT_URL = 'baseapp:index'
LOGIN_URL = 'accounts:log_in'
USE_REMEMBER_ME = True

RESTORE_PASSWORD_VIA_EMAIL_OR_USERNAME = False
ENABLE_ACTIVATION_AFTER_EMAIL_CHANGE = True

SIGN_UP_FIELDS = ['username', 'first_name',
                  'last_name', 'email', 'password1', 'password2']
if DISABLE_USERNAME:
    SIGN_UP_FIELDS = ['first_name', 'last_name',
                      'email', 'password1', 'password2']

MESSAGE_STORAGE = 'django.contrib.messages.storage.cookie.CookieStorage'

LANGUAGES = [
    ('en-EN', _('English')),
    ('ru-RU', _('Russian')),
    ('zh-Hans', _('Simplified Chinese')),
    ('fr', _('French')),
    ('es', _('Spanish')),
]
