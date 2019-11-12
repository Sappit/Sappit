<section class="container">
  Signing In...
  <br>
  <i class="fa fa-spinner fa-spin"/>
</section>

<script>
import { onMount } from 'svelte';
import { current, fetchAccessToken, fetchMe, moveTmpOAuthData } from '~/store/auth';
import { stores, goto } from '@sapper/app';
const { page } = stores();


  // middleware: ['guest'],
onMount(async () => {
  const { state, code, error } = $page.query;

  await current.set(null);
  await fetchAccessToken({ state, code, error });
  const MeData = await fetchMe();
  await moveTmpOAuthData(MeData.name);
  await current.set(MeData.name);

  await goto('/');
});
</script>
