<div class="form-group">
  <select
    class="form-control r-select"
    name="username"
    bind:value={value}
    on:change={(event) => dispatch('change', event.target.value)}
    on:input={(event) => dispatch('input', event.target.value)}
  >
    {#each $usernames as value (value)}
      <option {value}>{value}</option>
    {/each}
  </select>
</div>

<script>
import { createEventDispatcher, onMount } from 'svelte'
import { usernames, username } from '~/store/auth';
import validatePropString from '~/lib/validateProp/string';

const dispatch = createEventDispatcher();

export let value = null;

$: value===null || validatePropString(value);

onMount(() => {
  if (value === null && $username) {
    dispatch('input', $username);
  }
})
</script>
