<section class="container">Clearing...</section>

<script>
import sleep from '~/lib/sleep';
import middlewareAuth from '~/lib/middleware/auth';
import { onMount } from 'svelte';

middlewareAuth()
onMount(async () => {
  window.localStorage.clear();
  await sleep(2000);
  window.location = '/';
})
</script>


