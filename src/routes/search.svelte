<div class="search-page">
  <div class="container">
    <div class="row">
      <div class="col">
        <SearchInput on:update-search={fetchItems} />
      </div>
      <div class="col">
        <SearchTips />
      </div>
    </div>
  </div>

  {#if promise}
    {#await promise}
      <Loading/>
    {:then collection}
      <RedditPagination {collection} fetching={false}/>
      <PostList posts={collection.items}/>
      {#if collection.showBottomPagination}
        <RedditPagination {collection} fetching={false}/>
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
  {/if}
</div>

<script>
import validatePropSort from '~/lib/validateProp/sort';
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import PostList from '~/components/PostList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import SearchInput from '~/components/SearchInput';
import SearchTips from '~/components/SearchTips';
import ZeroResults from '~/components/ZeroResults';
import { stores } from '@sapper/app'
import middlewareAuth from '~/lib/middleware/auth';
const { page } = stores();

$: subreddit_name = $page.query.subreddit || $page.params.subreddit;
$: $page.params.sort && validatePropSort($page.params.sort);

let promise = null;
function fetchItems () {
  promise = redditItems({
    path: subreddit_name ? `/r/${subreddit_name}/search` : '/search',
    query: {
      sort: 'new',
      ...$page.query,
      // include_facets: ?
    },
    shouldAttemptApi() {
      return !!$page.query.q;
    },
  })
}

// $: {
//   fetching = true;
//   promise.then(() => fetching = false, () => fetching = false);
// }
// $: promise.then(doneFetching, doneFetching)


// function doneFetching () {
//   fetching = false
// }

middlewareAuth()
</script>
