<section class="container">Redirecting...</section>

<script>
import middlewareAuth from '~/lib/middleware/auth';
import sleep from '~/lib/sleep';
import { onMount } from 'svelte';
import { logout } from '~/store/auth';

middlewareAuth()
onMount(async () => {
  await logout();
  await sleep(2500);
  window.location = '/';
})
</script>
