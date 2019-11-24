<nav class="navbar navbar-dark navbar-expand search-input">
  <form class="form-inline" on:submit|preventDefault|stopPropagation={submit}>
    <input
      class="mr-sm-2 form-control-sm"
      type="text"
      placeholder="Search"
      value={$q || ''}
      on:change|preventDefault|stopPropagation={event => $q = event.target.value}
    />
    <button
      class="btn btn-sm my-2 my-sm-0"
      class:disabled={(busy)}
      disabled={(busy)}
      type="submit"
      on:click|preventDefault|stopPropagation={() => dispatch('update-search')}
    >
      {#if busy}
        <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
      {:else}
        <i class="fa fa-fw fa-btn fa-search"/>
      {/if}
      Search
    </button>
  </form>
</nav>

<script>
import get from 'lodash/get';
import { startMinWait } from '~/lib/sleep';
import { createEventDispatcher, onMount } from 'svelte'
import href from '~/lib/href';
import validatePropBoolean from '~/lib/validateProp/boolean';
import queryStore from '~/store/query'
import { stores, goto } from '@sapper/app'
const { page } = stores();


const dispatch = createEventDispatcher();
const searchRegEx = /\bsearch\b/;

const { q } = queryStore;

export let busy = false;

$: validatePropBoolean(busy);
$: isSearchPage = searchRegEx.test($page.name);

async function submit(event) {
  if (isSearchPage) {
    dispatch('update-search')
    // console.log('updating search');
    // queryStore.q.set(q || null);
  } else {
    dispatch('update-search')
    // console.log('lets goto search page');
    // await goto(href({
    //   path: '/search',
    //   query: {
    //     q: $page.query.q,
    //     subreddit: $page.params.subreddit,
    //   },
    // }));
  }
}
</script>
