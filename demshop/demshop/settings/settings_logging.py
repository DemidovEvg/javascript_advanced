from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIR = Path(BASE_DIR, 'content')


LOGGING = {
    'version': 1,

    'disable_existing_loggers': False,

    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {asctime} {message}',
            'style': '{',
        },
    },

    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
    },

    'loggers': {

        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'filters': []
        },
    }
}
