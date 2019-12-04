<p>a test error should have been sent</p>

<script>
import { onMount } from 'svelte';
import * as Sentry from '@sentry/browser';

onMount(() => {
  Sentry.captureException(new Error("test error"));
});
</script>
