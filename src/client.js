import * as sapper from '@sapper/app';
import * as Sentry from '@sentry/browser';
// some imports to reduce duplication of large dependency trees
import PostEntry from '~/components/PostEntry';
import RedditPagination from '~/components/RedditPagination';

sapper.start({
  target: document.querySelector('#sapper')
});

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE || void 0,
  });

  window.onunhandledrejection = (event) => {
    console.log('[unhandledrejection]', { event });
    event.preventDefault();
    Sentry.captureException(event.reason || event);
  };
  window.onerror = (message, source, lineno, colno, error) => {
    console.log('[window.onerror]', { message, source, lineno, colno, error });
    Sentry.captureException(error || message);
    // prevent firing of default handler
    return true;
  };
}

// Sentry.captureException(new Error("Something broke"));
