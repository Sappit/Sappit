<div class="search-page">
  <div class="container" on:keyup.enter.prevent.stop={fetchItems}>
    <div class="row">
      <div class="col">
        <SelectQueryKind/>
      </div>
      <div class="col">
        <SelectQuerySize max={500}/>
      </div>
      {#if $page.query.kind === Kind.Post}
        <div class="col">
          <SelectQueryPostGroupBy/>
        </div>
      {/if}
      {#if $page.query.kind !== Kind.Post}
        <div class="col">
          <SelectQueryCommentGroupBy/>
        </div>
      {/if}
    </div>
    <div class="row">
      <div class="col">
        <SelectQuerySubredditCsv quickRemoves={pluckquickremoves('subreddit')}/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <SelectQueryAuthorCsv quickRemoves={pluckquickremoves('author')}/>
      </div>
    </div>
    {#if $page.query.kind === Kind.Post}
      <div class="row">
        <div class="col">
          <SelectQueryDomainCsv quickRemoves={pluckquickremoves('domain')}/>
        </div>
      </div>
    {/if}
    {#if $page.query.kind === Kind.Comment}
      <div class="row">
        <div class="col">
          <SelectQueryText path="link_id" placeholder="link id"/>
        </div>
        <div class="col">
          <SelectQueryText path="parent_id" placeholder="parent id"/>
        </div>
      </div>
    {/if}
    <div class="row">
      <div class="col">
        <SelectQueryText path="after" placeholder="after: 1[s,m,h,d]"/>
      </div>
      <div class="col">
        <SelectQueryText path="before" placeholder="before: 1[s,m,h,d]"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <SelectQueryText path="q" placeholder="query"/>
      </div>
    </div>
    {#if $page.query.kind === Kind.Post || $page.query.url}
      <div class="row">
        <div class="col">
          <SelectQueryText path="url" placeholder="link url"/>
          {#if $page.query.kind !== Kind.Post && $page.query.url}
            <div class="alert alert-danger">
              <tt>url</tt> has no effect when searching for kinds other than post
            </div>
          {/if}
        </div>
      </div>
    {/if}
    {#if $page.query.kind === Kind.Post}
      <div class="row">
        <div class="col">
          <SelectQueryIsSelf/>
        </div>
      </div>
    {/if}
    <div class="row">
      <div class="col">
        <button
          class="btn btn-sm my-2 my-sm-0"
          class:disabled={saveDisabled}
          disabled={saveDisabled}
          type="submit"
          on:click|preventDefault|stopPropagation={saveSearch}
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
      <div class="col">
        <button
          class="btn btn-sm my-2 my-sm-0"
          class:disabled={removeDisabled}
          disabled={removeDisabled}
          type="button"
          on:click|preventDefault|stopPropagation={removeSearch}
        >
          {#if removing}
            <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
            Removing
          {:else}
            <i class="fa fa-fw fa-btn fa-trash"/>
            Remove
          {/if}
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input
          class="form-control"
          name="name"
          value={nameValue}
          on:change={(event) => $name = event.target.value}
          placeholder="type in a name to save search"
        />
      </div>
      <div class="col">
        <select
          class="form-control r-select"
          name="saved_search"
          value={selectedSearch}
          on:change={(event) => {
            setSelectedSearch(event.target.value)
          }}
        >
          {#each savedSearchOptions as value (value)}
            <option {value}>{value}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button
          disabled={fetching}
          class:disabled={fetching}
          class="btn btn-sm my-2 my-sm-0"
          type="submit"
          on:click|preventDefault|stopPropagation={fetchItems}
        >
          {#if fetching}
            <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
            Searching
          {:else}
            <i class="fa fa-fw fa-btn fa-search"/>
            Search
          {/if}
        </button>
        <br>
        <SearchTips />
      </div>
    </div>
  </div>
  <div class="container">
    {#if promise}
      {#await promise}
        <Loading/>
      {:then collection}
        {#if $page.query.kind === Kind.Post && $page.query.post_group_by === 'link_url'}
          <PostsGroupedByLinks items={collection.items}/>
        {:else if $page.query.kind !== Kind.Post && $page.query.comment_group_by === 'link_id'}
          <CommentsGroupedByLinks items={collection.items}/>
        {:else}
          <MixedList items={collection.items}/>
        {/if}

        {#if collection.showBottomPagination}
          <div class="pull-right">
            {#if collection.lastCreatedAt}
              <a
                class="btn btn-pimary"
                href={href($page, { before: collection.lastCreatedAt + 1 })}
                on:click|preventDefault|stopPropagation={() => nextPage(collection)}
              >
                next page
              </a>
            {/if}
          </div>
        {:else if collection.zeroResults}
          <ZeroResults/>
        {/if}
      {:catch error}
        <ErrorAlert value={error} />
      {/await}
    {:else if $page.query.q}
      <div class="container">
        <div class="alert alert-primary">Press Search</div>
      </div>
    {:else}
      <div class="container">
        <div class="alert alert-primary">Type in a query to start searching</div>
      </div>
      Press Search to query
    {/if}
  </div>
</div>

<script>
import validatePropSort from '~/lib/validateProp/sort';
import ErrorAlert from '~/components/ErrorAlert';
import MixedList from '~/components/MixedList';
import PushshiftList from '~/components/PushshiftList';
import CommentsGroupedByLinks from '~/components/CommentsGroupedByLinks';
import Loading from '~/components/Loading';
import PostsGroupedByLinks from '~/components/PostsGroupedByLinks';
import SelectQueryCommentGroupBy from '~/components/SelectQueryCommentGroupBy';
import SelectQueryDomainCsv from '~/components/SelectQueryDomainCsv';
import SelectQueryIsSelf from '~/components/SelectQueryIsSelf';
import SelectQueryPostGroupBy from '~/components/SelectQueryPostGroupBy';
import SelectQueryKind from '~/components/SelectQueryKind';
import SelectQuerySize from '~/components/SelectQuerySize';
import SelectQueryAuthorCsv from '~/components/SelectQueryAuthorCsv';
import SelectQueryText from '~/components/SelectQueryText';
import SelectQuerySubredditCsv from '~/components/SelectQuerySubredditCsv';
import SearchTips from '~/components/Pushshift/SearchTips';
import ZeroResults from '~/components/ZeroResults';
import middlewareAuth from '~/lib/middleware/auth';
import get from 'lodash/get';
import reduce from 'lodash/reduce';
import href from '~/lib/href';
import { startMinWait } from '~/lib/sleep';
import { stores, goto } from '@sapper/app'
import queryStore from '~/store/query';
import { list, remove, setSearch } from '~/store/searches';
import pushshiftItems, { nextPage } from '~/lib/pushshiftItems';
import validatePropBoolean from '~/lib/validateProp/boolean';
import { Kind } from '~/lib/enum';

const { page } = stores();
const { name } = queryStore;

// props
let saving = false;
let removing = false;
let fetching = false;
let promise;
let error;
let collection;

$: !$page.params.sort || validatePropSort($page.params.sort);
$: nameValue = $page.query.name || '';
$: validatePropBoolean(saving);
$: validatePropBoolean(removing);
$: saveDisabled = saving || !name;
$: removeDisabled = removing || !name;
$: savedSearchOptions = Object.keys($list)
// $: console.log({savedSearchOptions});
$: selectedSearch = get(get($list, nameValue, null), 'name');
$: promise && promise.then(newCollectionValue => {
  collection = newCollectionValue
})

async function setSelectedSearch (value) {
  const next = get($list, value);
  if (next) {
    $name = next.name;
    await goto(href($page, {
      query: next,
    }))
  }
}

function pluckquickremoves(path) {
  return reduce(
    get(collection, 'items'),
    (carry, item) => {
      const name = get(item, `pushshiftEntry.${path}`);
      if (name) {
        if (!carry[name]) {
          carry[name] = {
            name,
            count: 0,
          };
        }
        carry[name].count++;
      }
      return carry;
    },
    {},
  );
}

async function saveSearch() {
  if (nameValue) {
    const minWait = startMinWait();
    try {
      saving = true;
      await setSearch($page.query);
    } finally {
      await minWait;
      saving = false;
    }
  }
}
async function removeSearch() {
  if (nameValue) {
    const minWait = startMinWait();
    try {
      removing = true;
      await remove(nameValue);
    } finally {
      await minWait;
      removing = false;
    }
  }
}

async function fetchItems () {
  try {
    fetching = true
    error = null;
    promise = pushshiftItems({
      path: '/',
      query: $page.query,
    })
    await promise
  } catch (err) {
    error = err;
  } finally {
    fetching = false
  }
}

middlewareAuth()
</script>
