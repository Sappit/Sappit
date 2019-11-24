<nav class="navbar navbar-dark navbar-expand ssubreddit-search-input">
    <input
      class="form-control form-control-sm mr-sm-2"
      type="text"
      placeholder="Search"
      value={$q || ''}
      on:change|preventDefault|stopPropagation={event => $q = event.target.value || ''}
    />
    <button
      class="btn btn-sm my-2 my-sm-0"
      type="submit"
      on:click|preventDefault|stopPropagation={submit}
    >
      <i class="fa fa-fw fa-btn fa-search"/>
      Search
    </button>
</nav>

<script>
import get from 'lodash/get';
import { startMinWait } from '~/lib/sleep';
import { onMount, createEventDispatcher } from 'svelte';
import href from '~/lib/href';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropString from '~/lib/validateProp/string';
import queryStore from '~/store/query';
import { stores, goto } from '@sapper/app';
const dispatch = createEventDispatcher();
const { page } = stores();

const { q } = queryStore;
const searchRegEx = /\bsearch\b/;

// $: validatePropString(q);
// $: validatePropBoolean(busy);
$: isSearchPage = searchRegEx.test($page.name);

async function submit(event) {
  // console.log('submit');
  dispatch('search');
}
</script>
