<section class="container">
  Redirecting...
</section>

<script>
// import LoginForm from '~/components/LoginForm';
import { getOAuthLoginHref } from '~/lib/reddit';
import { onMount } from 'svelte';

// middleware: ['guest'],
onMount(() => {
  window.location = getOAuthLoginHref();
})
</script>


