<SubredditSearchInput on:search={fetchSearch}/>

{#if promise}
  {#await promise}
    <Loading/>
  {:then collection}
    <RedditPagination {collection} fetching={false}/>
    <SubredditList subreddits={collection.items}/>
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

<script>
import redditItems from '~/lib/redditItems';
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import RedditPagination from '~/components/RedditPagination';
import PostList from '~/components/PostList';
import ZeroResults from '~/components/ZeroResults';
import SubredditList from '~/components/SubredditList';
import SubredditSearchInput from '~/components/SubredditSearchInput';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app'
const { page } = stores();

middlewareAuth()

let promise;

async function fetchSearch() {
  // console.log('fetchSearch');
  promise = redditItems({
    path: '/subreddits/search',
    query: $page.query,
  });
}
</script>
