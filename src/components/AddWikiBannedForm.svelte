<div class="add-wikibanned-form">
  <input
    class="form-control wikibanned-username"
    value={username}
    on:change={(event) => username = event.target.value}
  />
  {#if error}
    <ErrorAlert value={error} />
  {/if}
  {#if success}
    <div class="alert alert-success"><tt><pre>{success}</pre></tt></div>
  {/if}
  <button
    class="btn btn-secondary"
    class:disabled={(isSaveDisabled)}
    disabled={(isSaveDisabled)}
    on:click|preventDefault|stopPropagation={save}
  >
    {#if saving}
      <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
      Saving
    {:else}
      <i class="fa fa-fw fa-btn fa-floppy"/>
      Save
    {/if}
  </button>
</div>

<script>
import get from 'lodash/get';
import ErrorAlert from '~/components/ErrorAlert';
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import { onMount } from 'svelte'
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropUsername from '~/lib/validateProp/username';
import { stores } from '@sapper/app'
const { page } = stores();


let saving = false;
let error = null;
let success = null;
let username = '';

$: validatePropBoolean(saving);
$: !username || validatePropUsername(username);
$: isSaveDisabled = saving || !username

onMount(() => {
  if ($page.query.username) {
    username = $page.query.username;
  }
})
async function save($event) {
  const { subreddit } = $page.params;
  const minWait = startMinWait();
  error = null;
  success = null;
  saving = true;
  try {
    const response = await reddit.post(`/r/${subreddit}/api/friend`, {
      name: username,
      api_type: 'json',
      type: 'wikicontributor',
    });

    if (get(response.data, 'json.errors.length')) {
      throw get(response.data, 'json.errors');
    }

    success = 'WikiBanned Added!';
    username = '';
  } catch (err) {
    error = err;
    // throw err;
  } finally {
    await minWait;
    saving = false;
  }
}
</script>
