import * as sapper from '@sapper/app';
import * as Sentry from '@sentry/browser';

sapper.start({
  target: document.querySelector('#sapper')
});

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: 'https://19993e43262e4461be99e9e009a4d3af@sentry.io/1832504' });
}

// Sentry.captureException(new Error("Something broke"));
