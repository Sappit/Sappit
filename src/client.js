import * as sapper from '@sapper/app';
import * as Sentry from '@sentry/browser';

sapper.start({
  target: document.querySelector('#sapper')
});

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE || void 0,
  });
}

// Sentry.captureException(new Error("Something broke"));
