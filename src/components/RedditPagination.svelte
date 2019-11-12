<div class="pagination-controls">
  <a
    class="before btn btn-secondary"
    class:disabled={fetching || !before}
    href={beforeHref}
    on:click={preventDefaultIfFetching}
  >
    {#if fetching}
      <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {:else}
      <i class="fa fa-fw fa-btn fa-left-open"/>
    {/if}
    prev
  </a>
  <a
    class="after btn btn-secondary"
    class:disabled={fetching || !after}
    href={afterHref}
    on:click={preventDefaultIfFetching}
  >
    next
    {#if fetching}
      <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {:else}
      <i class="fa fa-fw fa-btn fa-right-open"/>
    {/if}
  </a>
  <SelectQueryLimit disabled={fetching}/>
  <SelectRedditSort disabled={fetching}/>
</div>

<script>
import find from 'lodash/find';
import findLast from 'lodash/findLast';
import get from 'lodash/get';
import SelectQueryLimit from '~/components/SelectQueryLimit';
import SelectRedditSort from '~/components/SelectRedditSort';
import getAfter from '~/lib/getAfter'
import getBefore from '~/lib/getBefore'
import { stores } from '@sapper/app'
import queryStore from '~/store/query';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropCollection from '~/lib/validateProp/collection';
import href from '~/lib/href';
const { page } = stores();

const { count, limit } = queryStore

function get_name(item) {
  if (item) {
    if (item.data && item.data.name) {
      return item.data.name;
    }
    if (item.name) {
      return item.name;
    }
  }
  return null;
}

export let fetching = true;
export let collection;

$: validatePropBoolean(fetching);
$: validatePropCollection(collection);
$: lastId = get_name(findLast(get(collection, 'data.children'), get_name));
$: firstId = get_name(find(get(collection, 'data.children'), get_name));
$: before = getBefore(collection, $page, firstId, $count);
$: after = getAfter(collection, $page, lastId, $count);
$: count_int = $count || 0;
$: limit_int = $limit || 25;
$: beforeHref = before ? href($page, {
  query: {
    before,
    after: void 0,
    count: (count_int - limit_int) || void 0,
  },
}) : null;
$: afterHref = after ? href($page, {
  query: {
    after,
    before: void 0,
    count: count_int + limit_int,
  },
}) : null;

// $: console.log('before', before)
// $: console.log('after', after)

// $: console.log('beforeHref', beforeHref)
// $: console.log('afterHref', afterHref)

// $: console.log('count', $count)
// $: console.log('limit', $limit)

function preventDefaultIfFetching (event) {
  if (fetching) {
    event.preventDefault();
    return false;
  }
  return true;
}
</script>
