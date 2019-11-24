<section class="container">
  <button
    disabled={busy}
    class:disabled={busy}
    class="btn btn-primary btn-lg"
    on:click={addTokens}
  >
    {#if busy}
      <i class="fa fa-spinner fa-spin"/>
      Signing In...
    {:else}
      <i class="fa fa-login"/>
      Complete Sign-in
    {/if}
  </button>
</section>

<script>
import { current, fetchAccessToken, fetchMe, moveTmpOAuthData } from '~/store/auth';
import { stores, goto } from '@sapper/app';
const { page } = stores();

let error = null;
let busy = false;

async function addTokens () {
  busy = true;
  try {
    const { state, code, error } = $page.query;

    await current.set(null);
    await fetchAccessToken({ state, code, error });
    const MeData = await fetchMe();
    await moveTmpOAuthData(MeData.name);
    await current.set(MeData.name);

    await goto('/');
  } catch (err) {
    console.error(err)
    error = err;
  } finally {
    busy = false;
  }
}

  // middleware: ['guest'],
</script>
